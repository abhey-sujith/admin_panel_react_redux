import * as Yup from 'yup';
import { useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// ----------------------------------------------------------------------
import { Roles, RolesArray } from '../../config';
import {
  resetData,
  getMTUserDataAsync,
  createContractAsync
} from '../../features/movetech/moveTechSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function MTAdminForm({ email = '', username = '', role = Roles.MT_USER }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const status = useSelector((state) => state.movetech.status);
  const error = useSelector((state) => state.movetech.error);
  const success = useSelector((state) => state.movetech.success);

  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);

  useEffect(() => {
    dispatch(resetData());
  }, []);

  useEffect(() => {
    if (error?.errors) {
      setOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setopenSuccess(true);
      resetForm({
        Co_Name: '',
        Q_details: '',
        Q_requirements: '',
        Q_amount: '',
        Q_daysToComplete: ''
      });
      setTimeout(() => {
        dispatch(resetData());
      }, 2000);
    }
  }, [success]);

  const FormSchema = Yup.object().shape({
    Co_Name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Customer Name required'),
    Q_details: Yup.string().required('Quotation details is required'),
    Q_amount: Yup.number().required('Quotation amount is required'),
    Q_daysToComplete: Yup.number().required('Quotation days to complete is required')
  });

  const formik = useFormik({
    initialValues: {
      Co_Name: '',
      Q_details: '',
      Q_requirements: '',
      Q_amount: '',
      Q_daysToComplete: ''
    },
    validationSchema: FormSchema,
    onSubmit: (data) => {
      console.log(data);
      dispatch(resetData());
      dispatch(
        createContractAsync({
          customerName: data.Co_Name,
          quotationDetails: data.Q_details,
          requirements: data.Q_requirements,
          amount: data.Q_amount,
          daysToComplete: data.Q_daysToComplete,
          token
        })
      );
      // navigate('/dashboard', { replace: true });
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopenSuccess(false);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, resetForm } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Customer Name"
              {...getFieldProps('Co_Name')}
              error={Boolean(
                (touched.Co_Name && errors.Co_Name) || (error?.errors?.customerName ?? false)
              )}
              helperText={(touched.Co_Name && errors.Co_Name) || error?.errors?.customerName}
            />
          </Stack>
          <TextField
            fullWidth
            multiline
            label="Quotation Details"
            {...getFieldProps('Q_details')}
            error={Boolean(
              (touched.Q_details && errors.Q_details) || (error?.errors?.quotationDetails ?? false)
            )}
            helperText={(touched.Q_details && errors.Q_details) || error?.errors?.quotationDetails}
          />
          <TextField
            fullWidth
            multiline
            label="Requirements"
            {...getFieldProps('Q_requirements')}
            error={Boolean(touched.Q_requirements && errors.Q_requirements)}
            helperText={touched.Q_requirements && errors.Q_requirements}
          />
          <TextField
            fullWidth
            multiline
            label="Amount"
            {...getFieldProps('Q_amount')}
            error={Boolean(
              (touched.Q_amount && errors.Q_amount) || (error?.errors?.amount ?? false)
            )}
            helperText={(touched.Q_amount && errors.Q_amount) || error?.errors?.amount}
          />
          <TextField
            fullWidth
            multiline
            label="Days To Complete"
            {...getFieldProps('Q_daysToComplete')}
            error={Boolean(
              (touched.Q_daysToComplete && errors.Q_daysToComplete) ||
                (error?.errors?.daysToComplete ?? false)
            )}
            helperText={
              (touched.Q_daysToComplete && errors.Q_daysToComplete) || error?.errors?.daysToComplete
            }
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={status === 'loading' || false}
          >
            Submit
          </LoadingButton>
        </Stack>
        {error && error?.errors && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {error?.errors?.other || error?.errors?.contractpeople}
            </Alert>
          </Snackbar>
        )}
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Form Submitted
          </Alert>
        </Snackbar>
      </Form>
    </FormikProvider>
  );
}
