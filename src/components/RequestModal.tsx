'use client';

import { useState, type JSX } from 'react';
import { X } from 'lucide-react';

type RequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RequestModal = ({
  isOpen,
  onClose,
}: RequestModalProps): JSX.Element | null => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    title: '',
    attachedFile: null as File | null,
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      attachedFile: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API 호출 로직 추후 구현
    console.log('Form submitted: ', formData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2
            id="modal-title"
            className="text-xl md:text-2xl font-bold text-gray-900">
            의뢰서 작성하기
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="modal close button">
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 text-sm md:text-base text-[#555A5E">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="이름을 입력해 주세요."
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium mb-2">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="전화번호를 입력해 주세요."
              />
            </div>

            <div>
              <label htmlFor="company" className="block font-medium mb-2">
                회사명
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="회사명을 입력해 주세요."
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="이메일을 입력해 주세요."
              />
            </div>

            <div>
              <label htmlFor="title" className="block font-medium mb-2">
                제휴 내용 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="제휴 내용을 입력해 주세요."
              />
            </div>

            <div>
              <label htmlFor="file" className="block font-medium mb-2">
                첨부 파일
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                placeholder="파일 첨부"
              />
              <p className="mt-2 text-xs md:text-sm text-gray-500">
                참고 가능한 자료가 있다면 이곳에 첨부해주세요.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-[#808b75] hover:bg-[#5A6351] text-white font-medium py-3 px-4 rounded-md transition-colors cursor-pointer">
              의뢰하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
