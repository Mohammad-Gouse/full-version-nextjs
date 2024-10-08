// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/auth/FooterIllustrationsV2'
import { Toast } from 'primereact/toast'
import { Autocomplete, Card, CardContent, Grid } from '@mui/material'
import awsConfig from 'src/configs/awsConfig'
import axios from 'axios'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  userId: yup.string().required('user id is required'),
  password: yup.string().required('password  is required').min(5),
  loginType: yup.object().nullable().required('login type is required')
})

const defaultValues = {
  password: '',
  userId: '',
  loginType: null
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const toast = useRef(null)

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const [loginTypeOptions, setLoginTypeOptions] = useState()
  const onSubmit = data => {
    const { userId, password, loginType } = data
    auth.login({ userId, password, loginType, rememberMe: false })
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'
  useEffect(() => {
    if (auth.failureMessage) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: auth.failureMessage,
        life: 3000
      })
      auth.setFailureMessage(null)
    }
  }, [auth.failureMessage])
  useEffect(() => {
    axios.post(`${awsConfig.baseUrl}/auth/login-type`).then(async response => {
      if (response?.data?.data?.length > 0) {
        const dataArray = response?.data?.data?.map(item => {
          return {
            code: item?.loginvalue,
            branchCode: item?.LoginType
          }
        })
        setLoginTypeOptions(dataArray)
      }
    })
  }, [])
  return (
    <Box className='content-center'>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.paper'
        }}
      >
        <BoxWrapper>
          <Card elevation={3} sx={{ minWidth: 300, maxWidth: 400, p: 2, px: 10 }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                <Box>
                  <img
                    src='/images/logos/logo_nb.png'
                    alt='Company Logo'
                    style={{
                      width: '200px',
                      height: '40px'
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant='body' color='secondary' sx={{ fontWeight: 'bold', fontSize: '12px' }}>
                    EMPLOYEE LOGIN
                  </Typography>
                </Box>
              </Box>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Grid contaner>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='userId'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            autoFocus
                            label='User Id'
                            value={value}
                            size='small'
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.userId)}
                            placeholder='admin'
                          />
                        )}
                      />
                      {errors?.userId && (
                        <FormHelperText sx={{ color: 'error.main', ml: '7px !important' }}>
                          {errors?.userId?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl size='small' fullWidth sx={{ mb: 6 }}>
                      <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors?.password)}>
                        Password
                      </InputLabel>
                      <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <OutlinedInput
                            value={value}
                            onBlur={onBlur}
                            label='Password'
                            onChange={onChange}
                            size='small'
                            id='auth-login-v2-password'
                            error={Boolean(errors.password)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        )}
                      />
                      {errors?.password && (
                        <FormHelperText sx={{ color: 'error.main', ml: '7px !important' }} id=''>
                          {errors?.password.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='loginType'
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id='loginType'
                            options={loginTypeOptions}
                            // loading={loadingIssuingBankName}
                            size='small'
                            fullWidth
                            getOptionLabel={option => option?.branchCode}
                            // isOptionEqualToValue={(option, value) => option === value}
                            onChange={(_, data) => {
                              field.onChange(data)
                            }}
                            value={field.value || null}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label='Login Type'
                                error={!!errors?.loginType}
                                size='small'
                                // InputProps={{
                                //   ...params.InputProps,
                                //   style: { fontSize: '10px' }
                                // }}
                                InputLabelProps={{
                                  style: {}
                                }}
                              />
                            )}
                            ListboxProps={{
                              sx: { fontSize: '10px', whiteSpace: 'nowrap', minWidth: '100px', width: 'auto' }
                            }}
                            sx={{ fontSize: '10px' }}
                          />
                        )}
                      />
                      {errors?.loginType && (
                        <FormHelperText sx={{ color: 'error.main', ml: '7px !important' }}>
                          {errors?.loginType?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <FormControlLabel
                    label='Remember Me'
                    control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                  />
                  <Typography
                    variant='body2'
                    component={Link}
                    href='/forgot-password'
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </BoxWrapper>
      </Box>
      {/* </RightWrapper> */}
      <Toast ref={toast} position='bottom-center' className='small-toast' />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
