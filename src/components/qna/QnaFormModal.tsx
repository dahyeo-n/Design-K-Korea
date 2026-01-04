import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

type QnaFormModalProps = {
  onClose: () => void;
  onSuccess?: () => void;
};

const QnaFormModal = ({ onClose, onSuccess }: QnaFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    contents: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // 파일 크기 제한 (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하만 가능합니다.');
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    // 고유한 파일 이름 생성
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from('qna-files')
      .upload(filePath, file);

    if (error) {
      console.error('File upload error:', error);
      throw error;
    }

    // 공개 URL 가져오기
    const { data } = supabase.storage.from('qna-files').getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 파일 업로드 (있는 경우)
      let fileUrl: string | null = null;
      if (file) {
        fileUrl = await uploadFile(file);
      }

      const { data, error } = await supabase.from('q&a').insert([
        {
          name: formData.name,
          title: formData.title,
          contents: formData.contents,
          status: '답변대기',
          file: fileUrl,
        },
      ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Successfully inserted:', data);
      alert('질문이 등록되었습니다!');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error submitting question:', error);
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`질문 등록에 실패했습니다.\n에러: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-8 text-[#555A5E] text-sm md:text-base">
            <div className="space-y-3">
              <label className="block font-semibold">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block font-semibold">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
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
                value={formData.contents}
                onChange={e =>
                  setFormData({ ...formData, contents: e.target.value })
                }
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
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 
                  file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
                  hover:file:bg-blue-100 file:transition-colors file:cursor-pointer"
              />
              {file && (
                <p className="text-sm text-blue-600">
                  선택된 파일: {file.name}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                이미지, PDF, Word 파일 가능 (최대 5MB)
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-2 bg-blue-500 text-white text-base md:text-lg font-semibold rounded-lg
                  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QnaFormModal;
