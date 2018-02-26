import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import AppCon from './container/app-container';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import SinglePageInfo from './components/SinglePage';
import { HashRouter, Route } from 'react-router-dom';


let store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <h1 className="container-fluid">Find Whānau Services in your area</h1>
          <Route exact path="/" component={AppCon} />
          <Route path="/place/:category/:name" component={SinglePageInfo} />
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
