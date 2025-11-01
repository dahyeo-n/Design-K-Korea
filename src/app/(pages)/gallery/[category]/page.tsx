'use client';

import { useState, useEffect, type JSX } from 'react';
import { useParams } from 'next/navigation';

import ImageCard from '@/components/ImageCard';
import Lightbox from '@/components/Lightbox';
import { supabase } from '@/lib/supabaseClient';

const categoryNames: Record<string, string> = {
  // 메인 카테고리
  office: '오피스',
  residence: '주거 공간',
  commercial: '상업 공간',
  exhibition: '전시 공간',
  proposal: '공간 제안',
  exterior: '건축 외관',
  'space-media-vr': '공간 미디어 (VR)',

  // 오피스 하위 카테고리
  isometric: '아이소메트릭 공간',
  'image-wall': '이미지 월',
  facade: '파사드',
  'ceo-conference': '임원 공간',

  // 아이소메트릭 하위 카테고리
  '1-square': '1칸',
  '2-square': '2칸',
  '3-square': '3칸',
  '4-square': '4칸',
  '5-square': '5칸',
  'duplex-structure': '복층 구조',

  // 공간 제안 하위 카테고리
  'amnare-korea': 'Amnare Korea',
  'life-wave-korea': 'Life Wave Korea',
  'thermo-fisher': 'Thermo Fisher',
  'xendurance-korea': 'Xendurance Korea',
};

// URL 경로를 Supabase Storage 경로로 매핑
const getStoragePath = (categoryId: string): string => {
  // 아이소메트릭 하위 카테고리들
  if (
    [
      '1-square',
      '2-square',
      '3-square',
      '4-square',
      '5-square',
      'duplex-structure',
    ].includes(categoryId)
  ) {
    return `office/isometric/${categoryId}`;
  }

  // 오피스 하위 카테고리들
  if (
    ['isometric', 'image-wall', 'facade', 'ceo-conference'].includes(categoryId)
  ) {
    return `office/${categoryId}`;
  }

  // 공간 제안 하위 카테고리들
  if (
    [
      'amnare-korea',
      'life-wave-korea',
      'thermo-fisher',
      'xendurance-korea',
    ].includes(categoryId)
  ) {
    return `proposal/${categoryId}`;
  }

  // 메인 카테고리들
  return categoryId;
};

const GalleryCategory = (): JSX.Element => {
  const params = useParams();
  const categoryId = params.category as string;

  const [images, setImages] = useState<
    {
      src: string;
      alt: string;
      category: string;
      subcategory?: string | null;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('');

  // Lightbox 상태 관리
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchImages = async () => {
      if (!categoryId || !categoryNames[categoryId]) return;

      setLoading(true);
      const storagePath = getStoragePath(categoryId);
      setCurrentCategory(categoryNames[categoryId] || categoryId);

      try {
        // 특정 경로에서 이미지 가져오기
        const { data: mainData } = await supabase.storage
          .from('gallery')
          .list(storagePath, { limit: 1000 });

        let allImages: Array<{
          name: string;
          path: string;
          subcategory: string | null;
        }> = [];

        if (mainData) {
          // 메인 폴더의 직접 이미지들
          const mainImages = mainData
            .filter(item => item.name.match(/\.(jpg|jpeg|png|avif)$/i))
            .map(item => ({
              name: item.name,
              path: `${storagePath}/${item.name}`,
              subcategory: null,
            }));

          allImages = [...mainImages];

          // 아이소메트릭 하위 카테고리들 (1-square, 2-square 등)은 최종 카테고리이므로 하위 폴더 확인 불필요
          const isIsometricSubcategory = [
            '1-square',
            '2-square',
            '3-square',
            '4-square',
            '5-square',
            'duplex-structure',
          ].includes(categoryId);

          // 하위 폴더들 확인 (메인 카테고리이거나 isometric인 경우, 단 아이소메트릭 하위 카테고리 제외)
          if (
            (storagePath === categoryId || categoryId === 'isometric') &&
            !isIsometricSubcategory
          ) {
            const subfolders = mainData.filter(
              item => !item.name.includes('.'),
            );

            for (const subfolder of subfolders) {
              // office의 경우 isometric 폴더 안의 하위 폴더들까지 확인
              if (categoryId === 'office' && subfolder.name === 'isometric') {
                const { data: isometricData } = await supabase.storage
                  .from('gallery')
                  .list(`${storagePath}/isometric`, { limit: 1000 });

                if (isometricData) {
                  const isometricSubfolders = isometricData.filter(
                    item => !item.name.includes('.'),
                  );

                  for (const isometricSubfolder of isometricSubfolders) {
                    const { data: deepSubData } = await supabase.storage
                      .from('gallery')
                      .list(
                        `${storagePath}/isometric/${isometricSubfolder.name}`,
                        { limit: 1000 },
                      );

                    if (deepSubData) {
                      const deepSubImages = deepSubData
                        .filter(item =>
                          item.name.match(/\.(jpg|jpeg|png|avif)$/i),
                        )
                        .map(item => ({
                          name: item.name,
                          path: `${storagePath}/isometric/${isometricSubfolder.name}/${item.name}`,
                          subcategory: isometricSubfolder.name,
                        }));

                      allImages = [...allImages, ...deepSubImages];
                    }
                  }
                }
              }
              // isometric 카테고리인 경우 모든 하위 폴더 확인
              else if (categoryId === 'isometric') {
                const { data: subData } = await supabase.storage
                  .from('gallery')
                  .list(`${storagePath}/${subfolder.name}`, { limit: 1000 });

                if (subData) {
                  const subImages = subData
                    .filter(item => item.name.match(/\.(jpg|jpeg|png|avif)$/i))
                    .map(item => ({
                      name: item.name,
                      path: `${storagePath}/${subfolder.name}/${item.name}`,
                      subcategory: subfolder.name,
                    }));

                  allImages = [...allImages, ...subImages];
                }
              }
              // proposal의 경우 직접 하위 폴더들 확인
              else if (categoryId === 'proposal') {
                const { data: subData } = await supabase.storage
                  .from('gallery')
                  .list(`${storagePath}/${subfolder.name}`, { limit: 1000 });

                if (subData) {
                  const subImages = subData
                    .filter(item => item.name.match(/\.(jpg|jpeg|png|avif)$/i))
                    .map(item => ({
                      name: item.name,
                      path: `${storagePath}/${subfolder.name}/${item.name}`,
                      subcategory: subfolder.name,
                    }));

                  allImages = [...allImages, ...subImages];
                }
              }
              // 다른 카테고리들은 기존 로직 유지
              else {
                const { data: subData } = await supabase.storage
                  .from('gallery')
                  .list(`${storagePath}/${subfolder.name}`, { limit: 1000 });

                if (subData) {
                  const subImages = subData
                    .filter(item => item.name.match(/\.(jpg|jpeg|png|avif)$/i))
                    .map(item => ({
                      name: item.name,
                      path: `${storagePath}/${subfolder.name}/${item.name}`,
                      subcategory: subfolder.name,
                    }));

                  allImages = [...allImages, ...subImages];
                }
              }
            }
          }
        }

        // 이미지 URL 생성
        const fileList = await Promise.all(
          allImages.map(async item => {
            const { data: urlData } = supabase.storage
              .from('gallery')
              .getPublicUrl(item.path);
            return {
              src: urlData.publicUrl,
              alt: item.name,
              category: categoryId,
              subcategory: item.subcategory,
            };
          }),
        );

        console.log('Final image list:', fileList);
        setImages(fileList);
      } catch (error) {
        console.error('이미지 로딩 오류: ', error);
        console.error('Category ID:', categoryId);
        console.error('Storage Path:', storagePath);
      }

      setLoading(false);
    };

    fetchImages();
  }, [categoryId]);

  // Lightbox 제어 함수들
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const previousImage = () => {
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <div>
        <div className="mx-auto px-5 sm:px-8 md:px-16 lg:px-32 xl:px-60 py-4 md:py-8">
          <h1 className="text-xl md:text-3xl font-bold text-[#465A6E]">
            {currentCategory}
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            총 {images.length}개의 이미지
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="mx-auto px-5 sm:px-8 md:px-16 lg:px-32 xl:px-60">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-lg text-gray-600">이미지 불러오는 중...</div>
          </div>
        ) : images.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-lg text-gray-600">이미지가 없습니다.</div>
          </div>
        ) : (
          <div className=" border-t border-gray-200 pt-4 md:pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, idx) => (
              <ImageCard
                key={idx}
                title={image.alt}
                imageSrc={image.src}
                imageAlt={image.alt}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </div>
  );
};

export default GalleryCategory;
