import React from 'react';

const Error = () => {
    return ( 
        <div className="text-center mt-5">
            <div className="h2">ERROR :(</div>
            <br/>
            <h6>An error has occured while trying to fetch from the GraphQL Server.</h6>
        </div>
     );
}
 
export default Error;