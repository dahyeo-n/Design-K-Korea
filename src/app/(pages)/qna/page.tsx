'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Badge from '@/components/qna/Badge';
import Pagination from '@/components/qna/Pagination';
import QnaFormModal from '@/components/qna/QnaFormModal';
import { supabase } from '@/lib/supabaseClient';

type QnaItem = {
  id: number;
  status: '공지사항' | '답변대기' | '답변완료';
  title: string;
  contents: string;
  name: string;
  created_at: string;
};

const QNAMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qnaList, setQnaList] = useState<QnaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // status 정렬 우선순위: 공지사항(1) > 답변완료(2) > 답변대기(3)
  const getStatusOrder = (status: string) => {
    if (status === '공지사항') return 1;
    if (status === '답변완료') return 2;
    if (status === '답변대기') return 3;
    return 4;
  };

  const fetchQnaList = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('qna').select('*');

      if (error) throw error;

      // status 순서로 정렬, 같은 status 내에서는 최신순
      const sortedData = [...(data || [])].sort((a, b) => {
        const statusDiff = getStatusOrder(a.status) - getStatusOrder(b.status);
        if (statusDiff !== 0) return statusDiff;
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      setQnaList(sortedData);
    } catch (error) {
      console.error('Error fetching QnA list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQnaList();
  }, []);

  const handleRowClick = (id: number) => {
    router.push(`/qna/${id}`);
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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="relative max-w-6xl mx-auto h-48 md:h-64">
        <Image
          src="/qna-cover.jpg"
          alt="Q&A Cover"
          fill
          priority
          className="object-cover rounded-4xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black/50 rounded-4xl" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            질문
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="lg:px-8 pt-10">
        <div className="flex items-end justify-end mb-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-400">
            글쓰기
          </button>
        </div>

        {/* 표 */}
        <p className="text-sm text-[#808080] mb-4">
          Total {qnaList.length} / 1 page
        </p>

        <div className="overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F5F5F5] text-[#808080] text-center">
              <tr>
                <th className="px-4 py-3 w-28">상태</th>
                <th className="px-4 py-3">제목</th>
                <th className="px-4 py-3 w-32">작성자</th>
                <th className="px-4 py-3 w-32">날짜</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : qnaList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    등록된 질문이 없습니다.
                  </td>
                </tr>
              ) : (
                qnaList.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className="border-t text-[#808080] hover:bg-gray-50 transition cursor-pointer">
                    <td className="text-center">
                      <Badge status={item.status} />
                    </td>
                    <td className="px-4 py-3 space-y-1">
                      <p className="font-semibold text-[#212529]">
                        {item.title}
                      </p>
                      <p className="text-sm truncate max-w-xs md:max-w-lg">
                        {item.contents}
                      </p>
                    </td>
                    <td className="text-sm text-center font-medium">
                      {item.name}
                    </td>
                    <td className="text-sm text-center">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={1} currentPage={1} />
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <QnaFormModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchQnaList}
        />
      )}
    </main>
  );
};

export default QNAMain;
