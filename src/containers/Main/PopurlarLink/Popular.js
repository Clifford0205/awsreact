import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Popular.module.css";
import image from "../../../image/popular.png";

class Popular extends React.Component {
  render() {
    return (
      <section className={classes.Popular}>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div className={classes.Slogan}>
                <p>最熱揪團</p>
                <p>即將滿人，要玩要快</p>
              </div>
            </Col>
            <Col lg={12}>
              <div className={classes.PopularList}>
                <div className={classes.RedBack} />
                <Row>
                  <Col lg={3} sm={6}>
                    <div className={classes.ListCard}>
                      <figure>
                        <img src={image} alt="..." />
                      </figure>
                      <div>
                        <p>淡水-大安</p>
                        <p>2019/06/05 - 10:00AM</p>
                        <p>集合地點:淡水捷運站1號出口</p>
                      </div>
                      <div>
                        <span>公路</span>
                        <a>揪團</a>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <div className={classes.ListCard}>
                      <figure>
                        <img src={image} alt="..." />
                      </figure>
                      <div>
                        <p>淡水-大安</p>
                        <p>2019/06/05 - 10:00AM</p>
                        <p>集合地點:淡水捷運站1號出口</p>
                      </div>
                      <div>
                        <span>公路</span>
                        <a>揪團</a>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <div className={classes.ListCard}>
                      <figure>
                        <img src={image} alt="..." />
                      </figure>
                      <div>
                        <p>淡水-大安</p>
                        <p>2019/06/05 - 10:00AM</p>
                        <p>集合地點:淡水捷運站1號出口</p>
                      </div>
                      <div>
                        <span>公路</span>
                        <a>揪團</a>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <div className={classes.ListCard}>
                      <figure>
                        <img src={image} alt="..." />
                      </figure>
                      <div>
                        <p>淡水-大安</p>
                        <p>2019/06/05 - 10:00AM</p>
                        <p>集合地點:淡水捷運站1號出口</p>
                      </div>
                      <div>
                        <span>公路</span>
                        <a>揪團</a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Popular;
