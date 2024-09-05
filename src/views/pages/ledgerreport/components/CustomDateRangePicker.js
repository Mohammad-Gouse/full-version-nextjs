import { useState, forwardRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import Icon from 'src/@core/components/icon'
import moment from 'moment'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
 
const CustomDateRangePicker = ({
  popperPlacement,
  field,
  setSelectedValue,
  hoveredItemIndex,
  handleClearValues,
  index,
  maxDate = new Date()
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      tabIndex={0}
      className='relative group rounded-lg bg-gray-100 overflow-hidden mt-[3px] cursor-pointer'
      style={{ maxWidth: '100%', border: '1px solid #ccc' }}
      onClick={onClick}
    >
      {hoveredItemIndex === `filter[${index}].values` && (
        <div
          className='absolute right-0 top-0 z-10'
          onClick={e => {
            e.stopPropagation()
            handleClearValues(`filter[${index}].values`, null)
          }}
        >
          <Icon
            className='cursor-pointer w-3 h-3 absolute right-0 stroke-black top-[7px] mr-2 group-hover:rotate-0 duration-300'
            icon='mdi:close'
            style={{ color: 'black' }}
          />
        </div>
      )}
      <div
        className='flex gap-1 appearance-none relative bg-transparent ring-0 outline-none placeholder-violet-700 text-[12px] font-bold rounded-lg p-1'
        style={{ width: '90%' }}
      >
        <Icon className='w-4 h-4 mt-[1px]' icon='mdi:calendar-today-outline' />
        <div className='text-ellipsis overflow-hidden whitespace-nowrap'>
          {value || <div className='font-[400] text-ellipsis overflow-hidden whitespace-nowrap'>Select Date Range</div>}
        </div>
      </div>
    </div>
  ))
 
  const handleOnChange = dates => {
    const [start, end] = dates
    if (start && end) {
      const newStartDate = moment(start).format('YYYY-MM-DD')
      const newEndDate = moment(end).format('YYYY-MM-DD')
      field.onChange([newStartDate, newEndDate])
      setSelectedValue([newStartDate, newEndDate])
    } else {
      field.onChange(dates) // Keep the partial selection
      setSelectedValue(dates)
    }
  }
 
  return (
    <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
      <DatePicker
        selectsRange
        startDate={field.value?.[0] ? new Date(field.value[0]) : null}
        endDate={field.value?.[1] ? new Date(field.value[1]) : null}
        onChange={handleOnChange}
        customInput={<CustomInput />}
        shouldCloseOnSelect={false}
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={200}
        maxDate={maxDate}
        popperPlacement={popperPlacement}
      />
    </DatePickerWrapper>
  )
}
 
export default CustomDateRangePicker
 
 
 
 
 