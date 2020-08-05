import React, { Component } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Typography,
  TextField, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

class NewDialog extends Component {

  state = {
    open: false,
    form: {}
  };

  pushItem = (property, id) => {
    if (id === 'default') {
      return;
    }

    const index = this.props.fields[property].options.findIndex(el => el.id === id);
    let form = this.state.form;

    if (!Array.isArray(form[property])) {
      form[property] = [];
    }

    if (form[property].findIndex(el => el._id === id) === -1) {
      form[property].push({
        _id: id,
        articulo: this.props.fields[property].options[index].value,
        precio: 1,
        cantidad: 1
      });
    }

    this.setState({
      ...this.state,
      form
    });
  };

  changeItemContent = (property, index, subproperty, value) => {
    let form = this.state.form;
    form[property][index][subproperty] = value;
    this.setState({
      ...this.state,
      form
    });
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

  calcularParcial = (arrItems, impuesto) => {
    return this.truncar(this.sumarPrecio(arrItems) * (1 - impuesto), 2);
  };

  sumarPrecio = (arrItems) => {
    return arrItems.reduce((p, c) => {
      return p + (c.cantidad * c.precio)
    }, 0);
  };

  truncar = (valor, decimales) => {
    return parseFloat((valor += '').substring(0, valor.lastIndexOf('.') + decimales + 1)) || 0;
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
              } else if (fields[key].type === 'ShopList') {
                return (
                  <div>
                    <hr />

                    Agregar producto
                    <FormControl fullWidth>
                      <Select
                        value='default'
                        id={`select${key}`}
                        onChange={(ev) => this.pushItem(key, ev.target.value)}
                        fullWidth
                      >
                        <MenuItem value='default'>
                          <em>Seleccionar articulo</em>
                        </MenuItem>

                        {fields[key].options.map(item => {
                          return (
                            <MenuItem value={item.id}>{item.value}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    <br />

                    <div style={{ maxHeight: "250px", overflow: "auto" }}>
                      {Array.isArray(form[key]) && form[key].map((el, i) => (
                        <div>
                          <IconButton
                            onClick={() => {
                              form[key].splice(i, 1);
                              this.setState(form[key]);
                            }}
                          >
                            <DeleteIcon color='error' />
                          </IconButton>

                          <TextField
                            aria-readonly
                            margin='dense'
                            id={el.id}
                            key={el.id}
                            label='Articulo'
                            value={el.articulo}
                            type='text'
                            style={{ width: '40%' }}
                            onChange={(ev) => {

                            }}
                          />

                          <TextField
                            aria-readonly
                            margin='dense'
                            id={el.id + 'precio'}
                            key={el.id + 'precio'}
                            label='Precio'
                            defaultValue={el.precio}
                            type='number'
                            style={{ width: '20%' }}
                            onChange={(ev) => {
                              this.changeItemContent(key, i, 'precio', ev.target.value)
                            }}
                          />

                          <TextField
                            aria-readonly
                            margin='dense'
                            id={el.id + 'cantidad'}
                            key={el.id + 'cantidad'}
                            label='Cantidad'
                            defaultValue={el.cantidad}
                            type='number'
                            style={{ width: '15%' }}
                            onChange={(ev) => {
                              this.changeItemContent(key, i, 'cantidad', ev.target.value)
                            }}
                          />

                          <TextField
                            aria-readonly
                            margin='dense'
                            id={el.id + 'subtotal'}
                            key={el.id + 'subtotal'}
                            label='Subtotal'
                            value={el.precio * el.cantidad}
                            type='number'
                            style={{ width: '10%', marginLeft: '5%' }}
                            onChange={(ev) => {

                            }}
                          />

                        </div>
                      ))}

                      {(Array.isArray(form[key]) && form[key].length > 0) &&
                        (
                          <div style={{ textAlign: 'right' }}>

                            <div>Total parcial: $
                              <strong>
                                {this.calcularParcial(form[key], (form['impuesto'] || 0))}
                              </strong>
                            </div>

                            <div>Total impuesto: $
                              <strong>
                                {form['impuesto'] || '0'}
                              </strong>
                            </div>

                            <div>Total neto: $
                              <strong>
                                {form['total'] = this.sumarPrecio(form[key])}
                              </strong>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
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
