
import React from 'react';

interface PaginationProps {
  currentPage: number;
  total_pages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, total_pages, onPageChange }) => {
  const pages = Array.from({ length: total_pages }, (_, i) => i + 1);

  return (
    <div>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;