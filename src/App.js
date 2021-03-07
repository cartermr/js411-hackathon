import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

function App() {
  const [list, setList] = useState([])

  const getList = (term, author, dateStart, dateEnd) => {
    let URL = 'http://hn.algolia.com/api/v1/search_by_date?'

    if (term !== '') {
      URL = URL + `query=${term}`
    }

    if (author !== '' && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `&tags=author_${author}`
    }

    if (author !== '' && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `tags=author_${author}`
    }
  }

  return (
    <div>
      
    </div>
  );
}

export default App;


