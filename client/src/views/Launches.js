import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import LaunchItem from '../components/LaunchItem';
import Loading from '../components/Loading';
import Error from '../components/Error';
import MissionLegends from '../components/MissionLegends';
import DateDisclaimer from '../components/DateDisclaimer';
import LaunchesPerYear from '../components/LaunchesPerYear';

const LAUNCH_QUERY = gql`
query LaunchesQuery{
  launches{
    flight_number
    mission_name
    launch_year
    launch_date_utc
    launch_success
    upcoming
    rocket{
      rocket_name
    }
    links{
      article_link
    }
  }
}
`

class Launches extends Component {

  componentDidMount(){
    document.title = 'All Launches | SpaceX API View';
  }

  render() { 
    return ( 
      <Query query={LAUNCH_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />
        if (error) return <Error />

        if (data.launches) {
          return(
          <Fragment>
            <LaunchesPerYear
              launches={data.launches}
            />
            <div className="display-4 mb-3">All Launches</div>
            <MissionLegends />
            {
              data.launches.map((launch, index) =>
                <LaunchItem
                  key={`launch${index}`}
                  launch={launch}
                />
              )
            }
            <DateDisclaimer />
          </Fragment>
        )} else return <Error />
      }}
    </Query>
     );
  }
}
 
export default Launches;