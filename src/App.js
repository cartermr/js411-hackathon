import './App.css';
import List from './components/List'
import React from 'react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className="searchbar">
              <img className='imagehead'></img>
              <h2>Search Hacker News</h2>
              <form>
                <input type='text' ></input>
                <button type="submit">GO</button>
              </form>
              <a className="settings">Settings</a>
          </div>
          <div className="dropdowncont">
                  <div class="dropdown">
                    search
                      <button class="dropbtn">Stories</button>
                      <div class="dropdown-content">
                        <a href="#">All</a>
                        <a href="#">Stories</a>
                        <a href="#">Comments</a>
                      </div>
                      </div>
                  
                  <div class="dropdowna">
                    by
                      <button class="dropbtna">Poplarity</button>
                      <div class="dropdown-contenta">
                        <a href="#">Populatiry</a>
                        <a href="#">Date</a>
                        </div>
                  </div>

                  <div class="dropdownb">
                    by
                      <button class="dropbtnb">All time</button>
                      <div class="dropdown-contentb">
                        <a href="#">All time</a>
                        <a href="#">Last 24h</a>
                        <a href="#">Past Week</a>
                        <a href="#">Past Month</a>
                        <a href="#">Past Year</a>
                        <a href="#">Custom Range</a>
                        </div>
                  </div>
                  
            </div>
        <List />

        
      </header>
    </div>
  );
}

export default App;