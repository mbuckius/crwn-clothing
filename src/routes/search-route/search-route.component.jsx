import { Routes, Route } from 'react-router-dom';
import SearchResults from '../search-results/search-results.component';
import Search from '../search/search.component';


const SearchRoute = () => {
  return (
    <Routes>
      <Route index element={<Search />} />
      <Route path=':searchField' element={<SearchResults />} />
    </Routes>
  );
};

export default SearchRoute;