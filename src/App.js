import PageWithSearch from './components/PageWithSearch';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div>
      {/*bosch strip */}
      <div className='bosch_strip'></div>
      {/* <PageWithSearch /> */}

      <Routes>
        <Route
          path='/'
          exact
          element={<Home />}
        />
        <Route
          path='/search/:search_term'
          exact
          element={<SearchResults />}
        />
      </Routes>
    </div>
  );
}

export default App;
