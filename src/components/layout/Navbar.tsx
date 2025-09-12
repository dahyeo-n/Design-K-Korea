'use client';

import { useState, useEffect, type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

import RequestModal from '../RequestModal';

const Navbar = (): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationPages = [
    { id: 1, text: '회사소개', href: '/about', hasDropdown: false },
    { id: 2, text: '갤러리', href: '/gallery/1', hasDropdown: true },
    { id: 3, text: '질문', href: '/qna', hasDropdown: false },
  ];

  const gallerySubmenus = [
    '오피스',
    '아이스테틱 공간',
    '브랜드',
    '공간 미디어',
  ];

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setDropdown(false);
  };

  // 모바일 메뉴가 열려있을 때 body 스크롤 방지
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
              <Link
                href={navPage.href}
                className="text-[#465A6E] font-bold hover:text-gray-800 transition-colors flex items-center text-sm lg:text-base">
                {navPage.text}
                {navPage.hasDropdown && (
                  <ChevronDown
                    className="w-4 h-4 ml-1 cursor-pointer"
                    onClick={e => {
                      e.preventDefault();
                      handleDropdown();
                    }}
                  />
                )}
              </Link>

              {/* Desktop Dropdown */}
              {navPage.hasDropdown && dropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {gallerySubmenus.map((submenu, index) => (
                      <Link
                        key={index}
                        href={`/gallery/${index + 1}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setDropdown(false)}>
                        {submenu}
                      </Link>
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

      {/* Mobile Side Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Backdrop */}
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
                    <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-200">
                      {gallerySubmenus.map((submenu, index) => (
                        <Link
                          key={index}
                          href={`/gallery/${index + 1}`}
                          onClick={closeMobileMenu}
                          className="block text-gray-600 hover:text-gray-800 transition-colors py-1">
                          {submenu}
                        </Link>
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

      {/* Desktop Dropdown Backdrop */}
      {dropdown && (
        <div
          className="fixed inset-0 z-10 hidden md:block"
          onClick={() => setDropdown(false)}
        />
      )}

      {/* Request Modal */}
      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
