import React, { Fragment } from 'react';

const RocketLegends = () => {
    return (
        <Fragment>
            <h6>Rocket Legends:</h6>
            <p>
                <span className="px-3 mr-2 bg-success"></span>
                <span className="mr-2">Active Rocket</span>
                <span className="px-3 mr-2 bg-warning"></span>
                <span className="mr-2">Inactive Rocket</span>
            </p>
        </Fragment>
    );
}

export default RocketLegends;