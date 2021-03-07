import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

const App = () => {
  const [list, setList] = useState([])
  const [author, setAuthor] = useState('')
  const [term, setTerm] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const getList = async (term, author, dateStart, dateEnd) => {
    let URL = 'http://hn.algolia.com/api/v1/search_by_date?'

    //console.log(author)
    console.log(term)
    //console.log(dateStart)
    //console.log(dateEnd)

    setAuthor('pg')

    if (term !== undefined) {
      URL = URL + `query=${term}`
    }

    if (author !== undefined && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `&tags=author_${author}`
    }

    if (author !== undefined && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `tags=author_author`
    }
    
    if (dateStart !== undefined && dateEnd === undefined && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `&numericFilters=created_at_i=${dateStart}`
    }

    if (dateStart !== undefined && dateEnd === undefined && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `numericFilters=created_at_i=${dateStart}`
    }

    if (dateStart !== undefined && dateEnd !== undefined && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `&numericFilters=created_at_i>${dateStart},created_at_i<${dateEnd}`
    }

    if (dateStart !== undefined && dateEnd !== undefined && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
      URL = URL + `numericFilters=created_at_i>${dateStart},created_at_i<${dateEnd}`
    }

    console.log(URL)

    let result = await fetch(URL).then(res => res.json())

    console.log(result)
  }

  return (
    <div>
      <button onClick={getList}>TEST</button>
    </div>
  );
}

export default App;


