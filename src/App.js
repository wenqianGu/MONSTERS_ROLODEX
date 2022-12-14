import './App.css';
import {Component} from 'react';
import CardList from "./components/card-list/card-list.component";

// constructor / renders on mount / renders whenever props change and setState gets called(componentDidMount).
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monsters: [],
            searchField: '',
        }
        //console.log('1-constructor');
    }

    componentDidMount() {
        //console.log('3-componentDidMount');
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => this.setState(
                () => {
                    return {monsters: users}
                }))
    }

    onSearchChange = (event) => {
        const searchField = event.target.value.toLocaleLowerCase();
        this.setState(() => {
            return {searchField};
        });
    };

    render() {
        console.log('render from AppJS')
        const {monsters, searchField} =this.state;
        const {onSearchChange} = this;
        //this is filter - filtering the filteredMonsters.
        const filteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });

        return (
            <div className='App'>
                <input
                    className='search-box'
                    type='search'
                    placeholder='search monsters'
                    onChange={onSearchChange}
                />
                <CardList monsters={filteredMonsters}/>
            </div>
        )
    }
}

export default App;
