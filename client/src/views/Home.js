import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import LaunchItem from '../components/LaunchItem';
import HistoryItem from '../components/HistoryItem';
import Loading from '../components/Loading';
import Error from '../components/Error';
import MissionLegends from '../components/MissionLegends';
import DateDislacimer from '../components/DateDisclaimer';

const HOME_QUERY = gql`
fragment launch on Launch{
    flight_number
    mission_name
    launch_date_utc
    launch_success
    upcoming
    rocket{
      rocket_name
      rocket_id
    }
    links{
      article_link
    }
}

query HomeQuery{
  info{
    summary
  }
  history_latest{
    title
    event_date_utc
    details
    links{
      article
      wikipedia
    }
  }
  launch_latest{
    ...launch
  }
  launch_next{
    ...launch
  }
}
`

const Home = () => {
  return (
    <Query query={HOME_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />
        if (error) return <Error />

        if (data.info){
        return (
          <Fragment>
            <div className="jumbotron bg-dark text-white text-center">
              <img src="https://www.spacex.com/sites/all/themes/spacex2012/logo.png" alt="SpaceX Logo" className="img-fluid mb-3" />
              <p className="lead">
                {data.info.summary}
              </p>
            </div>
            <HistoryItem
              history={data.history_latest}
            />
            <div className="row mb-3">
              <div className="col-sm-12 col-md-6">
                <h3 className="ml-1">Latest Launch</h3>
                <LaunchItem
                  launch={data.launch_latest}
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <h3 className="ml-1">Upcoming Launch</h3>
                <LaunchItem
                  launch={data.launch_next}
                />
              </div>
              <div className="col-sm-12">
                <MissionLegends />
              </div>
            </div>
            <DateDislacimer />
          </Fragment>
        )
      } else return <Error/>
      }}
    </Query>
  );
}

export default Home;