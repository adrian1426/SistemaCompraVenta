import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
  TextField, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';

class EditDialog extends Component {

  state = {
    form: {}
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

    const { form } = this.state;
    const { title, edit, fields, item: itemEdit, open: openP } = this.props;

    if (!itemEdit) {
      return (
        <div></div>
      )
    }

    return (
      <div>
        <Dialog
          open={openP}
          onClose={this.props.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            {title}
          </DialogTitle>

          <DialogContent>
            {Object.keys(fields).map(key => {

              if (!fields[key].type || fields[key].type === 'TextField') {
                return (
                  <TextField
                    autoFocus margin='dense'
                    id={key}
                    key={key}
                    label={key.toUpperCase()}
                    type='text'
                    defaultValue={itemEdit[key]}
                    onChange={(ev) => this.valueChanges(key, ev.target.value)}
                    fullWidth
                  />
                )
              } else if (fields[key].type === 'Select') {

                const defaultIndex = fields[key].options.findIndex(
                  el => el.value === itemEdit[key]
                );

                return (
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor={`select${key}`}>
                      {key.toUpperCase()}
                    </InputLabel>

                    <Select
                      value={form[key] || fields[key].options[defaultIndex].id}
                      id={`select${key}`}
                      onChange={(ev) => this.valueChanges(key, ev.target.value)}
                      fullWidth
                    >

                      {fields[key].options.map(item => {
                        return (
                          <MenuItem value={item.id}>
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
            <Button color='secondary' onClick={this.props.handleClose}>Cancelar</Button>

            <Button
              onClick={
                () => {
                  this.props.handleClose();
                  edit(
                    defaultOrChangedData(form, itemEdit, fields)
                  );
                }
              }
              color='primary'
            >
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

const defaultOrChangedData = (updated, defaultData, fields) => {
  let itemToSend = updated;

  Object.keys(fields).forEach(key => {
    if (!itemToSend[key]) {
      itemToSend[key] = defaultData[key];
    }
  });

  itemToSend['_id'] = defaultData['_id'];

  return itemToSend;
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