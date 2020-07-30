import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConfirmDialog extends Component {
  render() {
    return (
      <div>confirm dialog</div>
    );
  }
};

ConfirmDialog.propTypes = {
  confirmTitle: PropTypes.string,
  confirmMessage: PropTypes.string,
  onConfirm: PropTypes.func
};

export default ConfirmDialog;
