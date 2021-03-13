import './App.css';
import List from './components/List'
import React, { useState } from 'react'

function App() {
  const [searchOptions, setSearchOptions] = useState({
    query: '',
    searchType: '',
    searchTime: '',
    searchBy: ''
  })
  return (
    <div className="App">
      <header className="App-header">
          <div className="searchbar">
              <img className='imagehead' alt=""></img>
              <h2>Search Hacker News</h2>
              <form>
                <input onChange={(e) => setSearchOptions({...searchOptions, query: e.target.value})} type='text' ></input>
                {/* <button type="submit">GO</button> */}
              </form>
              {/* <a className="settings">Settings</a> */}
          </div>
          <div className="dropdowncont">
                  <div className="dropdown">
                    search
                      <button className="dropbtn">Stories</button>
                      <div className="dropdown-content">
                        <a href="#" onClick={() => setSearchOptions({...searchOptions, searchType: ''})}>All</a>
                        <a href="#" name='story' onClick={e => setSearchOptions({...searchOptions, searchType: e.target.name})}>Stories</a>
                        <a href="#" name='comment' onClick={e => setSearchOptions({...searchOptions, searchType: e.target.name})}>Comments</a>
                      </div>
                      </div>
                  
                  <div className="dropdowna">
                    by
                      <button className="dropbtna">Popularity</button>
                      <div className="dropdown-contenta">
                        <a href="#" name="popularity" onClick={e => setSearchOptions({...searchOptions, searchBy: e.target.name})}>Popularity</a>
                        <a href="#" name="date" onClick={e => setSearchOptions({...searchOptions, searchBy: e.target.name})}>Date</a>
                        </div>
                  </div>

                  <div className="dropdownb">
                    for
                      <button className="dropbtnb">All time</button>
                      <div className="dropdown-contentb">
                        <a href="#" onClick={() => setSearchOptions({...searchOptions, searchTime: ''})}>All time</a>
                        <a href="#" name='past_24' onClick={e => setSearchOptions({...searchOptions, searchTime: e.target.name})}>Last 24h</a>
                        <a href="#" name='past_week' onClick={e => setSearchOptions({...searchOptions, searchTime: e.target.name})}>Past Week</a>
                        <a href="#" name='past_month' onClick={e => setSearchOptions({...searchOptions, searchTime: e.target.name})}>Past Month</a>
                        <a href="#" name='past_year' onClick={e => setSearchOptions({...searchOptions, searchTime: e.target.name})}>Past Year</a>
                        </div>
                  </div>
            </div>
        <List search={searchOptions} />

        
      </header>
    </div>
  );
}

export default App;