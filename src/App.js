import React from 'react';
import Card from './Card';
import Search from './Search';
import Loader from './Loader';
import './App.css';
 

class App extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      conf : [],
      allEvents: [],
      displayEvents: [],
      query: '',
      isLoaded: false
    }
    this.filterOnQueryChange =  this.filterOnQueryChange.bind(this);
  }
    
  componentDidMount() {
  fetch("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences")
  .then(response => response.json())
  .then(response => {
      const { free, paid } = response;
      const allEvents = [...free, ...paid];

      this.setState(state => (
        {
          ...state, 
          conf: response,
          allEvents,
          displayEvents: allEvents,
          isLoaded: true
        }
      ))
  })
  }

  filterOnQueryChange(query) {
    const { allEvents, displayEvents } = this.state;
    const queryString = query.toLowerCase();


    const filteredEvents = allEvents && allEvents.filter(event => {
      const { confName, city } = event;
      const matchTitle = confName.toLowerCase().includes(queryString);
      const matchCity = city.toLowerCase().includes(queryString);

      return matchTitle || matchCity;
    });

    this.setState(state => ({
      ...state,
      displayEvents: filteredEvents
    }));
  }

  onSearchChange(event) {
    const query = event.target.value;

    this.setState(state => ({
      ...state,
      query
    }), () => {
      this.filterOnQueryChange(query);
    });
  }

  render(){
    const { displayEvents, query, isLoaded } = this.state;
  
    return (
      <div className="App">
        <Search onSearch={(event) => this.onSearchChange(event)} value={query} />
        {isLoaded ? (
          displayEvents && displayEvents.length !== 0 ? (
              displayEvents.map((event, index) => {
              return <Card key={`${event.conference_id}_${index}`} event={event} />
            })
          ) : <p>Sorry! No events to display</p>
        ) : <Loader />}
      </div>
    );
  }
}

export default App;
