import React from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { showModal, closeModal } from "../../store/modalActions"

class ModalR extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.show !== prevProps.show){
      this.props.show === true
      ?this.setState({show: true})
      :this.setState({show: false});
    }
  }

  handleClose() {
    this.props.dispatch(closeModal());
    document.body.style.overflowY = "auto";
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.bodyText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              取消
            </Button>
            <Button variant="primary" onClick={() => {
              this.handleClose();
              this.props.confirm();
              }}>
             {this.props.buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.modal.show
  }
}

export default connect(mapStateToProps)(ModalR);