import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchFiled: '',
    }
    //console.log('1-constructor');
  }

  componentDidMount() {
    //console.log('3-componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(
        () => {
          return { monsters: users }
        },
        () => { console.log(this.state) }))
  }
  onSearchChange = (event) => {
    const searchFiled = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchFiled }
    },
      () => { console.log(searchFiled) })
  }

  render() {
    //console.log('2-render');
    //this is filter - filtering the filteredMonsters. 
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchFiled)
    });

    return (
      <div className='App'>
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={this.onSearchChange}
        ></input>
        {
          filteredMonsters.map((monster) => {
            return (
              <div key={monster.id}>
                <h1>{monster.name}</h1>
              </div>
            )
          })
        }</div >
    )
  }
}

export default App;
