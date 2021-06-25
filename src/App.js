import './App.css';
import Form from './components/Form'
import Board from './components/Board'
import Home from './components/Home'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

function App() {
    
    return (
        <div className="App">
          <header className="App-header">
	    <Form />
          </header>
        </div>
    );
}

export default App;
