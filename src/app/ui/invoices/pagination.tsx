'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <nav aria-label="Pagination">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      {allPages.map((page, index) => (
        <PaginationNumber
          key={`${page}-${index}`}
          href={createPageURL(page)}
          page={page}
          isActive={currentPage === page}
        />
      ))}

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </nav>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  if (isActive) {
    return <span aria-current="page">{page}</span>;
  }

  if (page === '...') {
    return <span>{page}</span>;
  }

  return <Link href={href}>{page}</Link>;
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const icon = direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />;
  const label = direction === 'left' ? 'Previous page' : 'Next page';

  if (isDisabled) {
    return (
      <span aria-disabled="true" aria-label={label}>
        {icon}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label}>
      {icon}
    </Link>
  );
}