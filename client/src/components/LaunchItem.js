import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const LaunchItem = ({ launch: { flight_number, mission_name, launch_date_utc, launch_success, upcoming, rocket: { rocket_name, rocket_id }, links: { article_link } } }) => {
    return (
        <div className={`card mb-2 ${upcoming === true ? 'bg-warning' : launch_success ? 'bg-success' : 'bg-danger'}`}>
            <div className="card-body">
                <Link to={`/launches/${flight_number}`}>
                    <h4 className="card-title"><i className="fas fa-bullseye mr-2"></i><span>Mission: </span>
                        <strong>
                            {mission_name}
                        </strong>
                    </h4>
                </Link>
                <h6><i className="far fa-clock mr-2"></i>{moment(launch_date_utc).format('Do MMMM YYYY')}</h6>
                <p><i className="fas fa-rocket mr-2"></i>Rocket Name: <strong><Link to={`rockets/${rocket_id}`}>{rocket_name}</Link></strong></p>
                <Link to={`/launches/${flight_number}`} className="btn btn-primary mr-2">Details</Link>
                {article_link ? <a href={article_link} className="btn btn-info mr-2">Read Article</a> : null}
            </div>
        </div>
    );
}

export default LaunchItem;