import { memo, useMemo } from 'react';
import { IProduct } from 'models';
import Product from './Product';

import * as S from './style';

interface IProps {
  products: IProduct[];
  filters?: {
    sizes: string[];
    maxPrice: number;
  };
}

const Products = memo(({ products, filters }: IProps) => {
  // Memoized filtering to prevent expensive operations on every render
  const filteredProducts = useMemo(() => {
    if (!filters) return products;
    
    return products?.filter(product => {
      const sizeMatch = filters.sizes.length === 0 || 
        filters.sizes.every(size => product.availableSizes?.includes(size));
      const priceMatch = product.price <= filters.maxPrice;
      
      return sizeMatch && priceMatch;
    }) || [];
  }, [products, filters]);

  return (
    <S.Container>
      {filteredProducts.map((p) => (
        <Product product={p} key={p.sku} />
      ))}
    </S.Container>
  );
});

Products.displayName = 'Products';

export default Products;
