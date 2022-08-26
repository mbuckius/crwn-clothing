import { Routes, Route } from 'react-router-dom';

import Category from '../category/category.component';
import Product from '../product/product.component';

const CategoryRoute = () => {
  return (
    <Routes>
      <Route index element={<Category />} />
      <Route path=':id' element={<Product />} />
    </Routes>
  );
};

export default CategoryRoute;