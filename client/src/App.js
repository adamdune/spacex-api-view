import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './views/Home';
import Launches from './views/Launches';
import Launch from './views/Launch';
import Info from './views/Info';
import Roadster from './views/Roadster';
import Rockets from './views/Rockets';
import Rocket from './views/Rocket';
import About from './views/About';
import Error404 from './components/Error404';
import './css/App.scss';

const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div id="App">
            <Navbar />
            <div className="container py-3" id="Body">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/launches" component={Launches} />
                <Route exact path="/launches/:flight_number" component={Launch} />
                <Route exact path="/info" component={Info} />
                <Route exact path="/roadster" component={Roadster} />
                <Route exact path="/rockets" component={Rockets} />
                <Route exact path="/rockets/:rocket_id" component={Rocket} />
                <Route exact path="/about" component={About} />
                <Route component={Error404} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
