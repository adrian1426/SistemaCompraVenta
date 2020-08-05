import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewDialog from '../common/dialogs/NewDialog';
import TableConsult from '../common/table-consult/TableConsult';
import RequestServices from '../../services/Requests';

class Purchases extends Component {

  constructor(props) {
    super(props);

    this.headers = [
      ['Usuario', 'Proveedor', 'Tipo Comprobante', 'Serie Comprobante', 'Numero Comprobante', 'Total', 'Estado', 'Impuesto'],
      ['Nombre', 'Tipo Documento', 'Numero', 'Dirección', 'Email']
    ];

    this.ids = [
      ['usuario', 'persona', 'tipo_comprobante', 'serie_comprobante', 'num_comprobante', 'total', 'estado', 'impuesto'],
      ['nombre', 'tipo_documento', 'num_documento', 'direccion', 'email'],
      ['nombre']
    ];

    this.requestServices = new RequestServices();

    this.state = {
      activeTab: 0,
      data: []
    };
  };

  componentDidMount() {
    this.loadData();
    this.loadInitialData('/persona/listProveedores', 1);
    this.loadInitialData('/articulo/list', 2);
  }

  loadInitialData = async (path, index) => {
    const ids = this.ids[index];

    return await this.requestServices.list(path)
      .then(response => {
        if (response && response.length !== 0) {
          const dt = response;

          dt.map((el, i) => {
            let filterProperties = [];
            filterProperties[i] = {};

            ids.forEach(key => {
              if (el[key]._id) {
                el[key] = '';
              }
              filterProperties[i][key] = el[key];
            })

            return filterProperties;
          })

          let stateData = this.state.data.slice();
          stateData[index] = dt.slice();

          this.setState({
            ...this.state,
            data: stateData
          });
        } else {
          let stateData = this.state.data.slice();
          stateData[index] = [];

          this.setState({
            ...this.state,
            data: stateData
          });
        }
      })
  };

  loadData = async () => {
    const { activeTab } = this.state;
    const ids = this.ids;
    const pathQuery = activeTab === 0 ? 'ingreso/list' : 'persona/listProveedores';
    const path = `/${pathQuery}`;

    return await this.requestServices.list(path)
      .then(response => {

        if (response && response.length !== 0) {
          const dt = response;

          dt.map((el, i) => {
            let filterProperties = [];
            filterProperties[i] = {};

            ids[activeTab].forEach(key => {
              if (el[key]._id) {
                el[key] = el[key].nombre;
              }

              filterProperties[i][key] = el[key];
            })

            return filterProperties;

          })

          console.log('data: ', dt);
          let stateData = this.state.data.slice()
          stateData[activeTab] = dt.slice();

          this.setState({
            ...this.state,
            data: stateData
          });
        } else {
          let stateData = this.state.data.slice()
          stateData[activeTab] = [];

          this.setState({
            ...this.state,
            data: stateData
          });
        }
      });

  };

  handleRegister = (data) => {
    const { activeTab } = this.state;
    const pathQuery = activeTab === 0 ? 'ingreso' : 'persona';
    const path = `/${pathQuery}/add`;

    if (activeTab === 1) {
      data['tipo_persona'] = 'Proveedor';
    } else {
      data['usuario'] = this.requestServices.authService.getProfileDecode()._id;
    }

    this.requestServices.add(path, data)
      .then(response => {
        this.loadData();
      });
  };

  handleOnEdit = (data) => {
    const { activeTab } = this.state;
    const pathQuery = activeTab === 0 ? 'ingreso' : 'persona';
    const path = `/${pathQuery}/update`;

    if (activeTab === 1) {
      data['tipo_persona'] = 'Proveedor';
    }

    this.requestServices.update(path, data)
      .then(response => {
        this.loadData();
      });
  };

  handleSwitchActivate = (id) => {
    const path = `/ingreso/query?id=`;

    this.requestServices.query(`${path}${id}`)
      .then(response => {
        const accion = (response.estado && response.estado === 1) ? 'deactivate' : 'activate';
        const pathActiveDeactivate = `/ingreso/${accion}`;

        this.requestServices.activateDeactivate(pathActiveDeactivate, id)
          .then(response => {
            this.loadData();
          });
      });
  };

  handleChange = (event, activeTab) => {
    this.setState({ activeTab }, this.loadData);
  };

  render() {
    const { activeTab, data } = this.state;
    const header = this.headers[activeTab];
    const ids = this.ids[activeTab];

    return (
      <div>
        <Tabs value={activeTab} onChange={this.handleChange}>
          <Tab label='Ingresos'></Tab>
          <Tab label='Proveedores'></Tab>
        </Tabs>

        {activeTab === 0 && (
          <div>
            <NewDialog
              register={this.handleRegister}
              title='Nueva Ingreso'
              fields={{
                persona: {
                  type: 'Select',
                  options: data[1] ? data[1].map(el => (
                    {
                      id: el._id,
                      value: el.nombre
                    }
                  )) : []
                },
                tipo_comprobante: {
                  type: 'Select',
                  options: [
                    { id: 'Factura', value: 'Factura' },
                    { id: 'Ticket', value: 'Ticket' }
                  ]
                },
                serie_comprobante: { type: 'TextField' },
                num_comprobante: { type: 'TextField' },
                impuesto: { type: 'TextField' },
                detalles: {
                  type: 'ShopList',
                  options: data[2] ? data[2].map(el => (
                    {
                      id: el._id,
                      value: el.nombre
                    }
                  ))
                    : []
                }
              }}
              key='Tab1Ingreso'
            />

            <TableConsult
              key='TableIngreso'
              header={header}
              ids={ids}
              data={data[activeTab]}
              handleOnEdit={null}
              isDetailView={true}
              handleRemove={this.handleSwitchActivate}
              confirmTitle='Anular ingreso'
              confirmMessage='¿Estás seguro de anular este ingreso?'
              propertiesToEdit={{
                persona: { type: 'Read', as: 'Proveedor' },
                tipo_comprobante: { type: 'Read', as: 'Tipo de Comprobante' },
                serie_comprobante: { type: 'Read', as: 'Serie de Comprobante' },
                num_comprobante: { type: 'Read', as: 'Numero de Comprobante' },
                impuesto: { type: 'Read', as: 'Impuesto' },
                detalles: { type: 'Read', as: 'Productos', isList: true }
              }}
              editTitle='Detalle de venta'
            />
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <NewDialog
              register={this.handleRegister}
              title='Nuevo Proveedor'
              fields={{
                nombre: { type: 'TextField' },
                tipo_documento: {
                  type: 'Select',
                  options: [
                    { id: 'DNI', value: 'DNI' },
                    { id: 'RUC', value: 'RUC' },
                    { id: 'CEDULA', value: 'CEDULA' }
                  ]
                },
                num_documento: { type: 'TextField' },
                direccion: { type: 'TextField' },
                email: { type: 'TextField' }
              }}
              key='Tab2Proveedor'
            />

            <TableConsult
              key='TableProveedor'
              header={header}
              ids={ids}
              data={data[activeTab]}
              handleOnEdit={this.handleOnEdit}
              handleRemove={null}
              confirmTitle='Desactivar/Activar Proveedor'
              confirmMessage='¿Estás seguro de Desactivar/Activar este Proveedor?'
              propertiesToEdit={{
                nombre: { type: 'TextField' },
                tipo_documento: {
                  type: 'Select',
                  options: [
                    { id: 'DNI', value: 'DNI' },
                    { id: 'RUC', value: 'RUC' },
                    { id: 'CEDULA', value: 'CEDULA' }
                  ]
                },
                num_documento: { type: 'TextField' },
                direccion: { type: 'TextField' },
                email: { type: 'TextField' }
              }}
              editTitle='Editar Proveedor'
            />
          </div>
        )}
      </div>
    );
  }
};

export default Purchases;