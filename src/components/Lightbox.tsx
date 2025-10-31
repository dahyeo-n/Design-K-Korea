'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: Array<{
    src: string;
    alt: string;
    category: string;
    subcategory?: string | null;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Lightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) => {
  // ESC 키로 닫기, 방향키로 이동
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrevious],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      {/* 배경 클릭으로 닫기 */}
      <div className="absolute inset-0" onClick={onClose} aria-label="닫기" />

      {/* 메인 컨테이너 */}
      <div className="relative w-[95vw] h-[90vh] md:w-[85vw] md:h-[85vh] max-w-[95vw] max-h-[90vh] md:max-w-[85vw] md:max-h-[85vh] animate-in zoom-in-95 duration-300">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute -top-12 md:-top-12 top-2 right-2 md:right-0 z-10 p-2 text-white/80 hover:text-white hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="닫기">
          <X className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* 이미지 카운터 */}
        <div className="absolute -top-12 md:-top-12 top-2 left-2 md:left-0 z-10 px-3 py-1.5 md:px-4 md:py-2 text-white/90 rounded-full text-xs md:text-sm font-medium backdrop-blur-md border border-white/20">
          {currentIndex + 1} / {images.length}
        </div>

        {/* 이전 버튼 */}
        {images.length > 1 && (
          <button
            onClick={onPrevious}
            className="absolute left-2 md:-left-16 top-1/2 transform -translate-y-1/2 z-10 p-2 md:p-3 text-white rounded-full hover:bg-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md"
            disabled={currentIndex === 0}
            aria-label="이전 이미지">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* 다음 버튼 */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 md:-right-16 top-1/2 transform -translate-y-1/2 z-10 p-2 md:p-3 text-white rounded-full hover:bg-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md"
            disabled={currentIndex === images.length - 1}
            aria-label="다음 이미지">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* 이미지 */}
        <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-contain rounded-xl"
            width={1920}
            height={1080}
            priority
          />
        </div>
      </div>

      {/* 썸네일 네비게이션 (선택사항, 이미지가 많을 때) */}
      {images.length > 1 && images.length <= 10 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index < currentIndex) {
                  for (let i = currentIndex; i > index; i--) {
                    onPrevious();
                  }
                } else if (index > currentIndex) {
                  for (let i = currentIndex; i < index; i++) {
                    onNext();
                  }
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`이미지 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
