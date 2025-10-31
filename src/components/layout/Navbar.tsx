'use client';

import { useState, useEffect, type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

import RequestModal from '../RequestModal';

const Navbar = (): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState<string | null>(null);

  const router = useRouter();

  const navigationPages = [
    { id: 1, text: '회사소개', href: '/about', hasDropdown: false },
    { id: 2, text: '갤러리', href: '/gallery/office', hasDropdown: true },
    { id: 3, text: '질문', href: '/qna', hasDropdown: false },
  ];

  const gallerySubmenus = [
    {
      text: '오피스',
      href: '/gallery/office',
      hasSubcategories: true,
      subcategories: [
        {
          text: '아이소메트릭 공간',
          href: '/gallery/isometric',
          hasSubcategories: true,
          subcategories: [
            { text: '1칸', href: '/gallery/1-square' },
            { text: '2칸', href: '/gallery/2-square' },
            { text: '3칸', href: '/gallery/3-square' },
            { text: '4칸', href: '/gallery/4-square' },
            { text: '5칸', href: '/gallery/5-square' },
            {
              text: '복층 구조',
              href: '/gallery/duplex-structure',
            },
          ],
        },
        {
          text: '이미지 월',
          href: '/gallery/image-wall',
          hasSubcategories: false,
        },
        { text: '파사드', href: '/gallery/facade', hasSubcategories: false },
        {
          text: '임원 공간',
          href: '/gallery/ceo-conference',
          hasSubcategories: false,
        },
      ],
    },
    { text: '주거 공간', href: '/gallery/residence', hasSubcategories: false },
    { text: '상업 공간', href: '/gallery/commercial', hasSubcategories: false },
    { text: '전시 공간', href: '/gallery/exhibition', hasSubcategories: false },
    {
      text: '공간 제안',
      href: '/gallery/proposal',
      hasSubcategories: true,
      subcategories: [
        {
          text: 'Amnare Korea',
          href: '/gallery/amnare-korea',
          hasSubcategories: false,
        },
        {
          text: 'Life Wave Korea',
          href: '/gallery/life-wave-korea',
          hasSubcategories: false,
        },
        {
          text: 'Thermo Fisher',
          href: '/gallery/thermo-fisher',
          hasSubcategories: false,
        },
        {
          text: 'Xendurance Korea',
          href: '/gallery/xendurance-korea',
          hasSubcategories: false,
        },
      ],
    },
    { text: '건축 외관', href: '/gallery/exterior', hasSubcategories: false },
    {
      text: '공간 미디어 (VR)',
      href: '/gallery/space-media-vr',
      hasSubcategories: false,
    },
  ];

  const handleDropdown = () => {
    setDropdown(!dropdown);
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  };

  const handleSubmenuToggle = (menuText: string) => {
    setActiveSubmenu(activeSubmenu === menuText ? null : menuText);
    setActiveSubSubmenu(null);
  };

  const handleSubSubmenuToggle = (subMenuText: string) => {
    setActiveSubSubmenu(activeSubSubmenu === subMenuText ? null : subMenuText);
  };

  const handleGalleryClick = (href: string) => {
    setDropdown(false);
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
    setTimeout(() => {
      router.push(href);
    }, 0);
  };

  const handleMobileGalleryClick = (href: string) => {
    closeMobileMenu();
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
    setTimeout(() => {
      router.push(href);
    }, 0);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setDropdown(false);
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  };

  // 모바일 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-10 mx-auto px-5 sm:px-8 md:px-16 lg:px-32 xl:px-60 py-3 h-14 flex items-center justify-between bg-white shadow-md">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/design-k-korea-logo.png"
            alt="design-k-korea logo"
            width={123}
            height={36}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center md:space-x-12 lg:space-x-14">
          {navigationPages.map(navPage => (
            <div key={navPage.id} className="relative">
              <div className="flex items-center">
                <Link
                  href={navPage.href}
                  className="text-[#465A6E] font-bold hover:text-gray-800 transition-colors text-sm lg:text-base">
                  {navPage.text}
                </Link>
                {navPage.hasDropdown && (
                  <button
                    onClick={handleDropdown}
                    className="ml-1 p-1 text-[#465A6E] hover:text-gray-800">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        dropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {navPage.hasDropdown && dropdown && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {gallerySubmenus.map((submenu, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleGalleryClick(submenu.href)}
                            className="flex-1 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {submenu.text}
                          </button>
                          {submenu.hasSubcategories && (
                            <button
                              onClick={() => handleSubmenuToggle(submenu.text)}
                              className="px-2 py-2 text-gray-400 hover:text-gray-600">
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  activeSubmenu === submenu.text
                                    ? 'rotate-180'
                                    : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* 2단계 하위 카테고리 */}
                        {submenu.hasSubcategories &&
                          activeSubmenu === submenu.text && (
                            <div className="bg-gray-50 border-t border-gray-100">
                              {submenu.subcategories?.map(
                                (subcategory, subIndex) => (
                                  <div key={subIndex}>
                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={() =>
                                          handleGalleryClick(
                                            typeof subcategory === 'string'
                                              ? submenu.href
                                              : subcategory.href ||
                                                  submenu.href,
                                          )
                                        }
                                        className="flex-1 text-left px-8 py-2 text-xs text-gray-600 hover:bg-gray-100">
                                        {typeof subcategory === 'string'
                                          ? subcategory
                                          : subcategory.text}
                                      </button>
                                      {typeof subcategory === 'object' &&
                                        subcategory.hasSubcategories && (
                                          <button
                                            onClick={() =>
                                              handleSubSubmenuToggle(
                                                subcategory.text,
                                              )
                                            }
                                            className="px-2 py-2 text-gray-400 hover:text-gray-600">
                                            <ChevronDown
                                              className={`w-3 h-3 transition-transform ${
                                                activeSubSubmenu ===
                                                subcategory.text
                                                  ? 'rotate-180'
                                                  : ''
                                              }`}
                                            />
                                          </button>
                                        )}
                                    </div>

                                    {/* 3단계 하위 카테고리 */}
                                    {typeof subcategory === 'object' &&
                                      subcategory.hasSubcategories &&
                                      activeSubSubmenu === subcategory.text && (
                                        <div className="bg-gray-100">
                                          {subcategory.subcategories?.map(
                                            (subSubcategory, subSubIndex) => (
                                              <button
                                                key={subSubIndex}
                                                onClick={() =>
                                                  handleGalleryClick(
                                                    subSubcategory.href ||
                                                      submenu.href,
                                                  )
                                                }
                                                className="block w-full text-left px-12 py-2 text-xs text-gray-500 hover:bg-gray-200">
                                                {subSubcategory.text}
                                              </button>
                                            ),
                                          )}
                                        </div>
                                      )}
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Request Button */}
        <div className="hidden md:flex">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#4E5968] text-sm lg:text-base font-bold bg-[#F2F4F6] px-3 md:px-4 py-2 rounded-md hover:text-gray-800 hover:bg-[#E5E7EB] transition-colors">
            의뢰하기
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Mobile Request Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#4E5968] text-xs font-bold bg-[#F2F4F6] px-2 py-1.5 rounded-md hover:text-gray-800 hover:bg-[#E5E7EB] transition-colors">
            의뢰하기
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-[#465A6E] hover:text-gray-800 transition-colors"
            aria-label="메뉴 열기">
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        />

        {/* Side Menu */}
        <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">메뉴</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="메뉴 닫기">
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-4">
              {navigationPages.map(navPage => (
                <div key={navPage.id}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={navPage.href}
                      onClick={closeMobileMenu}
                      className="text-[#465A6E] font-bold text-base hover:text-gray-800 transition-colors flex-1">
                      {navPage.text}
                    </Link>

                    {navPage.hasDropdown && (
                      <button
                        onClick={handleDropdown}
                        className="p-2 text-[#465A6E] hover:text-gray-800 transition-colors">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            dropdown ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  {navPage.hasDropdown && dropdown && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-200">
                      {gallerySubmenus.map((submenu, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() =>
                                handleMobileGalleryClick(submenu.href)
                              }
                              className="flex-1 text-left text-sm text-gray-600 hover:text-gray-800 py-1">
                              {submenu.text}
                            </button>
                            {submenu.hasSubcategories && (
                              <button
                                onClick={() =>
                                  handleSubmenuToggle(submenu.text)
                                }
                                className="px-2 py-1 text-gray-400 hover:text-gray-600">
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    activeSubmenu === submenu.text
                                      ? 'rotate-180'
                                      : ''
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {/* 모바일 2단계 하위 카테고리 */}
                          {submenu.hasSubcategories &&
                            activeSubmenu === submenu.text && (
                              <div className="mt-1 pl-4 space-y-1">
                                {submenu.subcategories?.map(
                                  (subcategory, subIndex) => (
                                    <div key={subIndex}>
                                      <div className="flex items-center justify-between">
                                        <button
                                          onClick={() =>
                                            handleMobileGalleryClick(
                                              typeof subcategory === 'string'
                                                ? submenu.href
                                                : subcategory.href ||
                                                    submenu.href,
                                            )
                                          }
                                          className="flex-1 text-left text-sm text-gray-500 hover:text-gray-700 py-1">
                                          {typeof subcategory === 'string'
                                            ? subcategory
                                            : subcategory.text}
                                        </button>

                                        {typeof subcategory === 'object' &&
                                          subcategory.hasSubcategories && (
                                            <button
                                              onClick={() =>
                                                handleSubSubmenuToggle(
                                                  subcategory.text,
                                                )
                                              }
                                              className="px-1 py-1 text-gray-400 hover:text-gray-600">
                                              <ChevronDown
                                                className={`w-4 h-4 transition-transform ${
                                                  activeSubSubmenu ===
                                                  subcategory.text
                                                    ? 'rotate-180'
                                                    : ''
                                                }`}
                                              />
                                            </button>
                                          )}
                                      </div>

                                      {/* 모바일 3단계 하위 카테고리 */}
                                      {typeof subcategory === 'object' &&
                                        subcategory.hasSubcategories &&
                                        activeSubSubmenu ===
                                          subcategory.text && (
                                          <div className="mt-1 pl-4 space-y-1">
                                            {subcategory.subcategories?.map(
                                              (subSubcategory, subSubIndex) => (
                                                <button
                                                  key={subSubIndex}
                                                  onClick={() =>
                                                    handleMobileGalleryClick(
                                                      subSubcategory.href,
                                                    )
                                                  }
                                                  className="block w-full text-left text-sm text-gray-500 hover:text-gray-600 py-1">
                                                  {subSubcategory.text}
                                                </button>
                                              ),
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Request Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  closeMobileMenu();
                }}
                className="w-full text-white text-sm font-bold bg-[#465A6E] py-3 px-4 rounded-md hover:bg-[#3a4a5c] transition-colors">
                의뢰하기
              </button>
            </div>
          </nav>
        </div>
      </div>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
