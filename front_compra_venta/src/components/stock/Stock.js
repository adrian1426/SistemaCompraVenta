import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Stock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      data: []
    };
  };

  loadData = () => {

  };

  handleChange = (event, activeTab) => {
    this.setState({ activeTab }, this.loadData);
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        <Tabs value={activeTab} onChange={this.handleChange}>
          <Tab label='Categoria'></Tab>
          <Tab label='Articulos'></Tab>
        </Tabs>
        {activeTab === 0 && (<div>Página 1</div>)}
        {activeTab === 1 && (<div>Página 2</div>)}
      </div>
    );
  }
};

export default Stock;