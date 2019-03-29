import React, { Component, Fragment } from 'react';
import RocketItems from '../components/RocketItems';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../components/Loading';
import Error from '../components/Error';
import RocketLegends from '../components/RocketLegends';
import DateDisclaimer from '../components/DateDisclaimer';

const ROCKETS_QUERY = gql`
query RocketsQuery{
  rockets{
    active
    first_flight
    wikipedia
    rocket_id
    rocket_name
  }
}
`

class Rockets extends Component {

    componentDidMount(){
        document.title = 'All Rockets | SpaceX API View';
    }

    render() {
        return ( 
            <Query query={ROCKETS_QUERY}>
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error />

                return (
                    <Fragment>
                        <div className="display-4 mb-3">All Rockets</div>
                        <RocketLegends />
                        {
                            data.rockets.map((rocket, index) =>
                                <RocketItems rocket={rocket} key={`rocket${index}`} />
                            )}
                        <DateDisclaimer />
                    </Fragment>
                )
            }}
        </Query>);
    }
}

export default Rockets;