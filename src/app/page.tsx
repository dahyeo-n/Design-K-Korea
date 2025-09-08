'use client';

import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Link href="/about">
        <button>회사 소개 페이지로 가기</button>
      </Link>
    </div>
  );
};

export default Home;
