// CustomDataTable.js
import React from 'react'
import { Box, Grid } from '@mui/material' // Adjust imports based on your setup
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import DatatableLoader from './DatatableLoader' // Adjust this import if necessary
import Skeleton from '@mui/material/Skeleton' // Material-UI Skeleton or your own loading component
import { MultiSelect } from 'primereact/multiselect'
import FontDetails from '../Fonts/FontDetails'

const CustomDataTable = ({ loading, data, filters, columns, setFilters }) => {
  const headerStyle = { padding: '3px 6px', fontSize: FontDetails.typographySize - 2, height: '9px' }

  const rowStyle = { padding: '5px 4px', fontSize: FontDetails.typographySize - 2, height: '4vh !important' }

  const emptyMessage = (
    <div
      style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', paddingLeft: '35vw', minHeight: '60vh' }}
    >
      <div className='w-[100%] text-center font-bold'>
        <img src='/images/datagrid/nodata.gif' alt='No Data Available' style={{ width: '10rem', height: '10rem' }} />
        <div style={{ textAlign: 'center' }} className='w-[100%] text-center font-bold'>
          No Data Available
        </div>
      </div>
    </div>
  )

  const uniqueValues = key => {
    return Array.from(new Set(data?.map(item => item[key]))).map(val => ({
      label: val,
      value: val
    }))
  }

  const onFilterChange = (e, field) => {
    const value = e.value
    let _filters = { ...filters }
    _filters[field].value = value
    setFilters(_filters)
  }

  const multiSelectFilterTemplate = (options, field, headerName) => {
    return (
      <MultiSelect
        value={options.value}
        options={uniqueValues(field)}
        onChange={e => onFilterChange(e, field)}
        placeholder={'Select ' + headerName}
        className='custom-multiselect custom-scrollbar'
        style={{ minWidth: '12rem' }}
        filter
        maxSelectedLabels={1}
      />
    )
  }

  return (
    <Box>
      {loading && <DatatableLoader />}
      <DataTable
        size='small'
        value={data ?? []}
        rows={10}
        filters={filters}
        filterDisplay='row'
        emptyMessage={loading ? <Skeleton /> : emptyMessage}
        scrollable={true}
        scrollHeight='1rem'
      >
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            style={{ minWidth: col.width || 'auto' }}
            filter
            showFilterMenu={false}
            filterElement={options => multiSelectFilterTemplate(options, col.field, col.header)}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading ? <Skeleton /> : null} // Show skeleton while loading
          />
        ))}
      </DataTable>
    </Box>
  )
}

export default CustomDataTable
