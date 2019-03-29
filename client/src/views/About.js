import React, { Component } from 'react';

class About extends Component {

    componentDidMount(){
        document.title = 'About This Page | SpaceX API View'
    }

    render() {
        return (
            <div>
                <div className="display-4">About This Page</div>
                <blockquote class="ml-4" style={{ borderLeft: '5px solid #e57373' }}>
                    <h6 class="mx-2 py-2">
                        Coded with <span role="img" aria-label="Heart">&#10084;&#65039;</span> & <span role="img" aria-label="Coffee">&#9749;</span> by Adam Ho
            </h6>
                </blockquote>
                <p>This page creates a view around the various SpaceX data exposed through the public <a href="https://github.com/r-spacex/SpaceX-API">r/SpaceX API</a></p>
                <ul className="ml-4">
                    {
                        [
                            <p>
                                This application is a responsive, single page application <small>(the word "application" is used in a generous capacity)</small>.
                            </p>,
                            <p>
                                Styled using <a href="https://getbootstrap.com/" rel="noopener noreferrer">Bootstrap</a> with a <a href="https://bootswatch.com/lux/" rel="noopener noreferrer">Bootswatch Theme</a> with minor customizations. The Bar Chart was made using <a href="https://chartjs.org" rel="noopener noreferrer">Chart.js</a>.
                        </p>,
                            <p>
                                The Client-Side was built using <a href="https://reactjs.org/" rel="noopener noreferrer">React</a> while <a href="https://reacttraining.com/react-router/" rel="noopener noreferrer">React Router</a> was used for front-end routing.
                            </p>,
                            <p>
                                On the Server-Side, <a href="https://expressjs.com/" rel="noopener noreferrer">Express</a> was used to serve the static assets (React) and run the <a href="https://graphql.org/" rel="noopener noreferrer">GraphQL</a> server.
                            </p>,
                            <p>
                                <a href="https://www.apollographql.com/" rel="noopener noreferrer">Apollo</a> was used as a client to interface with the GraphQL server which retrieved data from the r/SpaceX API.
                            </p>
                        ].map((elem, index) => <li key={index}>{elem}</li>)
                    }
                </ul>
                <p className="mt-3 mr-3">Source code can be found on <a href="https://github.com/adamdune/SpaceX-API-View" rel="noopener noreferrer">GitHub<i className="fab fa-github" style={{fontSize: '1.5rem', color: '#aa00ff'}}></i></a>.</p>
            </div>
        );
    }
}

export default About;