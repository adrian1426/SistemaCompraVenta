import React, { Component } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

class ConfirmDialog extends Component {

  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {

    const { open } = this.state;
    const { confirmTitle, confirmMessage, onConfirm } = this.props;

    return (
      <span>
        <IconButton onClick={this.handleClickOpen}>
          <DeleteIcon />
        </IconButton>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            {confirmTitle}
          </DialogTitle>

          <DialogContent>
            {confirmMessage}
          </DialogContent>

          <DialogActions>
            <Button color='secondary' onClick={this.handleClose}>Cancelar</Button>

            <Button
              onClick={
                () => {
                  this.handleClose();
                  onConfirm();
                }
              }
              color='primary'
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
};

ConfirmDialog.propTypes = {
  confirmTitle: PropTypes.string,
  confirmMessage: PropTypes.string,
  onConfirm: PropTypes.func
};

export default ConfirmDialog;
