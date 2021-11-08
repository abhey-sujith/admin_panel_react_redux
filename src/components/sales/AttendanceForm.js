import * as Yup from 'yup';
import { useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useGeolocation from 'react-hook-geolocation';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate, Link } from 'react-router-dom';
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
import { resetData, getMTUserDataAsync, addAttendanceAsync } from '../../features/sales/salesSlice';
import { getgeoData } from '../../api/apicalls';

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

export default function AttendanceForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const geolocation = useGeolocation();

  const status = useSelector((state) => state.sales.status);
  const error = useSelector((state) => state.sales.error);
  const success = useSelector((state) => state.sales.success);

  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);
  const [CurrentDateTimevalue, setCurrentDateTimevalue] = useState(new Date());
  const [geoLat, setgeoLat] = useState(null);
  const [geoLon, setgeoLon] = useState(null);
  const [geoAddress, setgeoAddress] = useState(null);

  console.log(geolocation, 'out------');
  useEffect(() => {
    dispatch(resetData());
  }, []);

  const handlegeolocationChange = async (lat, lon) => {
    const result = await getgeoData(lat, lon);
    console.log('result--------', result);
    if (result) {
      setgeoAddress(result?.display_name);
    }
  };
  useEffect(() => {
    if (geolocation.latitude !== geoLat && geolocation.longitude !== geoLon) {
      console.log('useeffect geo', geolocation.latitude, geoLat, geolocation.longitude, geoLon);
      setgeoLat(geolocation.latitude);
      setgeoLon(geolocation.longitude);
      handlegeolocationChange(geolocation.latitude, geolocation.longitude);
    }
  }, [geolocation]);

  useEffect(() => {
    if (error?.errors) {
      setOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setopenSuccess(true);
      setTimeout(() => {
        dispatch(resetData());
      }, 2000);
    }
  }, [success]);

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

  const handleSubmit = (event, reason) => {
    if (geolocation.latitude && geolocation.longitude) {
      dispatch(
        addAttendanceAsync({
          currentTimestamp: CurrentDateTimevalue.toISOString(),
          location: {
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
            Address: geoAddress ? geoAddress : null
          },
          token
        })
      );
    }
  };

  return (
    <>
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
              onChange={() => {}}
              disabled
              // onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        {geolocation.latitude ? (
          <TextField fullWidth disabled label="Latitude" value={geolocation.latitude} />
        ) : null}
        {geolocation.longitude ? (
          <TextField fullWidth disabled label="Longitude" value={geolocation.longitude} />
        ) : null}
        {geoAddress ? <TextField fullWidth disabled label="address" value={geoAddress} /> : null}
        {geolocation.error?.code === 1 ? (
          <a target="_blank" href="https://support.google.com/chrome/answer/142065?hl=en">
            {' '}
            Accept Permission
          </a>
        ) : null}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={geolocation.error?.code === 1 || geolocation.latitude === null || false}
          loading={status === 'loading' || geolocation.latitude === null || false}
          onClick={handleSubmit}
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
    </>
  );
}
