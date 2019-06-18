import React from 'react';
import Display from './Display/Display';
import Slogans from './Slogans/Slogans';
import LogoDisplay from './LogoDisplay/LogoDisplay';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={classes.Header}>
        <div className={classes.HeaderTop}>
          <Container fluid>
            <Row>
              <Col lg={3}>
                <Slogans />
              </Col>
              <Col lg={9} />
            </Row>
            <Display />
          </Container>
          <LogoDisplay />
        </div>
        <div className={classes.HeaderBtm} />
      </header>
    );
  }
}

export default Header;
