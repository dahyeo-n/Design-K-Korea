type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  return (
    <nav
      className="flex items-center space-x-2"
      role="navigation"
      aria-label="페이지 네비게이션">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? 'bg-blue-400 text-white'
              : 'bg-[#F1F7FF]  text-[#808080] hover:bg-[#E5E7EB]'
          }`}
          aria-current={currentPage === i + 1 ? 'page' : undefined}>
          {i + 1}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
