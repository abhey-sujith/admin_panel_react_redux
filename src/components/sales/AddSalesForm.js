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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
// ----------------------------------------------------------------------
import { Roles, RolesArray } from '../../config';
import { resetData, addSalesAsync } from '../../features/sales/salesSlice';

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

export default function AddSalesForm({ email = '', username = '', role = Roles.MT_USER }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const minDateTime = new Date();
  minDateTime.setHours(8, 0, 0, 0);
  const maxDateTime = new Date();
  maxDateTime.setHours(18, 0, 0, 0);
  const today = new Date();
  today.setMinutes(0, 0, 0, 0);

  const status = useSelector((state) => state.sales.setaddSalesStatus);
  const error = useSelector((state) => state.sales.setaddSalesError);
  const success = useSelector((state) => state.sales.setaddSalesisSuccess);

  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);

  const [CurrentDateTimevalue, setCurrentDateTimevalue] = useState(today);

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
        details: '',
        T_lead: '',
        T_activation: '',
        T_TDL: '',
        T_TSS: ''
      });
      setTimeout(() => {
        dispatch(resetData());
      }, 2000);
    }
  }, [success]);

  const FormSchema = Yup.object().shape({
    details: Yup.string().required('Quotation details is required'),
    T_lead: Yup.number().min(0).required('Quotation T_lead is required'),
    T_activation: Yup.number().min(0).required('Quotation T_activation is required'),
    T_TDL: Yup.number().min(0).required('Quotation T_TDL is required'),
    T_TSS: Yup.number().min(0).required('Quotation T_TSS is required')
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      T_lead: '',
      T_activation: '',
      T_TDL: '',
      T_TSS: ''
    },
    validationSchema: FormSchema,
    onSubmit: (data) => {
      console.log(data);
      dispatch(resetData());
      dispatch(
        addSalesAsync({
          startDate: CurrentDateTimevalue,
          details: data.details,
          T_lead: data.T_lead,
          T_activation: data.T_activation,
          T_TDL: data.T_TDL,
          T_TSS: data.T_TSS,
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              {/* <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            /> */}
              <DateTimePicker
                label="Date&Time"
                value={CurrentDateTimevalue}
                onChange={(newValue) => {
                  setCurrentDateTimevalue(newValue);
                }}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                minutesStep={15}
                ampm={false}
                openTo={'hours'}
                views={['hours']}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <TextField
            fullWidth
            multiline
            label="Details"
            {...getFieldProps('details')}
            error={Boolean(touched.details && errors.details)}
            helperText={touched.details && errors.details}
          />
          <TextField
            fullWidth
            label="Total Lead"
            {...getFieldProps('T_lead')}
            error={Boolean(touched.T_lead && errors.T_lead)}
            helperText={touched.T_lead && errors.T_lead}
          />
          <TextField
            fullWidth
            label="Total Activation"
            {...getFieldProps('T_activation')}
            error={Boolean(touched.T_activation && errors.T_activation)}
            helperText={touched.T_activation && errors.T_activation}
          />
          <TextField
            fullWidth
            label="Total TDL"
            {...getFieldProps('T_TDL')}
            error={Boolean(touched.T_TDL && errors.T_TDL)}
            helperText={touched.T_TDL && errors.T_TDL}
          />
          <TextField
            fullWidth
            label="Total TSS"
            {...getFieldProps('T_TSS')}
            error={Boolean(touched.T_TSS && errors.T_TSS)}
            helperText={touched.T_TSS && errors.T_TSS}
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error?.errors?.other || error?.errors?.contractpeople}
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Form Submitted
          </Alert>
        </Snackbar>
      </Form>
    </FormikProvider>
  );
}
