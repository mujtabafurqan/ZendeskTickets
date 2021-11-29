import React, { Component } from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicketList from './Pages/TicketList/TicketList';
import TicketDetails from './Pages/TicketDetails/TicketDetails';


export default class App extends Component {

  render() {
    return (
      <>
      <Router>
        <Switch>
          <Route path="/" exact component={TicketList} />
          <Route path="/details" component={TicketDetails} />
        </Switch>
      </Router>
    </>
    );
  }
}
