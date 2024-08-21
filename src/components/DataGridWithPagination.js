import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Pagination } from '@mui/material';

const DataGridWithPagination = ({ rows, columns, initialPageSize }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box >
      <DataGrid
        // rows={paginatedRows}
        // columns={columns}
        // pageSize={pageSize}
        // rowsPerPageOptions={[5, 10, 20]}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        style={{height:'450px', overflow: 'scroll'}}

        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
      />
      {/* <Pagination
        count={Math.ceil(rows.length / 5)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      /> */}
    </Box>
  );
};

export default DataGridWithPagination;
