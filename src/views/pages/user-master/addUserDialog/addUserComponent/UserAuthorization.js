import { Box, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import CustomTooltip from 'src/views/pages/components/CustomTooltip'

const UserAuthorization = ({ open, roleList, addUserForm, attributeList, setAttributeList }) => {
  const theme = useTheme()
  const {
    formState: { errors },
    getValues,
    setValue,
    watch,
    control
  } = addUserForm

  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => {
    if (!open) {
      setExpandedRow(null)
    }
  }, [open])

  const togglePermissions = async row => {
    setExpandedRow(expandedRow === row.value ? null : row.value)
  }

  const selectPermission = (permission, event) => {
    const newValue = event.target?.checked
    setAttributeList(prevList =>
      prevList.map(reso => {
        let permissionList = []
        permissionList = reso.permissions?.map(perm =>
          perm.id === permission.id ? { ...perm, isAllowed: newValue } : perm
        )

        return {
          ...reso,
          permissions: permissionList,
          select_all:
            reso?.label == permission?.attribute_name ? permissionList?.every(per => per?.isAllowed) : reso?.select_all
        }
      })
    )
  }

  const selectAllPermissions = (event, resource) => {
    const newValue = event?.target?.checked
    setAttributeList(prevList =>
      prevList.map(reso =>
        reso.label == resource
          ? {
              ...reso,
              select_all: newValue,
              permissions: reso.permissions?.map(perm => ({
                ...perm,
                disabled: false,
                isAllowed: newValue
              }))
            }
          : reso
      )
    )
  }

  return (
    <div>
      <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'common.black' }}>
        Authorization
      </Typography>
      <Box sx={{ m: 5 }} />
      <div className='mt-5'>
        {attributeList.map(resource => (
          <React.Fragment key={resource.value}>
            <div className='flex gap-1'>
              {expandedRow === resource.value ? (
                <div onClick={() => togglePermissions(resource)} className='cursor-pointer mt-[1px]'>
                  <Icon icon='mdi:minus-box-outline' height='18' width='18' color={theme.palette.primary.light} />
                </div>
              ) : (
                <div onClick={() => togglePermissions(resource)} className='cursor-pointer mt-[1px]'>
                  <Icon icon='mdi:plus-box-outline' height='18' width='18' color={theme.palette.primary.light} />
                </div>
              )}
              <div className='flex justify-between w-full'>
                <div className='font-bold'>{resource?.label}</div>
                {expandedRow === resource.value && (
                  <div>
                    <input
                      className='cursor-pointer'
                      type='checkbox'
                      onChange={e => selectAllPermissions(e, resource?.label)}
                      checked={resource?.select_all}
                      readOnly
                    />
                    Select All
                  </div>
                )}
              </div>
            </div>
            <div className={`expanded-row-container ${expandedRow === resource.value ? 'expanded' : 'collapsed'}`}>
              <div style={{ gridColumn: 'span 2', width: '100%' }} className='expanded-row'>
                <div className='p-1'>
                  <div className=''>
                    <Grid container spacing={2}>
                      {resource?.permissions &&
                        resource?.permissions?.map((permission, index) => (
                          <Grid item md={2}>
                            <div key={index} className='flex gap-1 items-center'>
                              <input
                                className='cursor-pointer'
                                type='checkbox'
                                onChange={e => selectPermission(permission, e)}
                                checked={permission.isAllowed}
                                disabled={permission?.disabled}
                                // readOnly
                              />
                              <div className='truncate text-[12px]'>
                                <CustomTooltip text={permission?.source_name}>{permission.source_name}</CustomTooltip>
                              </div>
                            </div>
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default UserAuthorization
