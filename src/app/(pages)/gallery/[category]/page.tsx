'use client';

import { useState, type JSX } from 'react';
import { ChevronDown } from 'lucide-react';
import ImageCard from '@/components/ImageCard';

const galleryImages = [
  {
    id: 1,
    src: '/office-image-wall-1.jpg',
    alt: '인테리어 디자인 1',
    category: 'office',
  },
  {
    id: 2,
    src: '/office-image-wall-2.jpg',
    alt: '인테리어 디자인 2',
    category: 'office',
  },
  {
    id: 3,
    src: '/office-image-wall-3.jpg',
    alt: '인테리어 디자인 3',
    category: 'office',
  },
  {
    id: 4,
    src: '/office-image-wall-4.jpg',
    alt: '인테리어 디자인 4',
    category: 'office',
  },
  {
    id: 5,
    src: '/office-image-wall-5.jpg',
    alt: '인테리어 디자인 5',
    category: 'office',
  },
  {
    id: 6,
    src: '/office-image-wall-6.jpg',
    alt: '인테리어 디자인 6',
    category: 'office',
  },
  {
    id: 7,
    src: '/office-image-wall-7.jpg',
    alt: '인테리어 디자인 7',
    category: 'office',
  },
  {
    id: 8,
    src: '/office-image-wall-8.jpg',
    alt: '인테리어 디자인 8',
    category: 'office',
  },
  {
    id: 9,
    src: '/office-image-wall-9.jpg',
    alt: '인테리어 디자인 9',
    category: 'office',
  },
  {
    id: 10,
    src: '/office-image-wall-10.jpg',
    alt: '인테리어 디자인 10',
    category: 'office',
  },
  {
    id: 11,
    src: '/office-image-wall-11.jpg',
    alt: '인테리어 디자인 11',
    category: 'office',
  },
  {
    id: 12,
    src: '/office-image-wall-12.jpg',
    alt: '인테리어 디자인 12',
    category: 'office',
  },
];

const GalleryCategory = (): JSX.Element => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = {
    office: {
      label: '오피스',
      subcategories: [
        '주거 공간',
        '상업 공간',
        '전시 공간',
        '공간 계획',
        '건축 외관',
        '공간 미디어',
      ],
    },
    residential: {
      label: '아이스테틱 공간',
      subcategories: [
        '아이스테틱 1칸',
        '아이스테틱 2칸',
        '아이스테틱 3칸',
        '아이스테틱 4칸',
        '아이스테틱 5칸',
        '복층 구조',
      ],
    },
    brands: {
      label: '브랜드',
      subcategories: [
        'Life Wave Korea',
        'Ammare Korea',
        'Thermo Fisher',
        'Xendurance Korea',
      ],
    },
    media: {
      label: '공간 미디어',
      subcategories: ['VR', '영상'],
    },
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveDropdown(null);
  };

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Dropdowns */}
      {/* <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-5 sm:px-8 md:px-16 lg:px-32 xl:px-60 py-4">
          <div className="flex items-center space-x-8 overflow-x-auto">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="relative">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="flex items-center space-x-1 text-[#465A6E] hover:text-gray-800 transition-colors whitespace-nowrap py-2"
                  aria-expanded={activeDropdown === key}
                  aria-haspopup="true">
                  <span className="font-medium">{category.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === key ? 'rotate-180' : ''
                    }`}
                  />
                </button> */}

      {/* Dropdown Menu */}
      {/* {activeDropdown === key && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <div className="py-1">
                      {category.subcategories.map((subcategory, index) => (
                        <button
                          key={index}
                          onClick={() => handleCategorySelect(key)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Gallery Grid */}
      <main className="mx-auto px-5 sm:px-8 md:px-16 lg:px-32 xl:px-60 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map(image => (
            // <div
            //   key={image.id}
            //   className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            //   <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            //     <span className="text-gray-600 text-sm font-medium">
            //       {image.alt}
            //     </span>
            //   </div>
            //   {/* Hover overlay */}
            //   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            // </div>
            <ImageCard
              key={image.id}
              title={image.alt}
              // subtitle={image.category}
              imageSrc={image.src}
              imageAlt={image.alt}
            />
          ))}
        </div>

        {/* Load More Button */}
        {/* <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-[#F2F4F6] text-[#4E5968] font-medium rounded-md hover:bg-[#E5E7EB] transition-colors">
            더보기
          </button>
        </div> */}
      </main>

      {/* Click outside handler */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActiveDropdown(null)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default GalleryCategory;
