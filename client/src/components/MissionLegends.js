import React, { Fragment } from 'react';

const MissionLegends = () => {
    return (
        <Fragment>
            <div className="ml-1">
            <h6>Mission Legends:</h6>
            <p>
                <span className="px-3 mr-2 bg-success"></span>
                <span className="mr-2">Successful Launch</span>
                <span className="px-3 mr-2 bg-warning"></span>
                <span className="mr-2">Upcoming Launch</span>
                <span className="px-3 mr-2 bg-danger"></span>
                <span className="mr-2">Failed Launch</span>
            </p>
            </div>
        </Fragment>
    );
}

export default MissionLegends;