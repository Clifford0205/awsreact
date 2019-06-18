import React from 'react';
// import { data } from '../data/data';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
  Nav,
} from 'react-bootstrap';
// import PathNow from '../component/PathNow';

class DetailNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // m_photo: '',
      // m_name: '',
    };
  }

  // async componentDidMount() {
  //   try {
  //     let id = this.props.match.params.id;
  //     console.log(id);
  //     const response = await fetch(`http://localhost:5555/member/${id}`, {
  //       method: 'GET',
  //       headers: new Headers({
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       }),
  //     });

  //     // if (!response.ok) throw new Error(response.statusText);

  //     const jsonObject = await response.json();

  //     console.log(jsonObject);
  //     await this.setState({
  //       myMemberData: jsonObject,
  //       m_photo: jsonObject[0].m_photo,
  //       m_name: jsonObject[0].m_name,
  //       old_password: jsonObject[0].m_password,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //   }
  // }

  // handleFormInputChange = event => {
  //   let value = event.target.value;
  //   const name = event.target.name;

  //   this.setState({ myMemberData: [{ [name]: value }] }, () =>
  //     console.log(this.state)
  //   );

  //   this.setState({ [name]: value });
  //   // this.newMyemberData[name] = value;
  //   // console.log('newMyemberData');
  //   // console.log(this.newMyemberData);
  // };

  render() {
    return (
      <>
        <Nav justify variant="tabs" defaultActiveKey="/home" className="DetailNav">
          <Nav.Item>
            <a
              href="javascipt:;"
              // eventKey="link-1"
              onClick={this.props.handleTitleClick}
              className="nav-link active" 
              id="box1"
            >
              {this.props.title1}
            </a>
          </Nav.Item>
          <Nav.Item style={{display:(this.props.title2)?'block':'none'}}>
            <a
              href="javascipt:;"
              // eventKey="link-2"
              onClick={this.props.handleTitleClick}
              className="nav-link"
              id="box2"
            >
              {this.props.title2}
            </a>
          </Nav.Item>
          <Nav.Item style={{display:(this.props.title3)?'block':'none'}}>
            <a
              href="javascipt:;"
              // eventKey="link-3"
              onClick={this.props.handleTitleClick}
              className="nav-link"
              id="box3"
            >
              {this.props.title3}
            </a>
          </Nav.Item>
          <Nav.Item style={{display:(this.props.title4)?'block':'none'}}>
            <a
              href="javascipt:;"
              // eventKey="link-4"
              onClick={this.props.handleTitleClick}
              className="nav-link"
              id="box4"
            >
              {this.props.title4}
            </a>
          </Nav.Item>
        </Nav>
      </>
    );
  }
}

export default DetailNav;
