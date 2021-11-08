import { useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { resetPasswordAsync, setError, setResetPass } from '../../features/auth/authSlice';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ffff',
  boxShadow: 24,
  p: 4
};
const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const resetpassword = useSelector((state) => state.auth.resetpassword);

  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error?.errors?.other) {
      setOpenSnack(true);
    }
  }, [error]);

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      console.log(data);
      dispatch(setError());
      dispatch(resetPasswordAsync({ password: data.password }));
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const handleModalClose = () => {
    dispatch(setResetPass());
  };

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>

      <Modal
        open={resetpassword}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Change Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(
                    (touched.password && errors.password) || error?.errors?.password || false
                  )}
                  helperText={(touched.password && errors.password) || error?.errors?.password}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

                {/* <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link> */}
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading === 'loading' || false}
              >
                Submit
              </LoadingButton>
              {error && error?.errors && (
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error?.errors?.other}
                  </Alert>
                </Snackbar>
              )}
            </Form>
          </FormikProvider>
        </Box>
      </Modal>
    </RootStyle>
  );
}
