import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const RocketItems = ({ rocket: { active, first_flight, wikipedia, rocket_id, rocket_name } }) => {
    return (
        <div className={`card mb-2  ${active ? 'bg-success' : 'bg-warning'}`}>
            <div className="card-body">
                <Link to={`/rockets/${rocket_id}`}>
                    <h4 className="card-title"><i className="fas fa-rocket mr-2"></i><span>Rocket Name: </span>
                        <strong>
                            {rocket_name}
                        </strong>
                    </h4>
                </Link>
                <h6><i className="far fa-clock mr-2"></i>First Flight: {moment(first_flight).format('Do MMMM YYYY')}</h6>
                <Link to={`/rockets/${rocket_id}`} className="btn btn-primary mr-2 my-2">Details</Link>
                {wikipedia && <a href={wikipedia} className="btn btn-info mr-2 my-2">Read Wikipedia</a>}
            </div>
        </div>
    );
}

export default RocketItems;