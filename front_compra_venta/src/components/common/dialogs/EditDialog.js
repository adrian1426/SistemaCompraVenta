import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditDialog extends Component {
  render() {
    return (
      <div>edit dialog</div>
    );
  }
};

EditDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  fields: PropTypes.any,
  item: PropTypes.any,
  edit: PropTypes.func,
  handleClose: PropTypes.func
};

export default EditDialog;