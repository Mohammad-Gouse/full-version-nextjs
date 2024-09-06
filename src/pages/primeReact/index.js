
import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

import "primereact/resources/themes/lara-light-cyan/theme.css";

// import { CustomerService } from './service/CustomerService';

export default function BasicFilterDemo() {
    const data = [
        {
            id: 1000,
            name: 'James Butt',
            country: {
                name: 'Algeria',
                code: 'dz'
            },
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: {
                name: 'Ioni Bowcher',
                image: 'ionibowcher.png'
            },
            balance: 70663
        },
        {
            id: 1001,
            name: 'Josephine Darakjy',
            country: {
                name: 'Egypt',
                code: 'eg'
            },
            company: 'Chanay, Jeffrey A Esq',
            date: '2019-02-09',
            status: 'negotiation',
            verified: false,
            activity: 10,
            representative: {
                name: 'Amy Elsner',
                image: 'amyelsner.png'
            },
            balance: 82429
        },
        {
            id: 1002,
            name: 'Art Venere',
            country: {
                name: 'Panama',
                code: 'pa'
            },
            company: 'Chemel, James L Cpa',
            date: '2017-05-13',
            status: 'qualified',
            verified: true,
            activity: 5,
            representative: {
                name: 'Asiya Javayant',
                image: 'asiyajavayant.png'
            },
            balance: 28334
        },
        {
            id: 1003,
            name: 'Lenna Paprocki',
            country: {
                name: 'Slovenia',
                code: 'si'
            },
            company: 'Feltz Printing Service',
            date: '2020-09-15',
            status: 'new',
            verified: false,
            activity: 15,
            representative: {
                name: 'Xuxue Feng',
                image: 'xuxuefeng.png'
            },
            balance: 88521
        },
        {
            id: 1004,
            name: 'Donette Foller',
            country: {
                name: 'South Africa',
                code: 'za'
            },
            company: 'Printing Dimensions',
            date: '2016-05-20',
            status: 'negotiation',
            verified: true,
            activity: 8,
            representative: {
                name: 'Asiya Javayant',
                image: 'asiyajavayant.png'
            },
            balance: 93905
        }
    ];

    const brokerData =  [
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 69150,
            "SellValue": 107066,
            "Turnover": 176216,
            "Brokerage": 44.45,
            "TransactionDate": "01/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 0,
            "SellValue": 84146,
            "Turnover": 84146,
            "Brokerage": 84.16,
            "TransactionDate": "02/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 0,
            "SellValue": 3250,
            "Turnover": 3250,
            "Brokerage": 3.25,
            "TransactionDate": "03/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 0,
            "SellValue": 1633,
            "Turnover": 1633,
            "Brokerage": 1.64,
            "TransactionDate": "04/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 0,
            "SellValue": 22482.5,
            "Turnover": 22482.5,
            "Brokerage": 22.48,
            "TransactionDate": "08/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 0,
            "SellValue": 74980,
            "Turnover": 74980,
            "Brokerage": 75,
            "TransactionDate": "10/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 910707.5,
            "SellValue": 706831.82,
            "Turnover": 1617539.32,
            "Brokerage": 322.72,
            "TransactionDate": "11/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 963114.25,
            "SellValue": 960032.41,
            "Turnover": 1923146.66,
            "Brokerage": 314.84,
            "TransactionDate": "12/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 418873.6,
            "SellValue": 499197.5,
            "Turnover": 918071.1,
            "Brokerage": 210.06,
            "TransactionDate": "15/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 1403392.98,
            "SellValue": 1408103.92,
            "Turnover": 2811496.9,
            "Brokerage": 376,
            "TransactionDate": "16/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 2258085,
            "SellValue": 2376462.42,
            "Turnover": 4634547.42,
            "Brokerage": 670.7,
            "TransactionDate": "18/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 1155956.15,
            "SellValue": 990693.13,
            "Turnover": 2146649.28,
            "Brokerage": 500.24,
            "TransactionDate": "19/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 31740,
            "SellValue": 53330,
            "Turnover": 85070,
            "Brokerage": 27.75,
            "TransactionDate": "22/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 493260,
            "SellValue": 442932,
            "Turnover": 936192,
            "Brokerage": 193.84,
            "TransactionDate": "23/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 45042.5,
            "SellValue": 64093.74,
            "Turnover": 109136.24,
            "Brokerage": 90.09,
            "TransactionDate": "24/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 362734.17,
            "SellValue": 330032.35,
            "Turnover": 692766.52,
            "Brokerage": 264.83,
            "TransactionDate": "25/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 316584.4,
            "SellValue": 333255.24,
            "Turnover": 649839.64,
            "Brokerage": 169.84,
            "TransactionDate": "26/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 0,
            "SellValue": 86353,
            "Turnover": 86353,
            "Brokerage": 86.31,
            "TransactionDate": "29/07/2024"
        },
        {
            "ClientCode": "E100002   ",
            "Exchange": "NSE   ",
            "BuyValue": 0,
            "SellValue": 17436,
            "Turnover": 17436,
            "Brokerage": 17.44,
            "TransactionDate": "30/07/2024"
        }
    ]
    
    
    const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [representatives] = useState([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);

    const [SellValues] = useState([{name:123.2, id:1}, {name:23.2, id:2}]);
    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    useEffect(() => {
        setCustomers(data);
        setLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText style={{ minWidth: '12rem', height: '15px', fontSize:'10px' }} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>
        );
    };

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;

        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
                <span>{representative.name}</span>
            </div>
        );
    };

    const SellValueBodyTemplate = (rowData) => {
        const SellValue = rowData.SellValue;

        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
                <span>{SellValue}</span>
            </div>
        );
    };

    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" /> */}
                <span>{option.name}</span>
            </div>
        );
    };

    const SellValueItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" /> */}
                <span>{option.name}</span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag style={{fontSize:'10px', height:'20px'}} value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusItemTemplate = (option) => {
        return <Tag style={{fontSize:'10px', height:'20px'}} value={option} severity={getSeverity(option)} />;
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
    };

    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Any"
                className="custom-multiselect p-multiselect-header"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem', height:'25px', fontSize:'10px' }}
            />
        );
    };

    const SellValueRowFilterTemplate = (options) => {
        console.log(options)
        console.log(options.filterApplyCallback)
        return (
            <MultiSelect
                value={options.value}
                options={SellValues}
                itemTemplate={SellValueItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Sell Value"
                className="custom-multiselect p-multiselect-header"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem', height:'25px', fontSize:'10px' }}
            />
        );
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown  
                value={options.value} 
                options={statuses} 
                onChange={(e) => options.filterApplyCallback(e.value)} 
                itemTemplate={statusItemTemplate} 
                placeholder="Select One" 
                className="custom-dropdown" 
                size="small"
                showClear 
                style={
                    { minWidth: '12rem', height: '25px', fontSize:'10px' }
                } />
        );
    };

    const nameRowFilterTemplate = (options) => {
        return (
            <InputText
                value={options.value} 
                onChange={(e) => options.filterApplyCallback(e.target.value)} 
                placeholder="Search by name"
                style={{ minWidth: '12rem', height: '15px', fontSize:'10px' }}  // Adjust height here
            />
        );
    };


    // const verifiedRowFilterTemplate = (options) => {
    //     return <TriStateCheckbox  value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    // };

    const verifiedRowFilterTemplate = (options) => {
        return (
            <div style={{ transform: 'scale(0.8)', display: 'inline-block' }}>
                <TriStateCheckbox 
                    value={options.value} 
                    onChange={(e) => options.filterApplyCallback(e.value)} 
                />
            </div>
        );
    };
    

    const header = renderHeader();

    const headerStyle = {
        padding: '3px 6px',
        fontSize: '10px',
        height:'10px'
      }
       
      const rowStyle = {
        padding: '0px 4px',
        fontSize: '10px',
        height: '4vh !important',
      }

    return (
        <div className="card">
            {/* <DataTable   size='small' value={customers}  rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header} emptyMessage="No customers found.">
                <Column  className='header-row' bodyStyle={rowStyle} headerStyle={headerStyle} field="name" showFilterMenu={false} header="Name" filter filterElement={nameRowFilterTemplate} filterPlaceholder="Search by name" style={{ minWidth: '12rem', height: '30px', fontSize: '5px' }} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} header="Country" filterField="country.name" showFilterMenu={false} style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterElement={nameRowFilterTemplate} filterPlaceholder="Search by country" />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} header="Agent" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
            </DataTable> */}


<DataTable   size='small' value={brokerData}  rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['ClientCode', 'Exchange', 'SellValue']} header={header} emptyMessage="No customers found.">
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} header="SellValue" filterField="SellValue" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    body={SellValueBodyTemplate} filter filterElement={SellValueRowFilterTemplate} />
            </DataTable>
        </div>
    );
}
        