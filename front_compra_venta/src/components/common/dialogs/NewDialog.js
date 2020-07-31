import React, { Component } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Typography,
  TextField, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

class NewDialog extends Component {

  state = {
    open: false,
    form: {}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  valueChanges = (property, value) => {
    let form = this.state.form;
    form[property] = value;
    this.setState({
      ...this.state,
      form
    });
  };

  render() {

    const { open, form } = this.state;
    const { title, register, fields } = this.props;

    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <AddIcon />
          <Typography>Nuevo</Typography>
        </IconButton>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            {title}
          </DialogTitle>

          <DialogContent>
            {Object.keys(fields).map((key, ikey) => {

              if (!fields[key].type || fields[key].type === 'TextField') {
                return (
                  <TextField
                    autoFocus margin='dense'
                    id={key}
                    key={ikey}
                    label={key.toUpperCase()}
                    type='text'
                    onChange={(ev) => this.valueChanges(key, ev.target.value)}
                    fullWidth
                  />
                )
              } else if (fields[key].type === 'Select') {
                return (
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor={`select${key}`}>
                      {key.toUpperCase()}
                    </InputLabel>

                    <Select
                      value={form[key] || 'default'}
                      id={`select${key}`}
                      onChange={(ev) => this.valueChanges(key, ev.target.value)}
                      fullWidth
                    >
                      <MenuItem value='default'>
                        <em>Seleccionar</em>
                      </MenuItem>

                      {fields[key].options.map(item => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.value}
                          </MenuItem>
                        )
                      })}

                    </Select>
                  </FormControl>
                )
              } else {
                return (
                  <div>no se encontró tipo definidos</div>
                )
              }

            })}
          </DialogContent>

          <DialogActions>
            <Button color='secondary' onClick={this.handleClose}>Cancelar</Button>

            <Button
              onClick={
                () => {
                  this.handleClose();
                  register(form);
                }
              }
              color='primary'
            >
              Registrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default NewDialog;
