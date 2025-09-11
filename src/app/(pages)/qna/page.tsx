'use client';

import { useState } from 'react';
import Image from 'next/image';

import Badge from '@/components/qna/Badge';
import Pagination from '@/components/qna/Pagination';
import QnaFormModal from '@/components/qna/QnaFormModal';

type QnaItem = {
  id: number;
  status: '공지사항' | '답변대기' | '답변완료';
  title: string;
  content: string;
  author: string;
  date: string;
};

const dummyData: QnaItem[] = [
  {
    id: 1,
    status: '공지사항',
    title: '디자인케이코리아 Q&A 게시판 이용 안내',
    content:
      '안녕하세요, 디자인케이코리아 홈페이지 관리자입니다. 홈페이지 이용 중 궁금한 점이 있으시거나 요청사항이 있으실 경우, Q&A 우측 상단에 위치한 글쓰...',
    author: 'DESIGNK',
    date: '2025.08.01',
  },
  {
    id: 2,
    status: '답변대기',
    title: '인테리어 견적 문의',
    content:
      '안녕하세요. 혹시 견적이 어느 정도 될지 알 수 있을까요? 100평 정도 되고 아파트입니다.  첨부한 사진 참고해서 대략적으로 알려주시면 감사하겠...',
    author: '이상혁',
    date: '2025.08.15',
  },
  {
    id: 3,
    status: '답변완료',
    title: '이런 장소도 인테리어 가능할까요?',
    content: '답변이 등록되었습니다. 답변을 확인해 주세요.',
    author: '김애매',
    date: '2025.08.08',
  },
];

const QNAMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          Total {dummyData.length} / 1 page
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
              {dummyData.map(item => (
                <tr
                  key={item.id}
                  className="border-t text-[#808080] hover:bg-gray-50 transition">
                  <td className="text-center">
                    <Badge status={item.status} />
                  </td>
                  <td className="px-4 py-3 space-y-1">
                    <p className="font-semibold text-[#212529]">{item.title}</p>
                    <p className="text-sm truncate max-w-xs md:max-w-lg">
                      {item.content}
                    </p>
                  </td>
                  <td className="text-sm text-center font-medium">
                    {item.author}
                  </td>
                  <td className="text-sm text-center">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={1} currentPage={1} />
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && <QnaFormModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
};

export default QNAMain;
