'use client';

import { Lock } from 'lucide-react';
import { useState } from 'react';

type SecretPasswordModalProps = {
  onClose: () => void;
  onConfirm: (password: string) => void;
};

const SecretPasswordModal = ({
  onClose,
  onConfirm,
}: SecretPasswordModalProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onConfirm(password);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl relative">
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-xl md:text-2xl transition-colors">
          ✕
        </button>

        <div className="p-8 pt-18 pb-9 text-center">
          <h2
            id="modal-title"
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            이런 장소도 인테리어 가능할까요?
          </h2>

          <div className="mb-6">
            <div className="flex items-center justify-center mb-5 space-x-3">
              <div className="w-7 h-7 bg-yellow-400 rounded flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-600 text-base md:text-lg font-semibold">
                비밀글로 작성된 글입니다.
              </p>
            </div>

            <p className="text-[#808080] text-sm md:text-base mb-1">
              작성자와 관리자만 열람할 수 있습니다.
            </p>
            <p className="text-[#808080] text-sm md:text-base">
              본인이라면 비밀번호를 입력해 주세요.
            </p>
          </div>

          {/* 비밀번호 입력 Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 text-sm md:text-base">
            <div className="text-left">
              <label
                htmlFor="password"
                className="block font-semibold text-gray-700 mb-2">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-300 hover:bg-green-500 text-white font-bold text-base md:text-lg
                py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none 
                focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              확인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecretPasswordModal;
