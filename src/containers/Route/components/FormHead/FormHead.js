import React, { Component } from 'react';
import './FormHead_style.css';

class FormHead extends Component {
    state = {};
    render() {
        return (
            <div className="r_fw_bold r_form-head py-3 px-4">
                {this.props.text}
            </div>
        );
    }
}

export default FormHead;
