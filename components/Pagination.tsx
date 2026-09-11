type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <nav className="text-center text-gray-100">
      Page {currentPage} of {totalPages}
    </nav>
  );
}