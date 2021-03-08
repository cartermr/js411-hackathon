/**
 * List component to make fecth request to API, track results, and display them.
 * 
 * The List will default to the top 20 most recent storys with no props passed or
 * props passed as 0 or ''
 * 
 * This component can be passed the following props
 *  -- term: a string, general search term or word to filter list
 *  -- author: a string, the name of the author to filter list
 *  -- dateStart: a Date object, the starting date of a range of dates to filter list
 *  -- dateEnd: a Date object, the ending day or a range of dates to filter list
 * 
 * This will return a <ul> list of links
 */

import React, { useState, useEffect } from 'react'

const List = (props) => {
  // State to track the list of results from the API
  const [list, setList] = useState([])

  useEffect(() => {
    // Base URL of the API
    let URL = "http://hn.algolia.com/api/v1/search_by_date?"

    // If any general search terms, add to API request
    if (props.term) {
      URL = URL + `query=${props.term}`
    }

    // If author is passed, filter results by author with other search terms
    if (
      props.author && URL !== "http://hn.algolia.com/api/v1/search_by_date?"
    ) {
      URL = URL + `&tags=author_${props.author}`
    }

    // If author is passed alone, filter results by author only
    if (
      props.author && URL === "http://hn.algolia.com/api/v1/search_by_date?"
    ) {
      URL = URL + `tags=author_${props.author}`
    }

    // If dateStart only and other filter options, filter by just that day, with other filter options
    if (
      props.dateStart && !props.dateEnd && URL !== "http://hn.algolia.com/api/v1/search_by_date?"
    ) {
      let start = props.dateStart.setHours(0) / 1000
      let end = props.dateStart.setHours(23, 59, 59) / 1000
      URL = URL + `&numericFilters=created_at_i>${start},created_at_i<${end}`
    }

    // If dateStart only, filter by just that day only
    if (
      props.dateStart && !props.dateEnd && URL === "http://hn.algolia.com/api/v1/search_by_date?"
    ) {
      let start = props.dateStart.setHours(0) / 1000
      let end = props.dateStart.setHours(23, 59, 59) / 1000
      URL = URL + `numericFilters=created_at_i>${start},created_at_i<${end}`
    }

    // If dateStart and dateEnd and other filter options, filter by date range, with other filter options
    if (
      props.dateStart && props.dateEnd && URL !== "http://hn.algolia.com/api/v1/search_by_date?"
    ) {
      let start = props.dateStart.setHours(0) / 1000
      let end = props.dateEnd.setHours(23, 59, 59) / 1000
      URL = URL + `&numericFilters=created_at_i>${start},created_at_i<${end}`
    }

    // If dateStart and dateEnd only, filter by date range only
    if (
      props.dateStart && props.dateEnd && URL === "http://hn.algolia.com/api/v1/search_by_date?"
    ) {
      let start = props.dateStart.setHours(0) / 1000
      let end = props.dateEnd.setHours(23, 59, 59) / 1000
      URL = URL + `numericFilters=created_at_i>${start},created_at_i<${end}`
    }

    // make fecth call with built URL to API
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        // Retrieve the results from the fetch call, put results in the the list state
        let result = data.hits
        setList(result)
      })

      // When the props change, this useEffect function will fire, causing list to re-render with the filtered results
  }, [props.term, props.author, props.dateStart, props.dateEnd])

  return (
    <ul>
      {list.map((item, index) => {
        return <li key={index}><a href={item.url ? item.url : item.story_url}>{item.title ? item.title : item.story_title}</a></li>
      })}
    </ul>
  )
}

export default List