'use client';

import { type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CircleArrowDown, Home, Building2, Palette } from 'lucide-react';

import ImageCard from '@/components/ImageCard';

const Main = (): JSX.Element => {
  const router = useRouter();

  const spaces = [
    {
      title: '주거 공간',
      href: '/gallery/residence',
      subtitle: 'The First Space',
      imageSrc: '/residence.avif',
      imageAlt: '현대적인 주택의 외관, 저녁 시간 조명이 켜진 모습',
      icon: <Home className="w-4 h-4" />,
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-purple-600',
    },
    {
      title: '비즈니스 공간',
      href: '/gallery/office',
      subtitle: 'The Second Space',
      imageSrc: '/office.avif',
      imageAlt: '현대적인 고층 빌딩들의 상향 앵글 뷰',
      icon: <Building2 className="w-4 h-4" />,
      gradientFrom: 'from-green-500',
      gradientTo: 'to-blue-600',
    },
    {
      title: '여가/문화 공간',
      href: '/gallery/exhibition',
      subtitle: 'The Third Space',
      imageSrc: '/exhibition.avif',
      imageAlt: '미술관에서 예술 작품을 감상하는 사람의 실루엣',
      icon: <Palette className="w-4 h-4" />,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-600',
    },
  ];

  return (
    <>
      <div>
        <section className="relative w-full min-h-screen flex items-center justify-start px-6 md:px-20 lg:px-60">
          <Image
            src="/main-cover.png"
            alt="main cover"
            fill
            priority
            className="object-cover -z-10"
          />

          <div className="absolute inset-0 bg-black/50 -z-10" />

          <div className="text-white space-y-3 max-w-xl md:max-w-2xl lg:max-w-3xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              집과 일터, 그리고 그 너머 —
            </h3>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              당신의 시간을 품는 제3의 공간을 완성합니다.
            </h3>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
              무심한 듯 섬세하게, 과하지 않게 그러나 분명하게. 공간의 품격을
              지켜냅니다.
            </p>
            <button
              className="px-4 sm:px-5 py-2 rounded-lg bg-opacity-0 border border-white
          text-white font-semibold hover:bg-white hover:text-black transition-colors text-sm sm:text-base md:text-lg">
              <Link href="/gallery/office">포트폴리오 보러 가기</Link>
            </button>
          </div>

          {/* 하단 화살표 */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <CircleArrowDown className="w-8 sm:w-10 h-8 sm:h-10 text-gray-300 animate-bounce" />
          </div>
        </section>

        <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-white">
          <div
            className="text-center mb-10 space-y-1 md:space-y-3 md:pb-8
            text-2xl md:text-4xl font-bold text-gray-900">
            <h1>안녕하세요.</h1>
            <h1>인테리어 전문 회사 “디자인케이코리아”입니다.</h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 max-w-[1500px] w-full">
            <div className="flex-1 w-full">
              <Image
                src="/main-cover.png"
                alt="제3의 공간 인테리어 예시"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                width={1000}
                height={1000}
              />
            </div>

            <div className="flex-1 text-gray-700 space-y-8 text-base md:text-xl leading-relaxed">
              <p>
                누구나 제1의 공간 ‘집’과 제2의 공간 ‘일터’ 속에서 대부분의
                시간을 살아가며,
              </p>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                동시에 쉼과 영감을 얻을 수 있는 ‘제3의 공간’을 원합니다.
              </p>
              <p>
                화려하진 않지만 깊이 있는 위안을 주고, 일상에 작은 영감을
                더하며, <br />
                머무는 것만으로도 삶의 균형과 행복을 느낄 수 있는 공간.
              </p>
              <p>
                우리는 그런 공간을, 동시대를 살아가는 이들과 함께 소통하고
                연구하며 섬세하게 만들어갑니다.
              </p>
            </div>
          </div>

          {/* 하단 화살표 */}
          <div className="absolute bottom-20 flex justify-center w-full">
            <CircleArrowDown className="w-10 h-10 text-gray-300 animate-bounce" />
          </div>
        </section>

        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 sm:py-16 lg:py-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <header className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                우리는 머무는 공간이 삶의 질을{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  결정한다고 믿습니다.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
                매일 머무는 집과 회사, 그곳에서의 시간이 곧 행복이 되도록.
              </p>

              <Link href="/qna">
                <button
                  className="text-sm md:text-lg inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  aria-label="문의하러 가기 button">
                  문의하러 가기
                </button>
              </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {spaces.map((space, index) => (
                <div
                  key={space.title}
                  className="transform transition-all duration-300"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.8s ease-out forwards',
                  }}>
                  <ImageCard
                    {...space}
                    lookCloser
                    onClick={() => {
                      router.push(space.href);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>
      </div>
    </>
  );
};

export default Main;
