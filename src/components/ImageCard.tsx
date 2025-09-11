import { type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type ImageCardProps = {
  title: string;
  subtitle: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  icon?: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  lookCloser?: boolean;
};

const ImageCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  icon,
  gradientFrom,
  gradientTo,
  lookCloser,
}: ImageCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div
        className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white text-sm font-medium shadow-md`}>
        <div className="flex items-center gap-2">
          {icon}
          {subtitle}
        </div>
      </div>

      <div className="relative h-64 sm:h-72 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {lookCloser && (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <div className="flex items-center text-blue-600 font-medium transition-transform duration-200">
            자세히 보기
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
