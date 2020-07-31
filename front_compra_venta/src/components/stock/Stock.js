import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewDialog from '../common/dialogs/NewDialog';
import TableConsult from '../common/table-consult/TableConsult';
import RequestServices from '../../services/Requests';

class Stock extends Component {

  constructor(props) {
    super(props);

    this.headers = [
      ['Nombre', 'Descripcion', 'Estado'],
      ['Codigo', 'Nombre', 'Categoria', 'Precio Venta', 'Stock', 'Descripcion', 'Estado']
    ];

    this.ids = [
      ['nombre', 'descripcion', 'estado'],
      ['codigo', 'nombre', 'categoria', 'precio_venta', 'stock', 'descripcion', 'estado']
    ];

    this.requestServices = new RequestServices();

    this.state = {
      activeTab: 0,
      data: []
    };
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { activeTab } = this.state;
    const ids = this.ids;
    const pathQuery = activeTab === 0 ? 'categoria' : 'articulo';
    const path = `/${pathQuery}/list`;

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
    const pathQuery = activeTab === 0 ? 'categoria' : 'articulo';
    const path = `/${pathQuery}/add`;

    this.requestServices.add(path, data)
      .then(response => {
        this.loadData();
      });
  };

  handleOnEdit = (data) => {
    const { activeTab } = this.state;
    const pathQuery = activeTab === 0 ? 'categoria' : 'articulo';
    const path = `/${pathQuery}/update`;

    this.requestServices.update(path, data)
      .then(response => {
        this.loadData();
      });
  };

  handleSwitchActivate = (id) => {
    const { activeTab } = this.state;
    const pathQuery = activeTab === 0 ? 'categoria' : 'articulo';
    const path = `/${pathQuery}/query?_id=`;

    this.requestServices.query(`${path}${id}`)
      .then(response => {
        const accion = (response.estado && response.estado === 1) ? 'deactivate' : 'activate';
        const pathActiveDeactivate = `/${pathQuery}/${accion}`;

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
          <Tab label='Categoria'></Tab>
          <Tab label='Articulos'></Tab>
        </Tabs>

        {activeTab === 0 && (
          <div>
            <NewDialog
              register={this.handleRegister}
              title='Nueva Categoria'
              fields={{
                nombre: { type: 'TextField' },
                descripcion: { type: 'TextField' }
              }}
              key='Tab1Categoria'
            />

            <TableConsult
              key='TableCategoria'
              header={header}
              ids={ids}
              data={data[activeTab]}
              handleOnEdit={this.handleOnEdit}
              handleRemove={this.handleSwitchActivate}
              confirmTitle='Desactivar/Activar categoria'
              confirmMessage='¿Estás seguro de Desactivar/Activar esta categoria?'
              propertiesToEdit={{
                nombre: { type: 'TextField' },
                descripcion: { type: 'TextField' }
              }}
              editTitle='Editar Categoria'
            />
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <NewDialog
              register={this.handleRegister}
              title='Nueva Articulo'
              fields={{
                nombre: { type: 'TextField' },
                categoria: {
                  type: 'Select',
                  options: data[0].slice().map(el => (
                    {
                      id: el._id,
                      value: el.nombre
                    }
                  ))
                },
                codigo: { type: 'TextField' },
                precio_venta: { type: 'TextField' },
                stock: { type: 'TextField' },
                descripcion: { type: 'TextField' }
              }}
              key='Tab2Articulo'
            />

            <TableConsult
              key='TableArticulo'
              header={header}
              ids={ids}
              data={data[activeTab]}
              handleOnEdit={this.handleOnEdit}
              handleRemove={this.handleSwitchActivate}
              confirmTitle='Desactivar/Activar Articulo'
              confirmMessage='¿Estás seguro de Desactivar/Activar esta Articulo?'
              propertiesToEdit={{
                nombre: { type: 'TextField' },
                categoria: {
                  type: 'Select',
                  options: data[0].slice().map(el => (
                    {
                      id: el._id,
                      value: el.nombre
                    }
                  ))
                },
                codigo: { type: 'TextField' },
                precio_venta: { type: 'TextField' },
                stock: { type: 'TextField' },
                descripcion: { type: 'TextField' }
              }}
              editTitle='Editar Articulo'
            />
          </div>
        )}
      </div>
    );
  }
};

export default Stock;