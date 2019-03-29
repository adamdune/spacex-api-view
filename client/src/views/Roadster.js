import React, { Component, Fragment } from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {formatNumber} from '../utility';
import Loading from '../components/Loading';
import Error from '../components/Error';
import DateDisclaimer from '../components/DateDisclaimer';

const ROADSTER_QUERY = gql`
query RoadsterQuery{
  roadster{
    name
    launch_date_utc
    speed_kph
    speed_mph
    earth_distance_km
    earth_distance_mi
    mars_distance_km
    mars_distance_mi
    wikipedia
    details
  }
}
`
const Stats = ({ earth_distance, mars_distance, speed, unit }) => {
    return (
        <Fragment>
            <li className="list-group-item">
                <p><i className="fas fa-globe-americas"></i> Distance From Earth</p>
                <h5>{earth_distance} {unit}</h5>
            </li>
            <li className="list-group-item">
                <p><i className="fas fa-user-astronaut"></i> Distance From Mars</p>
                <h5>{mars_distance} {unit}</h5>
            </li>
            <li className="list-group-item">
                <p><i className="fas fa-tachometer-alt"></i> Speed</p>
                <h5>{speed} {unit}/h</h5>
            </li>
        </Fragment>
    );
}

class Roadster extends Component {
    state = { imperial: false }

    componentDidMount(){
        document.title = 'Roadster | SpaceX API View';
    }

    handleToggleUnits = () => {
        const imperial = !this.state.imperial;
        this.setState({imperial});
    }
    render() {
        return (
            <Query query={ROADSTER_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading/>
                    if (error) return <Error/>

                    if (data.roadster) {
                        const {
                            name,
                            launch_date_utc,
                            speed_kph,
                            speed_mph,
                            earth_distance_km,
                            earth_distance_mi,
                            mars_distance_km,
                            mars_distance_mi,
                            wikipedia,
                            details
                        } = data.roadster;

                        return (
                            <Fragment>
                                <div className="jumbotron text-center bg-dark text-white pb-3">
                                    <div className="display-4">{name}</div>
                                    <p className="lead mb-3">
                                        {details}
                                    </p>
                                    <div className="row rounded mb-3" style={{ backgroundColor: '#000' }}>
                                        <div className="col-sm-12 offset-sm-0 col-md-8 offset-md-2">
                                            <img src="https://farm5.staticflickr.com/4745/40110304192_6e3e9a7a1b_c.jpg" alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                    <h3 className="text-light">Stats</h3>
                                    <div className="row mb-3">
                                        <div className="col-sm-12 offset-sm-0 col-md-8 offset-md-2">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <h6><i className="far fa-clock"></i> Launch Date</h6>
                                                    <h5>{moment(launch_date_utc).format('Do MMMM YYYY, h:MM a')}</h5>
                                                </li>
                                                {!this.state.imperial && <Stats 
                                                    speed={formatNumber(speed_kph)}
                                                    earth_distance={formatNumber(earth_distance_km)}
                                                    mars_distance={formatNumber(mars_distance_km)}
                                                    unit='km'
                                                />}
                                                {this.state.imperial && <Stats 
                                                    speed={formatNumber(speed_mph)}
                                                    earth_distance={formatNumber(earth_distance_mi)}
                                                    mars_distance={formatNumber(mars_distance_mi)}
                                                    unit='mi'
                                                />}
                                            </ul>
                                            <button className="btn my-2 btn-secondary"
                                                onClick={this.handleToggleUnits}
                                            >{!this.state.imperial ? 'Imperial' : 'Metric'} Units</button>
                                        </div>
                                    </div>
                                    <div className="row rounded mb-3" style={{ backgroundColor: '#000' }}>
                                        <div className="col-sm-12 offset-sm-0 col-md-8 offset-md-2">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Animation_of_SpaceX_Roadster_trajectory.gif" alt="" className="img-fluid" />
                                        </div>
                                        <div className="col-sm-12">
                                            <p>Animation of SpaceX Roadster's trajectory</p>
                                            <small>Legends</small>
                                            <p>
                                                <span className="px-3 mr-2" style={{ backgroundColor: 'Magenta' }}></span>
                                                <span className="mr-2">SpaceX Roadster</span>
                                                <span className="px-3 mr-2" style={{ backgroundColor: 'Yellow' }}></span>
                                                <span className="mr-2">Sun</span>
                                                <span className="px-3 mr-2" style={{ backgroundColor: 'Cyan' }}></span>
                                                <span className="mr-2">Mercury</span>
                                                <span className="px-3 mr-2" style={{ backgroundColor: 'Gold' }}></span>
                                                <span className="mr-2">Venus</span>
                                                <span className="px-3 mr-2" style={{ backgroundColor: 'RoyalBlue' }}></span>
                                                <span className="mr-2">Earth</span>
                                                <span className="px-3 mr-2" style={{ backgroundColor: 'OrangeRed' }}></span>
                                                <span className="mr-2">Mars</span>
                                            </p>
                                            <p className="lead">
                                                The car, mounted on the rocket's second stage, acquired enough velocity to escape Earth's gravity and enter an elliptical heliocentric orbit crossing the orbit of Mars.
                                        </p>
                                        </div>
                                    </div>
                                    <a href={wikipedia} target="_blank" rel="noopener noreferrer" className="btn btn-info">Read Wikipedia</a>
                                </div>
                                <DateDisclaimer/>
                            </Fragment>
                        )
                    }
                }}
            </Query>
        );
    }
}

export default Roadster;