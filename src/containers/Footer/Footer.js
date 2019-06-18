import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";

const footer = () => {
  return (
    <Container fluid className="footers">
      <Row className="m-0">
        <Col lg={4} className="d-flex footer">
          <div className="left">友站連結</div>
          <div className="right">
            <ul>
              <li>TREK</li>
              <li>MERIDA</li>
              <li>KHS</li>
              <li>GIANT</li>
              <li>Colnago</li>
            </ul>
          </div>
        </Col>
        <Col lg={4} className="d-flex footer">
        <div className="left">會員服務</div>
          <div className="right">
            <ul>
              <li>聯絡我們</li>
              <li>隱私權政策</li>
              <li>服務條款</li>
              <li>加入會員</li>
              <li>常見問題</li>
            </ul>
          </div>
        </Col>
        <Col lg={4} className="d-flex footer">
          <div className="left">營業資訊</div>
          <div className="right">
            <ul>
              <li>服務專線:0800-000-123</li>
              <li>服務時間:周一~五 8:00~19:00</li>
              <li>週六~日 09:00~18:00</li>
              <li>地址: 台灣115 台北市南港區</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default footer;