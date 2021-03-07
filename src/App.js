import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react'

const App = () => {
  const [list, setList] = useState([], (list) => console.log(list))
  const [author, setAuthor] = useState('')
  const [term, setTerm] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  // useEffect(() => {
  //   let URL = 'http://hn.algolia.com/api/v1/search_by_date?'
  
  //     console.log(author)
  //     console.log(term)
  //     console.log(dateStart)
  //     console.log(dateEnd)
  //     console.log('original list = ', list)
  
  //     if (term !== '') {
  //       URL = URL + `query=${term}`
  //     }
  
  //     if (author !== '' && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
  //       URL = URL + `&tags=author_${author}`
  //     }
  
  //     if (author !== '' && URL == 'http://hn.algolia.com/api/v1/search_by_date?') {
  //       URL = URL + `tags=author_${author}`
  //     }
      
  //     if (dateStart !== '' && dateEnd === '' && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
  //       URL = URL + `&numericFilters=created_at_i=${dateStart}`
  //     }
  
  //     if (dateStart !== '' && dateEnd === '' && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
  //       URL = URL + `numericFilters=created_at_i=${dateStart}`
  //     }
  
  //     if (dateStart !== '' && dateEnd !== '' && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
  //       URL = URL + `&numericFilters=created_at_i>${dateStart},created_at_i<${dateEnd}`
  //     }
  
  //     if (dateStart !== '' && dateEnd !== '' && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
  //       URL = URL + `numericFilters=created_at_i>${dateStart},created_at_i<${dateEnd}`
  //     }
  
  //     console.log(URL)
  
  //     fetch(URL).then(res => res.json()).then(data => {
  //       let result = data.hits
  //       console.log('result = ', result)
  //       setList(result)
  //       console.log(list)
  //     })
  // }, [term, author, dateStart, dateEnd])

  const getList = async () => {
    let URL = 'http://hn.algolia.com/api/v1/search_by_date?'
  
      console.log(author)
      console.log(term)
      console.log(dateStart)
      console.log(dateEnd)
      console.log('original list = ', list)
  
      if (term !== '') {
        URL = URL + `query=${term}`
      }
  
      if (author !== '' && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
        URL = URL + `&tags=author_${author}`
      }
  
      if (author !== '' && URL == 'http://hn.algolia.com/api/v1/search_by_date?') {
        URL = URL + `tags=author_${author}`
      }
      
      if (dateStart !== '' && dateEnd === '' && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
        URL = URL + `&numericFilters=created_at_i=${dateStart}`
      }
  
      if (dateStart !== '' && dateEnd === '' && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
        URL = URL + `numericFilters=created_at_i=${dateStart}`
      }
  
      if (dateStart !== '' && dateEnd !== '' && URL !== 'http://hn.algolia.com/api/v1/search_by_date?') {
        URL = URL + `&numericFilters=created_at_i>${dateStart},created_at_i<${dateEnd}`
      }
  
      if (dateStart !== '' && dateEnd !== '' && URL === 'http://hn.algolia.com/api/v1/search_by_date?') {
        URL = URL + `numericFilters=created_at_i>${dateStart},created_at_i<${dateEnd}`
      }
  
      console.log(URL)
  
      let result = await fetch(URL).then(res => res.json()).then(data => data.hits)

      console.log('result = ', result)
      setList(result)
      console.log(list)
  }

  return (
    <div>
      <ul>
        {list.map(item => {
          return <li>{item.author}</li>
        })}
      </ul>
      <button onClick={getList}>get list</button>
      <button onClick={() => setAuthor('pg')}>set author</button>
    </div>
  );
}

export default App;


