import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Card from './components/Card';
import Board from './components/Board';

class Heroes extends Component {
  constructor(props) {
      super(props);
      this.state = {
          heroes: [],
          addingName: '',
          isLoading: true,
      }
  }
  addActor(){
    let people = this.state.heroes.slice();
    const addingName = this.state.addingName;
    people.push(<Card name={this.state.addingName} 
      index={people.length + 1} 
      key={this.state.addingName} 
      onClick={() => this.removeActor(addingName)} />);
    this.setState({
      heroes: people,
      addingName: '',
    });
    console.log(people);
  }
  grabName(e) {        
    const value = e.target.value;
    this.setState({
      addingName: value
    })
  }
  removeActor(name){
    let people = this.state.heroes.slice();
    const newPeople = people.filter(function(person) { 
      return person.key !== name 
    });
    this.setState({
      heroes: newPeople,
    });
  }
  componentDidMount() {
      fetch('https://swapi.co/api/people/', {mode: 'cors'}).then(results => {
          return results.json();
      }).then(data => {
          let people = data.results.map((man, index) => {
              return (
                <Card name={man.name} index={index} key={man.name} onClick={() => this.removeActor(man.name)} />
              );
          });
          this.setState({
              heroes: people,
              isLoading: false,
          });
      });
  }
  render() {
    return (
        <ul className="list-heroes">
            {this.state.isLoading && <p>Loading...</p>}
            {this.state.heroes}
            <Board onClick={() => this.addActor()} 
                  onChange={(e) => this.grabName(e)} 
                  value={this.state.addingName} />
        </ul>
    );
  }
}

function App () {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul className="menu">
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/actors">Актёры</Link>
              </li>
            </ul>            
          </nav>
          <Switch>
            <Route path="/actors">
              <Actors />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );  
}

function Actors() {
    return (
      <div className="actors-wrap">
        <h2>Актёры</h2>
        <Heroes />
      </div>
    );
}

function Home() {
  return (
    <React.Fragment>
      <h2>Главная</h2>      
    </React.Fragment>
  );
}

export default App;
