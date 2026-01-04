'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Badge from '@/components/qna/Badge';
import { supabase } from '@/lib/supabaseClient';

type QuestionData = {
  id: number;
  status: '공지사항' | '답변대기' | '답변완료';
  title: string;
  name: string;
  contents: string;
  created_at: string;
  file?: string;
};

type Comment = {
  id: number;
  nickname: string;
  contents: string;
  created_at: string;
  qna_id: number;
};

const QNADetail = () => {
  const params = useParams();
  const qnaid = params.qnaid as string;

  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const { data, error } = await supabase
          .from('qna')
          .select('*')
          .eq('id', qnaid)
          .single();

        if (error) throw error;

        setQuestionData(data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('qna_id', qnaid)
          .order('created_at', { ascending: true });

        if (error) throw error;

        setComments(data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchQuestionData(), fetchComments()]);
      setIsLoading(false);
    };

    loadData();
  }, [qnaid]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('qna_id', qnaid)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.')
      .replace(/\.$/, '');
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && nickname.trim()) {
      try {
        const { error } = await supabase.from('comments').insert([
          {
            qna_id: parseInt(qnaid),
            nickname: nickname.trim(),
            contents: newComment.trim(),
          },
        ]);

        if (error) throw error;

        alert('댓글이 등록되었습니다!');
        setNewComment('');
        setNickname('');
        fetchComments();
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!questionData) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">질문을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* 헤더 커버 이미지 */}
      <div className="relative max-w-6xl mx-auto h-48 md:h-64">
        <Image
          src="/qna-cover.jpg"
          alt="Q&A Cover"
          fill
          priority
          className="object-cover rounded-4xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black/50 rounded-4xl" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {questionData.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-base md:text-lg font-medium">
              <Badge status={questionData.status} />
              <span>{questionData.name}</span>
              <span> | </span>
              <span>{formatDate(questionData.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        {/* 질문 내용 */}
        <div className="px-2 lg:px-8 mb-8">
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base lg:text-lg">
              {questionData.contents}
            </p>
          </div>

          {/* 첨부 파일 */}
          {questionData.file && (
            <div className="mb-6">
              {/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(questionData.file) && (
                <div className="relative max-w-2xl">
                  <Image
                    src={questionData.file}
                    alt="첨부 이미지"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-md object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* 댓글 섹션 */}
        <div className="bg-white rounded-xl shadow-sm mx-2 sm:mx-8 px-5 lg:px-10 py-8">
          <h3 className="text-lg font-bold text-[#808080] mb-6">
            댓글 {comments.length}
          </h3>

          {/* 기존 댓글 */}
          <div className="space-y-6 mb-8">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                아직 댓글이 없습니다.
              </p>
            ) : (
              comments.map(comment => (
                <div
                  key={comment.id}
                  className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-800">
                      {comment.nickname}
                    </span>
                    {comment.nickname === questionData?.name && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        작성자
                      </span>
                    )}
                    <span className="text-sm text-gray-500 ml-2">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {comment.contents}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* 댓글 작성 폼 */}
          <form
            onSubmit={handleCommentSubmit}
            className="space-y-4 text-sm md:text-base">
            <div className="flex items-center gap-2 mb-3">
              <label
                htmlFor="nickname"
                className="text-base md:text-lg font-medium text-gray-700">
                닉네임
              </label>
              <span className="text-base md:text-lg text-red-500">*</span>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="1자 이상 12자 이하"
                className="w-80 border border-gray-300 rounded-lg px-4 py-2 ml-3
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                transition-all duration-200"
                minLength={1}
                maxLength={12}
                required
              />
            </div>

            <div className="mt-1">
              <textarea
                id="comment"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200"
                placeholder={`등록한 댓글은 수정이나 삭제가 불가능해요.
비방, 욕설 등의 부적절한 댓글은 삭제되거나 법적 책임이 따를 수 있습니다.`}
                required
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="submit"
                disabled={!nickname.trim() || !newComment.trim()}
                className={`px-6 py-2 font-bold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${
                    nickname.trim() && newComment.trim()
                      ? 'bg-blue-400 text-white hover:bg-blue-500 cursor-pointer'
                      : 'bg-blue-100 text-white cursor-not-allowed'
                  }`}>
                댓글 등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QNADetail;
