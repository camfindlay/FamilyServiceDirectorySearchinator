import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';
import Info from './components/Info';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route path="/service/:id" component={Info}/>
    </div>
  </BrowserRouter>
), document.getElementById('root'));
