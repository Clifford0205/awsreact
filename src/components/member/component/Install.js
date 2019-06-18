import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import InstallModal from './InstallModal';
import LoginModal from './LoginModal';

class Install extends React.Component {
  constructor() {
    super();
    this.state = {
      showModalIns: false,
      showModalLogin: false,
    };
  }

  // 開啟登入視窗
  handleAddModalShowLog = () => {
    this.setState({
      showModalLogin: true,
    });
  };

  // 關閉登入視窗
  handleModalCloseLogin = () => {
    this.setState({ showModalLogin: false });
  };

  // 開啟註冊視窗
  handleAddModalShowIns = () => {
    this.setState({
      showModalIns: true,
    });
  };

  // 關閉註冊視窗
  handleModalCloseIns = () => {
    this.setState({ showModalIns: false });
  };

  render() {
    return (
      <>
        <LoginModal
          show={this.state.showModalLogin}
          close={this.handleModalCloseLogin}
        />
        <InstallModal
          show={this.state.showModalIns}
          close={this.handleModalCloseIns}
        />
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="ml-auto">
              <Button
                variant="outline-success ml-auto mr-5"
                onClick={this.handleAddModalShowLog}
              >
                登入
              </Button>
              <Button
                variant="outline-success ml-auto"
                onClick={this.handleAddModalShowIns}
              >
                註冊
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Install;
