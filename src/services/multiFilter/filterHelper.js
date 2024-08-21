// filterHelpers.js

// Condition Check Function
export const checkCondition = (rowValue, filterValue, operation) => {
    switch (operation) {
      case 'equals':
        return rowValue === filterValue;
      case 'contains':
        return rowValue.includes(filterValue);
      case 'greaterThan':
        return Number(rowValue) > Number(filterValue);
      case 'lessThan':
        return Number(rowValue) < Number(filterValue);
      default:
        return true;
    }
  };
  
  // Apply Single Filter Function
  export const applyFilter = (row, filter) => {
    if (filter.column && filter.operation && filter.value !== '') {
      const rowValue = String(row[filter.column]).toLowerCase();
      const filterValue = filter.value.toLowerCase();
      return checkCondition(rowValue, filterValue, filter.operation);
    }
    return true; // If filter is incomplete, consider it as passed
  };
  
  // Combine Filters Function
  export const combineFilters = (row, filters) => {
    return filters.reduce((acc, filter, index) => {
      const condition = applyFilter(row, filter);
      if (index === 0) return condition;
      return filter.logicalOperator === 'and' ? acc && condition : acc || condition;
    }, true);
  };
  
  // Filter Rows Function
  export const filterRows = (rows, filters) => {
    return rows.filter(row => combineFilters(row, filters));
  };
  