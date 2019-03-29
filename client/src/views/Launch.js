import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Error404 from '../components/Error404';
import DateDisclaimer from '../components/DateDisclaimer';

const LAUNCH_QUERY = gql`
query LaunchQuery($flight_number: Int!){
  launch(flight_number: $flight_number){
    mission_name
    launch_date_utc
    launch_success
    details
    upcoming
    rocket{
      rocket_id
      rocket_name
      rocket_type
    }
    links{
      article_link
      flickr_images
    }
    launch_site{
      site_name_long
    }
  }
}
`

class Launch extends Component {
    
    componentDidMount(){
        document.title = 'SpaceX API View';
    }

    render() {
        const flight_number = parseInt(this.props.match.params.flight_number);

        return (
            <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />
                    if (error) return <Error />


                    if (data.launch) {
                        const { launch } = data;
                        
                        document.title = launch.mission_name ? `${launch.mission_name} | SpaceX API View` : 'SpaceX API View';

                        const rowsRender = [
                            {
                                key: 'Launch Date',
                                value: moment(launch.launch_date_utc).format('Do MMMM YYYY, h:MM a')
                            },
                            {
                                key: 'Launch Status',
                                value: launch.upcoming ? <div><span className="px-3 mr-2 bg-warning"></span><span>Upcoming</span></div> : launch.launch_success ? <div><span className="px-3 mr-2 bg-success"></span><span>Success</span></div> :
                                    <div><span className="px-3 mr-2 bg-danger"></span><span>Failure</span></div>
                            },
                            {
                                key: 'Details: ',
                                value: launch.details
                            },
                            {
                                key: 'Rocket Name: ',
                                value: launch.rocket.rocket_name
                            },
                            {
                                key: 'Rocket Type: ',
                                value: launch.rocket.rocket_type
                            },
                            {
                                key: 'Launch Site: ',
                                value: launch.launch_site.site_name_long
                            }
                        ]
                        return (
                            <Fragment>
                                <h2><i className={`fas fa-bullseye mr-2 ${launch.upcoming ? "text-warning" : launch.launch_success ? "text-success" : "text-danger"}`}></i><span>Mission Name: </span>
                                    <strong>
                                        {launch.mission_name}
                                    </strong>
                                </h2>
                                {
                                    launch.links.flickr_images.length ?
                                        <div className="bg-dark py-2 border">
                                            <img src={launch.links.flickr_images[0]} alt="Launch of the Spacecraft during the mission" className="img-fluid mx-auto d-block rounded" style={{ maxHeight: '70vh' }} />
                                        </div>
                                        :
                                        null
                                }
                                <table className="table">
                                    <tbody>
                                        {
                                            rowsRender.map((row, index) => {
                                                if (row.value) {
                                                    return (
                                                        <tr key={`row${index}`}>
                                                            <th scope="row">{row.key}</th>
                                                            <td>{row.value}</td>
                                                        </tr>)

                                                } else return null;
                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                                {
                                    launch.links.article_link &&
                                    <div>
                                        <a href={launch.links.article_link} target="_blank" rel="noopener noreferrer" className="btn btn-info mb-2">Read Article</a>
                                    </div>
                                }
                                <DateDisclaimer />
                            </Fragment>
                        )
                    }
                    else return <Error404/>
                }}
            </Query>
        );
    }
}

export default Launch;