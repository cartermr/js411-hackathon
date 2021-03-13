/**
 * List component to make fecth request to API, track results, and display them.
 * 
 * Takes in a prop Object called search
 *    : query - generic search terms
 *    : searchType - searching by all, story, or comments
 *    : searchTime - filter the time frame of the search, past 24 hours, past week, past month, or past year
 * 
 */

import React, { useState, useEffect } from 'react'

// List component definition, destructure search out of props.search
function List  ({search})  {
  // State to track the list of results from the API
  const [list, setList] = useState([])

  // lifecycle method, runs when certain prop values passed in have changed
  useEffect(() => {

    console.log(JSON.stringify(search))

    // Base URL of the API with the query term
    let URL = ''
    if (search.searchBy === 'date') {
      URL = `http://hn.algolia.com/api/v1/search_by_date?query=${search.query}`
    } else {
      URL = `http://hn.algolia.com/api/v1/search?query=${search.query}`
    }

    // Add on the search type like stories or comments
    if (search.searchType) {
      URL = URL + `&tags=${search.searchType}`
    }

    // Filters the search by the specified time frame
    if (search.searchTime) {
      // Call function to get the starting value and ending values as seconds, required by API
      const timeFrane = setTimeValues(search.searchTime)
      URL = URL + `&numericFilters=created_at_i>${timeFrane.start},created_at_i<${timeFrane.end}`
    }

    console.log(URL)

    // make fecth call with built URL to API
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        // Retrieve the results from the fetch call, put results in the the list state
        let result = data.hits
        // Filter out any results that have no title or url listed
        let filterReslt = result.filter( item => {
          if (!item.title && !item.url && !item.story_title && !item.story_url) {
            return false
          } else {
            return true
          }
        })
        // Put the results in the list state
        setList(filterReslt)
      })

      // props variables being watched to fire this function when they change
  }, [search.query, search.searchType, search.searchTime, search.searchBy])

  return (
    <ul >
      {list.map((item, index) => {
        return <li key={index}>
                  <div className="divcont">
                        <div className="firstRowLi" > 
                          <h4> {item.title ? item.title : item.story_title}</h4>
                          <a href={item.url ? item.url : item.story_url}>{item.url || item.story_url}</a>
                        </div>  

                        <div className="secondRowLi" > 
                          <p className="pointstag"> {item.points ? item.points : 0} points</p>
                          <p className="spacertag">|</p> 
                          <a className="authortag" href={item.url || item.story_url}>{item.author}</a>
                          <p className="spacertag">|</p> 
                          <p className="datetag">{} PLACEHOPLDER years ago</p>
                          <p className="spacertag">|</p> 
                          <p className="commentstag"> {item.numComments} PLACEHOLDER comments</p>
                        </div>
                    </div>
                 </li>
      })}
    </ul>
  )
}

// Function to get time frame values in seconds
const setTimeValues = (timeFrame) => {
  // Date objects, both initially set for today
  let end = new Date()
  let start = new Date()
  // Return object
  let timeRange = {}

  // Modify the start object date by the time frame requested
  switch (timeFrame) {
    case 'past_24':
      start.setDate(start.getDate() - 1)      
      break;
    case 'past_week':
      start.setDate(start.getDate() - 7)      
      break;
    case 'past_month':
      start.setDate(start.getDate() - 31)      
      break;
    case 'past_year':
      start.setDate(start.getDate() - 365)      
      break;
    default:
      break;
  }

  // Convert the start and end objects will show time in miliseconds, convert them to seconds
  timeRange.start = start / 1000
  timeRange.end = end / 1000

  // Return the timeRange object
  return timeRange
}

export default List