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
  editQuotationAsync
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

function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str);
  return d.toISOString() === str;
}

export default function MTAdminForm({
  id,
  customerName,
  quotationDetails,
  state,
  requirements,
  amount,
  daysToComplete,
  advanceAmount,
  deliveryDate,
  settledAmount
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const status = useSelector((state) => state.movetech.status);
  const error = useSelector((state) => state.movetech.error);
  const success = useSelector((state) => state.movetech.success);

  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);

  const [personName, setPersonName] = useState([]);
  const [DeliveryDatevalue, setDeliveryDatevalue] = useState(deliveryDate);

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

  const FormSchema = Yup.object().shape({
    Cname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('customerName required'),
    QDetails: Yup.string().required('Quotation Details required'),
    Req: Yup.string(),
    amt: Yup.number().required('Amount required'),
    DTC: Yup.number().required('Days To Complete required'),
    advAmount: Yup.number().required('advance Amount required')
  });

  const formik = useFormik({
    initialValues: {
      Cname: customerName,
      QDetails: quotationDetails,
      Req: requirements,
      amt: amount,
      DTC: daysToComplete,
      advAmount: advanceAmount,
      setAmount: settledAmount
    },
    validationSchema: FormSchema,
    onSubmit: (data) => {
      console.log(
        data,
        '---------data',
        isIsoDate(DeliveryDatevalue) ? DeliveryDatevalue : DeliveryDatevalue.toISOString()
      );
      dispatch(resetData());
      dispatch(
        editQuotationAsync({
          customerName: data.Cname,
          quotationDetails: data.QDetails,
          requirements: data.Req,
          amount: data.amt,
          daysToComplete: data.DTC,
          advanceAmount: data.advAmount,
          deliveryDate: isIsoDate(DeliveryDatevalue)
            ? DeliveryDatevalue
            : DeliveryDatevalue.toISOString(),
          settledAmount: data.setAmount,
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

  const handleDateChange = (newValue) => {
    setDeliveryDatevalue(newValue);
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
              label="Customer Name"
              {...getFieldProps('Cname')}
              error={Boolean(
                (touched.Cname && errors.Cname) || (error?.errors?.contractname ?? false)
              )}
              helperText={(touched.Cname && errors.Cname) || error?.errors?.contractname}
            />
          </Stack>
          <TextField
            fullWidth
            multiline
            label="Quotation Details"
            {...getFieldProps('QDetails')}
            error={Boolean(touched.QDetails && errors.QDetails)}
            helperText={touched.QDetails && errors.QDetails}
          />
          <TextField
            fullWidth
            multiline
            label="Requirement"
            {...getFieldProps('Req')}
            error={Boolean(touched.Req && errors.Req)}
            helperText={touched.Req && errors.Req}
          />
          <TextField
            fullWidth
            multiline
            label="Amount"
            {...getFieldProps('amt')}
            error={Boolean(touched.amt && errors.amt)}
            helperText={touched.amt && errors.amt}
          />
          <TextField
            fullWidth
            multiline
            label="DaysToComplete"
            {...getFieldProps('DTC')}
            error={Boolean(touched.DTC && errors.DTC)}
            helperText={touched.DTC && errors.DTC}
          />
          <TextField
            fullWidth
            multiline
            label="Advance Amount"
            {...getFieldProps('advAmount')}
            error={Boolean(touched.advAmount && errors.advAmount)}
            helperText={touched.advAmount && errors.advAmount}
          />
          {settledAmount ? (
            <TextField
              fullWidth
              multiline
              label="Settled Amount"
              {...getFieldProps('setAmount')}
              error={Boolean(touched.setAmount && errors.setAmount)}
              helperText={touched.setAmount && errors.setAmount}
            />
          ) : null}
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
                label="Delivery Date"
                inputFormat="dd/MM/yyyy"
                value={DeliveryDatevalue}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

          <div
            style={{
              alignSelf: 'center',
              width: '100%'
            }}
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{state}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  disabled
                  label="Role"
                  value={state}
                >
                  {contractstatusArray.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>

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
