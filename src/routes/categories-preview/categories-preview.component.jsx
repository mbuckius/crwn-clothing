import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  console.log(categoriesMap);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const subcategories = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} subcategories={subcategories} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
