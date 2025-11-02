'use client';

import { useState, type JSX } from 'react';
import { X } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  const validateForm = () => {
    // 이름 검증
    if (!formData.name.trim()) {
      setError('이름을 입력해 주세요.');
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError('이름은 2글자 이상이어야 합니다.');
      return false;
    }

    // 전화번호 검증
    const phoneRegex = /^01[0-9]{8,9}$/;
    if (!formData.phone.trim()) {
      setError('전화번호를 입력해 주세요.');
      return false;
    }
    if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
      setError('올바른 전화번호 형식이 아닙니다. (예: 01012345678)');
      return false;
    }

    // 이메일 검증 (선택사항이지만 입력된 경우)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('올바른 이메일 형식이 아닙니다.');
        return false;
      }
    }

    // 제휴 내용 검증
    if (!formData.title.trim()) {
      setError('제휴 내용을 입력해 주세요.');
      return false;
    }
    if (formData.title.trim().length < 5) {
      setError('제휴 내용은 5글자 이상 입력해 주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // 유효성 검사
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let fileUrl = null;

      // 파일이 있는 경우 Supabase Storage에 업로드
      if (formData.attachedFile) {
        const fileExt = formData.attachedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `requests/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('request-files')
          .upload(filePath, formData.attachedFile);

        if (uploadError) {
          console.error('파일 업로드 오류:', uploadError);
          // 파일 업로드 실패해도 의뢰는 진행
        } else {
          fileUrl = filePath;
        }
      }

      // Supabase 테이블 구조에 맞춰 데이터 매핑
      const insertData = {
        name: formData.name.trim(),
        phone_number: formData.phone.replace(/-/g, '').trim(),
        contents: formData.title.trim(),
        office_name: formData.company.trim() || null,
        email: formData.email.trim() || null,
        file: fileUrl,
      };

      console.log('삽입할 데이터: ', insertData);

      const { data, error: supabaseError } = await supabase
        .from('request')
        .insert([insertData])
        .select();

      console.log('Supabase 응답: ', { data, error: supabaseError });

      if (supabaseError) {
        console.error('Supabase 에러 상세: ', {
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint,
          code: supabaseError.code,
        });
        throw supabaseError;
      }

      // 성공 처리
      setSuccess(true);
      // 폼 리셋
      setFormData({
        name: '',
        phone: '',
        company: '',
        email: '',
        title: '',
        attachedFile: null,
      });

      // 2초 후 모달 닫기
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('의뢰서 제출 오류: ', err);
      setError('의뢰서 제출에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    // 상태 리셋
    setError(null);
    setSuccess(false);
    setFormData({
      name: '',
      phone: '',
      company: '',
      email: '',
      title: '',
      attachedFile: null,
    });
    onClose();
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
            onClick={handleClose}
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
              <p className="mt-2 text-xs md:text-sm text-gray-500">
                특수문자 없이 숫자만 입력해 주세요. 예&#41; 01012345678
              </p>
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
                참고 가능한 자료가 있다면 이곳에 첨부해 주세요.
              </p>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* 성공 메시지 */}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">
                의뢰서가 성공적으로 제출되었습니다!
              </p>
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#808b75] hover:bg-[#5A6351] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors cursor-pointer">
              {isLoading ? '제출 중...' : '의뢰하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
