import React, { Component, Fragment } from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Error404 from '../components/Error404';
import DateDisclaimer from '../components/DateDisclaimer';
import { formatNumber } from '../utility';

const ROCKET_QUERY = gql`
query RocketQuery($rocket_id: String!){
  rocket(rocket_id: $rocket_id){
    active
    cost_per_launch
    success_rate_pct
    first_flight
    wikipedia
    description
    rocket_name
    height{
      meters
      feet
    }
    diameter{
      meters
      feet
    }
    mass{
      kg
      lb
    }
  }
}
`

const Dimensions = (props) => {
    return (
        <Fragment>
            <tr>
                <th scope="row">Height: </th>
                <td>{props.height} {props.unit}</td>
            </tr>
            <tr>
                <th scope="row">Diameter: </th>
                <td>{props.diameter} {props.unit}</td>
            </tr>
            <tr>
                <th scope="row">Mass: </th>
                <td>{props.mass} {props.unit === 'm' ? 'kg' : 'lbs'}</td>
            </tr>
        </Fragment>
    )
}

class Rocket extends Component {
    state = { imperial: false }

    componentDidMount() {
        document.title = 'SpaceX API View';
    }

    toggleUnits = () => {
        this.setState({ imperial: !this.state.imperial });
    }
    render() {
        return (
            <Query query={ROCKET_QUERY} variables={{ rocket_id: this.props.match.params.rocket_id }}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />
                    if (error) return <Error />

                    if (data.rocket) {
                        const { rocket } = data;

                        document.title = rocket.rocket_name ? `${rocket.rocket_name} | SpaceX API View` : 'SpaceX API View';

                        const rowsRender = [
                            {
                                key: 'First Flight',
                                value: moment(rocket.first_flight).format('Do MMMM YYYY')
                            },

                            {
                                key: 'Status: ',
                                value: rocket.active ? <div><span className="px-3 mr-2 bg-success"></span><span>Active</span></div> :
                                    <div><span className="px-3 mr-2 bg-warning"></span><span>Inactive</span></div>
                            },

                            {
                                key: 'Succes Rate',
                                value: `${rocket.success_rate_pct}%`,
                                toggle: 'm'
                            },
                            {
                                key: 'Cost Per Launch',
                                value: `USD ${formatNumber(rocket.cost_per_launch)}`
                            }
                        ];

                        return (
                            <Fragment>
                                <h2><i className={`fas fa-rocket mr-2 ${rocket.active ? 'text-success' : 'text-warning'}`}></i>
                                    <span>Rocket Name: </span>
                                    <strong>
                                        {rocket.rocket_name}
                                    </strong>
                                </h2>
                                {rocket.description &&
                                    <Fragment>
                                        <hr />
                                        <p>{rocket.description}</p>
                                        <hr />
                                    </Fragment>
                                }
                                <table className="table">
                                    <tbody>
                                        {
                                            rowsRender.map((row, index) =>
                                                <tr key={`row${index}`}>
                                                    <th scope="row">{row.key}</th>
                                                    <td>{row.value}</td>
                                                </tr>
                                            )
                                        }
                                        {!this.state.imperial && <Dimensions
                                            height={formatNumber(rocket.height.meters)}
                                            diameter={formatNumber(rocket.diameter.meters)}
                                            mass={formatNumber(rocket.mass.kg)}
                                            unit='m'
                                        />}
                                        {this.state.imperial && <Dimensions
                                            height={formatNumber(rocket.height.feet)}
                                            diameter={formatNumber(rocket.diameter.feet)}
                                            mass={formatNumber(rocket.mass.lb)}
                                            unit='ft'
                                        />}
                                    </tbody>
                                </table>
                                <div>
                                    <button className="btn btn-secondary mr-3 my-2" onClick={this.toggleUnits}>
                                        {!this.state.imperial ? 'Imperial Units' : 'Metric Units'}
                                    </button>
                                    {rocket.wikipedia && <a href={rocket.wikipedia} target="_blank" rel="noopener noreferrer" className="btn btn-info my-2">Read Wikipedia</a>}
                                </div>
                                <DateDisclaimer />
                            </Fragment>
                        )
                    } 
                    else return <Error404 />
                }}
            </Query>
        );
    }
}


export default Rocket;