import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Boxcon from './container/box-container';
// import ServiceInfo from './components/ServiceInfo';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import SinglePageInfo from './components/SinglePage';
import { BrowserRouter, Route } from 'react-router-dom';


let store = createStore(reducers, applyMiddleware(thunk));

// const Test = () => <h1> hi</h1>
class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Boxcon} />
          <Route path="/place/:category/:name" component={SinglePageInfo} />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
