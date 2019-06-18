import React from "react";
import Col from "react-bootstrap/Col";

const popularList = props => {
  let endPoint = props.text.indexOf("</figure>") + 9;
  let figure = props.text.slice(0, endPoint);
  let text = props.text.slice(endPoint);
  return (
    <Col lg={5}>
      <div>
          <div className="Image"
                dangerouslySetInnerHTML={{__html: figure}}>
          </div>    
              
          <div>
            <div>
              <h4>{props.title}</h4>
            </div>
            <article className="text" dangerouslySetInnerHTML={{__html: text}}/>
                  
          </div>
      </div>
    </Col>
  );
}

export default popularList;