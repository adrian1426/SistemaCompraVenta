import React, { Component } from 'react';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

class TablePaginatioActions extends Component {

  hadnleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    const pageBack = this.props.page - 1;
    this.props.onChangePage(event, pageBack);
  };

  handleNextButtonClick = event => {
    const pageNext = this.props.page + 1;
    this.props.onChangePage(event, pageNext);
  };

  handleLastPageButtonClick = event => {
    const pageLast = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage));
    this.props.onChangePage(event, pageLast);
  };

  render() {

    const { count, page, rowsPerPage } = this.props;
    const numeroMaximo = Math.ceil(count / rowsPerPage) - 1;

    return (
      <div style={{ flexShrink: 0 }}>
        <IconButton
          onClick={this.hadnleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='First page'
        >
          <FirstPage />
        </IconButton>

        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label='Previous page'
        >
          <KeyboardArrowLeft />
        </IconButton>

        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= numeroMaximo}
          aria-label='Next page'
        >
          <KeyboardArrowRight />
        </IconButton>

        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= numeroMaximo}
          aria-label='Last page'
        >
          <LastPage />
        </IconButton>
      </div>
    );
  }
};

export default TablePaginatioActions;
