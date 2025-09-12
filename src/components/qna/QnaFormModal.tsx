import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';

type QnaFormModalProps = {
  onClose: () => void;
};

const QnaFormModal = ({ onClose }: QnaFormModalProps) => {
  const [isSecret, setIsSecret] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl relative max-h-[90vh] flex flex-col">
        <div className="relative rounded-t-2xl overflow-hidden flex-shrink-0">
          <div className="relative h-48 md:h-56">
            <Image
              src="/qna-cover.jpg"
              alt="Q&A Cover"
              fill
              priority
              className="object-cover"
            />
            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                질문 작성하기
              </h1>
            </div>

            <button
              onClick={onClose}
              aria-label="modal close button"
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form - 스크롤 가능한 영역 */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-8 space-y-8 text-[#555A5E] text-sm md:text-base">
            <div className="space-y-3">
              <label className="block font-semibold">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block font-semibold">
                비밀글 여부 <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="secret"
                    checked={!isSecret}
                    onChange={() => setIsSecret(false)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span>공개글</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="secret"
                    checked={isSecret}
                    onChange={() => setIsSecret(true)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span>비밀글</span>
                </label>
              </div>

              {isSecret && (
                <div className="space-y-3 mt-6">
                  <label className="block font-semibold">
                    비밀번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="최소 4자 ~ 최대 12자"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3
                      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                      transition-all duration-200"
                    minLength={4}
                    maxLength={12}
                    required
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="block font-semibold">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={20}
                placeholder="최대 20자까지 작성 가능합니다."
                className="w-full border border-gray-300 rounded-lg px-4 py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block font-semibold">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block font-semibold">첨부 파일</label>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 
                  file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
                  hover:file:bg-blue-100 file:transition-colors file:cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                참고 가능한 자료가 있다면 여기에 첨부해주세요.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-7 py-2 bg-blue-500 text-white text-base md:text-lg font-semibold rounded-lg
                  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  transition-all duration-200 shadow-md hover:shadow-lg">
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QnaFormModal;
