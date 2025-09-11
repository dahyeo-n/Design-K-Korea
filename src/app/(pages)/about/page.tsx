import Image from 'next/image';

import ImageCard from '@/components/ImageCard';
import Link from 'next/link';

const About = () => {
  const values = [
    {
      title: '전문성',
      subtitle: 'Expertise',
      description:
        '건축과 인테리어에 대한 깊이 있는 지식과 실무 경험을 바탕으로 신뢰할 수 있는 설계와 시공을 제공합니다.',
      imageSrc: '/expertise.avif',
      imageAlt: '용접 장면',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-indigo-500',
    },
    {
      title: '통찰력',
      subtitle: 'Insight',
      description:
        '단순한 유행이 아닌, 고객의 라이프스타일과 공간의 본질을 이해하고 공간에 맞는 본질적인 해답을 제시합니다.',
      imageSrc: '/insight.jpg',
      imageAlt: '망원경을 들여다보는 장면',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-500',
    },
    {
      title: '품격',
      subtitle: 'Elegance',
      description:
        '디테일에 대한 집요한 고민과 절제된 감성으로 고급스럽고 우아한 공간을 완성합니다.',
      imageSrc: '/elegance.avif',
      imageAlt: '도시 전경',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-red-500',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
      <section aria-labelledby="brand-heading">
        <h2
          id="brand-heading"
          className="text-2xl md:text-3xl font-bold text-[#212529] mb-6">
          브랜드
        </h2>

        <p className="text-center text-xl md:text-2xl leading-relaxed">
          <span className="font-semibold text-[#212529]">디자인케이코리아</span>
          는
          <br />
          <span className="font-bold text-[#212529]">
            건축과 인테리어에 대한 깊이 있는 이해와 철학을 담은 프리미엄 디자인
            브랜드
          </span>
          입니다.
        </p>
        <p className="text-center text-base md:text-lg text-[#212529] mt-6 leading-relaxed">
          DesignK은 창의성과 기능, 감성을 조화롭게 아우르는 공간 기획력을
          의미하며,
          <br />K = Knowledge, ‘건축과 인테리어에 대한 전문성과 창의’를
          상징합니다.
        </p>
      </section>

      <section aria-labelledby="logo-heading">
        <h2
          id="logo-heading"
          className="text-2xl md:text-3xl font-bold text-[#212529] mb-6">
          회사 로고
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <Image
            src="/design-k-korea-logo.png"
            alt="design-k-korea logo"
            width={300}
            height={90}
            priority
          />
          <div className="text-gray-600 text-base leading-relaxed space-y-2">
            <h3 className="text-xl md:text-2xl font-bold mb-6">타이포그래피</h3>
            <p className="text-base md:text-lg">
              • 고급 서체로 구성되어 있어 전통성과 권위, 신뢰성 전달
            </p>
            <p className="text-base md:text-lg">
              • 절묘한 자간(간격)과 감각적 균형을 기반으로 고급스러운 프리미엄
              브랜드 이미지 강조
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="core-values-heading">
        <h2
          id="core-values-heading"
          className="text-2xl md:text-3xl font-bold text-[#212529] mb-6">
          핵심 가치
        </h2>
        <div
          className="flex flex-col items-center space-y-1
          mb-8 md:mb-10 text-lg md:text-xl font-semibold text-[#212529] leading-relaxed">
          <p>단순한 인테리어를 넘어, 공간을 디자인하는 철학을 담은 브랜드.</p>
          <p>구조에서 감성까지, 당신의 공간에 수준 높은 미학을 더합니다.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map(value => (
            <div key={value.title}>
              <ImageCard {...value} />
              <div className="my-6 py-3 px-3 bg-[#F2F4F6] rounded-sm space-y-2">
                <h3 className="text-[#5A6351] text-lg md:text-xl font-bold">
                  {value.title}
                </h3>
                <div className="text-[#212529] text-base font-normal leading-relaxed">
                  {value.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="contact-heading">
        <h2
          id="contact-heading"
          className="text-2xl md:text-3xl font-bold text-[#212529] mb-6">
          주소 및 연락처
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* TODO: 나중에 지도 API로 변경 */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/office-location.png"
              alt="회사 위치 지도"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="text-gray-700 text-base md:text-lg
            space-y-2 md:space-y-3 leading-relaxed lg:ml-6">
            <Image
              className="mb-8"
              src="/design-k-korea-logo.png"
              alt="design-k-korea logo"
              width={200}
              height={60}
              priority
            />
            <p>
              <span className=" font-semibold mr-2">상호</span>
              디자인케이코리아 주식회사
            </p>
            <p>
              <span className="font-semibold mr-2">주소</span>경기도 평택시
              산단로16번길 26, 1304호 (모곡동, 엠에스원타워)
            </p>
            <p>
              <span className="font-semibold mr-2">대표</span>김길용
            </p>
            <p>
              <span className="font-semibold mr-2">연락처</span>010-3323-1236
            </p>
            <p>
              <span className="font-semibold mr-2">팩스</span>0504-291-1236
            </p>
            <p>
              <span className="font-semibold mr-2">E-mail</span>
              <Link
                href="mailto:kkyong89@naver.com"
                className="text-blue-600 underline hover:text-blue-800">
                kkyong89@naver.com
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
