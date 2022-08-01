import { createSelector } from 'reselect';

//create memoized selector
//return previously calculated value instead of rerunning code 

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const { title, items } = category;  
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
 
  