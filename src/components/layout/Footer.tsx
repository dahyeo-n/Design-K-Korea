import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <div>
            <div className="mb-5 sm:mb-7">
              <Image
                src="/design-k-korea-logo.png"
                alt="design-k-korea logo"
                width={123}
                height={36}
                priority
              />
            </div>
            <p className="text-gray-600 text-lg sm:text-xl font-bold mb-7">
              오직, 당신을 위한 인테리어.
            </p>

            <div className="flex justify-between">
              <div className="flex space-x-3">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 rounded bg-green-500 hover:bg-green-600 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.98.115.12.219.089.402-.09.315-.294 1.165-.334 1.328-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z" />
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
              </div>

              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base font-bold text-gray-600">
                <Link
                  href="/terms-of-service"
                  className="hover:text-gray-900 transition-colors">
                  이용약관
                </Link>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-900 transition-colors">
                  개인정보처리방침
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-8">
          <div className="flex flex-col space-y-2 text-xs sm:text-sm text-gray-500">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-1 lg:space-y-0">
              <span>
                경기도 평택시 산단로16번길 26, 1304호 (모곡동, 엠에스원타워)
              </span>
            </div>
            <div className="lg:flex lg:justify-between">
              <div className="flex flex-row space-y-1 lg:space-y-0 mb-3 lg:mb-0">
                <span>대표: 김길용&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span>010-3323-1236&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span>팩스: 0504-291-1236</span>
              </div>
              <div>
                <span>
                  (주)디자인케이코리아 Copyright &copy; Design K Korea, Inc. All
                  Rights Reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
