import React from 'react';
import {Link} from 'gatsby'

const Subscription = () => (
  <div className="subscription">
    <Link to="/feed.xml" className="btn btn-warning" role="button">
      SUBSCRIBE
    </Link>
  </div>
);

export default Subscription;
