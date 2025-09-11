'use client';

import Image from 'next/image';
import { useState } from 'react';

import Badge from '@/components/qna/Badge';

const questionData = {
  status: '답변대기' as const,
  title: '인테리어 견적 문의',
  author: '페이커',
  date: '2025.08.15',
  content: `안녕하세요.
혹시 견적이 어느 정도 될지 알 수 있을까요?

100평 정도 되고 아파트입니다. 첨부한 사진 참고해서 대략적으로 알려주시면 감사하겠습니다. 첨부한 사진처럼 인테리어 됐으면 좋겠습니다.`,
  images: [
    {
      id: 1,
      src: '/office.avif',
      alt: '인테리어 참고 이미지 1',
    },
    {
      id: 2,
      src: '/exhibition.avif',
      alt: '인테리어 참고 이미지 2',
    },
  ],
};

const commentsData = [
  {
    id: 1,
    author: '김애매',
    content: '페이커 형 집처럼 꾸미려면 돈 진짜 엄청 들 텐데.. 부자인가 보다',
    date: '2025.08.15',
    isOwner: false,
  },
  {
    id: 2,
    author: '페이커',
    content: '부자까진 아닙니다..',
    date: '2025.08.15',
    isOwner: true,
  },
];

const QNADetail = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(commentsData);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: '익명',
        content: newComment.trim(),
        date: new Date()
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\. /g, '.')
          .replace('.', ''),
        isOwner: false,
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

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
              <span>{questionData.author}</span>
              <span> | </span>
              <span>{questionData.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        {/* 질문 내용 */}
        <div className="px-2 lg:px-8 mb-8">
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base lg:text-lg">
              {questionData.content}
            </p>
          </div>

          {/* 첨부 이미지 */}
          {questionData.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {questionData.images.map(image => (
                <div
                  key={image.id}
                  className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    FAKER
                  </div>
                  {/* <div className="flex items-center justify-center h-full text-gray-400">
                    이미지 {image.id}
                  </div> */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  {/* <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {image.id === 1 ? '무번 수 있는 곳' : '과장으로'}
                  </div> */}
                </div>
              ))}
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
            {comments.map(comment => (
              <div
                key={comment.id}
                className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-800">
                    {comment.author}
                  </span>
                  {comment.isOwner && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      작성자
                    </span>
                  )}
                  <span className="text-sm text-gray-500 ml-2">
                    {comment.date}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>

          {/* 댓글 작성 폼 */}
          <form
            onSubmit={handleCommentSubmit}
            className="space-y-4 text-sm md:text-base">
            <div className="flex items-center gap-2 mb-3">
              <label
                htmlFor="comment"
                className="text-base md:text-lg font-medium text-gray-700">
                닉네임
              </label>
              <span className="text-base md:text-lg text-red-500">*</span>
              <input
                type="text"
                placeholder="1자 이상 12자 이하"
                className="w-80 border border-gray-300 rounded-lg px-4 py-2 ml-3
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                transition-all duration-200"
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
                className="px-6 py-2 bg-blue-300 text-white font-bold rounded-lg hover:bg-blue-500
                  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
