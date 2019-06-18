import React from 'react';
import classes from './Logo.module.css';
import { Link, withRouter } from 'react-router-dom';

class Logo extends React.Component {
  render() {
    return (
      <div className={classes.LogoText}>
        <Link to="/" onClick={window.scrollTo(0, 0)}>
          <div className={classes.Logologo} />
          <div className={classes.Logo}>
            <div className={classes.Text}>
              <div>THE</div>
              <div>WHEEL</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(Logo);
