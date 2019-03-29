import React, { Fragment } from 'react';
import moment from 'moment';

const HistoryItem = ({ history: { title, event_date_utc, details, links: {article, wikipedia} } }) => {
    return (
        <Fragment>
            <h3 className="ml-1">Latest Historical Event</h3>
            <div className="card mb-3">
                <div className="card-body">
                    <p className="card-title display-4">{title}</p>
                    <h6><i className="far fa-clock mr-2"></i>{moment(event_date_utc).format('Do MMMM YYYY')}</h6>
                    <p style={{ fontSize: '18px' }}>{details}</p>
                    {article ? <a href={article} target="_blank" rel="noopener noreferrer" className="btn btn-info mr-3 my-2">Read Article</a> : null}
                    {wikipedia ? <a href={wikipedia} target="_blank" rel="noopener noreferrer" className="btn btn-info mr-3 my-2">Read Wikipedia</a> : null}
                </div>
            </div>
        </Fragment>
    );
}

export default HistoryItem;