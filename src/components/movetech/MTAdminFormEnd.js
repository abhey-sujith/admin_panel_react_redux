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
import MobileDatePicker from '@mui/lab/MobileDatePicker';
// ----------------------------------------------------------------------
import { Roles, RolesArray, contractstatusArray } from '../../config';
import {
  resetData,
  getMTUserDataAsync,
  endQuotationAsync
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

export default function MTAdminFormEnd({ id = '' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const status = useSelector((state) => state.movetech.status);
  const error = useSelector((state) => state.movetech.error);
  const success = useSelector((state) => state.movetech.success);
  const getuserdata = useSelector((state) => state.movetech.getuserdata);

  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);

  const [personName, setPersonName] = useState([]);
  const [MTUsersName, setMTUsersName] = useState([]);

  const [CurrentDatevalue, setCurrentDatevalue] = useState(new Date());

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
      // resetForm({ Co_Name: '', Co_details: '', Co_assigned_people: [] });
      // setValues({ Co_Name: '', Co_details: '', Co_assigned_people: [] });
      setTimeout(() => {
        dispatch(resetData());
      }, 2000);
    }
  }, [success]);
  console.log(getuserdata, '----------getuserdata');

  const FormSchema = Yup.object().shape({
    Q_settled_amount: Yup.number().required('Quotation Advance Amount is required')
  });

  const formik = useFormik({
    initialValues: {
      Q_settled_amount: 0
    },
    validationSchema: FormSchema,
    onSubmit: (data) => {
      dispatch(resetData());
      dispatch(
        endQuotationAsync({
          endDate: CurrentDatevalue,
          settledAmount: data.Q_settled_amount,
          token,
          id
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

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, resetForm, setValues } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Settled Amount"
              {...getFieldProps('Q_settled_amount')}
              error={Boolean(touched.Q_settled_amount && errors.Q_settled_amount)}
              helperText={touched.Q_settled_amount && errors.Q_settled_amount}
            />
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              {/* <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            /> */}
              <MobileDatePicker
                label="End Date"
                inputFormat="dd/MM/yyyy"
                value={CurrentDatevalue}
                disabled
                onChange={() => {}}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

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
