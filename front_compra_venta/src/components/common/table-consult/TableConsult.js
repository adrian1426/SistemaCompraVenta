import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { Card, CardContent, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import EditDialog from '../dialogs/EditDialog';
import TablePaginationActions from '../table-pagination-actions/TablePaginationActions';

class TableConsult extends Component {

  state = {
    page: 0,
    rowsByPage: 5,
    editRow: false,
    itemEditSelected: null
  };

  handleEditRow = (row) => {
    this.setState({
      ...this.state,
      editRow: true,
      itemEditSelected: row
    });
  };

  handleCloseEdit = () => {
    this.setState({
      ...this.state,
      editRow: false,
      itemEditSelected: null
    });
  };

  handleChangePage = (event, page) => {
    this.setState({
      ...this.state,
      page
    });
  };

  handleChangeRowsByPage = (event) => {
    this.setState({
      ...this.state,
      page: 0,
      rowsByPage: parseInt(event.target.value)
    });
  };

  render() {
    const { page, rowsByPage, editRow, itemEditSelected } = this.state;
    const { data, header, ids, confirmTitle, confirmMessage, handleRemove, editTitle, handleOnEdit } = this.props;
    const fields = this.props.propertiesToEdit;

    const inicioPage = page * rowsByPage;
    const finPage = inicioPage + rowsByPage;

    if (data && data.length !== 0) {
      return (
        <div>
          <Paper>
            <Table>

              <TableHead>
                <TableRow>
                  {header.map((headerTitle, i) => (
                    <TableCell key={i}>{headerTitle}</TableCell>
                  ))}

                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.slice(inicioPage, finPage).map((row, i) => (
                  <TableRow key={i}>

                    {ids.map((keyName, i2) => (
                      <TableCell key={i2}>
                        {row[keyName]}
                      </TableCell>
                    ))}

                    <TableCell align='center'>
                      <div>
                        <IconButton onClick={() => this.handleEditRow(row)}>
                          <EditIcon />
                        </IconButton>

                        <ConfirmDialog
                          confirmTitle={confirmTitle}
                          confirmMessage={confirmMessage}
                          onConfirm={() => handleRemove(row._id)}
                        />
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsByPage}
                    labelRowsPerPage='Filas por página'
                    page={parseInt(page)}
                    SelectProps={{
                      native: true
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsByPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>

            </Table>
          </Paper>

          <EditDialog
            title={editTitle}
            open={editRow}
            fields={fields}
            item={itemEditSelected}
            edit={handleOnEdit}
            handleClose={this.handleCloseEdit}
          />
        </div>
      );
    } else {
      return (
        <Card>
          <CardContent style={{ textAlign: 'center' }}>
            Sin registros
          </CardContent>
        </Card>
      );
    }

  }
};

export default TableConsult;
