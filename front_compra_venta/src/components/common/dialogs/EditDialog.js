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

  calcularParcial = (arrItems, impuesto = 0) => {
    return this.truncar(this.sumarPrecio(arrItems) * (1 - impuesto), 2);
  };

  sumarPrecio = (arrItems) => {
    return arrItems.reduce((p, c) => {
      return p + ((c.cantidad * c.precio) - (c.descuento ? c.descuento : 0))
    }, 0);
  };

  truncar = (valor, decimales) => {
    return parseFloat((valor += '').substring(0, valor.lastIndexOf('.') + decimales + 1)) || 0;
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
              } else if (fields[key].type === 'Read') {
                if (fields[key].isList) {
                  return (
                    <div>
                      <hr />

                      <FormControl fullWidth>
                        <table>
                          {
                            itemEdit[key].map((item, index) => {
                              if (index > 0) {
                                return null;
                              } else {
                                return (
                                  <tr align='center'>
                                    {Object.keys(item).map(property => {
                                      if (property !== '_id') {
                                        return <th>{property.toUpperCase()}</th>
                                      } else {
                                        return null;
                                      }
                                    })}

                                    <th>Subtotal</th>
                                  </tr>
                                )
                              }
                            })
                          }

                          {itemEdit[key].map(item => {
                            return (
                              <tr align='center'>
                                {Object.keys(item).map(property => {
                                  if (property !== '_id') {
                                    return (
                                      <td>{item[property]}</td>
                                    )
                                  } else {
                                    return null;
                                  }
                                })}

                                <td>{
                                  (item.precio * item.cantidad) - (item.descuento ? item.descuento : 0)
                                } </td>
                              </tr>
                            )
                          })}
                        </table>

                        <div style={{ textAlign: 'right' }}>

                          <div>Total parcial: $
                              <strong>
                              {this.calcularParcial(itemEdit[key], (itemEdit['impuesto'] || 0))}
                            </strong>
                          </div>

                          <div>Total impuesto: $
                              <strong>
                              {itemEdit['impuesto']}
                            </strong>
                          </div>

                          <div>Total neto: $
                              <strong>
                              {itemEdit['total'] = this.sumarPrecio(itemEdit[key])}
                            </strong>
                          </div>
                        </div>
                      </FormControl>
                    </div>
                  )
                } else {
                  return (
                    <FormControl fullWidth>
                      <div>
                        <strong style={{ margin: '3%' }}>{fields[key].as}</strong>
                        <em>{itemEdit[key]}</em>
                      </div>
                    </FormControl>
                  )
                }
              }
              else {
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
                  if (!this.props.detailView) {
                    edit(defaultOrChangedData(form, itemEdit, fields));
                  }
                }
              }
              color='primary'
            >
              {this.props.detailView ? 'Aceptar' : 'Editar'}
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