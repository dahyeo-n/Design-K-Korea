'use client';

import { useState, type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const Navbar = (): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);

  const navigationPages = [
    { id: 1, text: '회사소개', href: '/about', hasDropdown: false },
    { id: 2, text: '갤러리', href: '/gallery/1', hasDropdown: true },
    { id: 3, text: '질문', href: '/qna', hasDropdown: false },
  ];

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <header
      className="sticky top-0 z-10 mx-auto
      px-5 sm:px-8 md:px-16 lg:px-32 xl:px-60 py-3 h-14
      flex items-center justify-between bg-white shadow-md">
      <div className="flex items-center md:space-x-12 lg:space-x-14">
        <Link href="/">
          <Image
            src="/design-k-korea-logo.png"
            alt="design-k-korea logo"
            width={123}
            height={36}
            priority
          />
        </Link>
        <div className="hidden md:flex items-center space-x-8 lg:space-x-14">
          {navigationPages.map(navPage => (
            <Link
              key={navPage.id}
              href={navPage.href}
              className="text-[#465A6E] font-bold hover:text-gray-800 transition-colors flex items-center text-sm lg:text-base">
              {navPage.text}
              {navPage.hasDropdown && (
                <ChevronDown
                  className="w-4 h-4 ml-1"
                  onClick={handleDropdown}
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      <nav className="flex items-center space-x-6">
        <Link
          href="/request"
          className="text-[#4E5968] text-sm lg:text-base font-bold bg-[#F2F4F6] px-3 md:px-4 py-2 rounded-md hover:text-gray-800 hover:bg-[#E5E7EB] transition-colors">
          의뢰하기
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
