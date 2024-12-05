import React, { FunctionComponent } from 'react';

interface ProductsLayoutProps {
  children: React.ReactNode;
}

const ProductsLayout: FunctionComponent<ProductsLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ProductsLayout;
