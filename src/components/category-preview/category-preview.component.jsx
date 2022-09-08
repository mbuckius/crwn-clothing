import ProductCard from '../product-card/product-card.component';

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from './category-preview.styles';

const CategoryPreview = ({ title, subcategories }) => {

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={`${title}#top`}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
          {/* Display first product in each subcategory */}
          { Object.keys(subcategories)
            .filter((_, idx) => idx < 4)
            .map((products) => (
              <ProductCard key={subcategories[products][0].id} product={subcategories[products][0]} category={title} subcategory={products} />
            ))
          }
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
