type BadgeProps = {
  status: '공지사항' | '답변대기' | '답변완료';
};

const Badge = ({ status }: BadgeProps) => {
  const styles = {
    공지사항: 'bg-blue-100 text-blue-600',
    답변대기: 'bg-gray-100 text-gray-600',
    답변완료: 'bg-green-100 text-green-600',
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs md:text-sm font-bold rounded ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Badge;
