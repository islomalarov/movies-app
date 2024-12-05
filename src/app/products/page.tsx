'use client';
import { FunctionComponent } from 'react';
import TheCardsList from '@/components/Card/TheCardsList';
import ThePagination from '@/components/Pagianation/ThePagination';

const Products: FunctionComponent = () => {
  return (
    <div className="min-h-screen flex gap-4 flex-col">
      <div className="flex-1">
        <TheCardsList />
      </div>
      <ThePagination />
    </div>
  );
};

export default Products;
