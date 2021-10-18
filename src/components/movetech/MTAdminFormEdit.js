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
import { Roles, RolesArray, contractstatusArray } from '../../config';
import {
  resetData,
  getMTUserDataAsync,
  editContractAsync
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

export default function MTAdminForm({
  contractname = '',
  contractdetails = '',
  people = [],
  contractId = [],
  state = 'ONGOING'
}) {
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

  useEffect(() => {
    dispatch(resetData());
    dispatch(getMTUserDataAsync({ token }));
  }, []);

  useEffect(() => {
    if (getuserdata) {
      setMTUsersName(getuserdata);
    }
  }, [getuserdata]);

  useEffect(() => {
    if (error?.errors?.other || error?.errors?.contractpeople) {
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
    Co_Name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    Co_details: Yup.string().required('Email is required'),
    Co_assigned_people: Yup.array().min(1)
  });

  const formik = useFormik({
    initialValues: {
      Co_Name: contractname,
      Co_details: contractdetails,
      Co_assigned_people: people.map((val) => val._id),
      Co_state: state
    },
    validationSchema: FormSchema,
    onSubmit: (data) => {
      console.log(data);
      dispatch(resetData());
      dispatch(
        editContractAsync({
          contractname: data.Co_Name,
          contractdetails: data.Co_details,
          assignedpeople: data.Co_assigned_people,
          token,
          contractId,
          state: data.Co_state
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

  console.log(getuserdata, '---------------p');
  console.log(people, '---------------p');
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Contract Name"
              {...getFieldProps('Co_Name')}
              error={Boolean(
                (touched.Co_Name && errors.Co_Name) || (error?.errors?.contractname ?? false)
              )}
              helperText={(touched.Co_Name && errors.Co_Name) || error?.errors?.contractname}
            />
          </Stack>
          <TextField
            fullWidth
            multiline
            label="Contract Details"
            {...getFieldProps('Co_details')}
            error={Boolean(
              (touched.email && errors.email) || (error?.errors?.contractdetails ?? false)
            )}
            helperText={(touched.email && errors.email) || error?.errors?.contractdetails}
          />

          <div
            style={{
              alignSelf: 'center',
              width: '100%'
            }}
          >
            <FormControl sx={{ m: 1, width: '100%' }}>
              <InputLabel id="demo-multiple-chip-label">Select People</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                {...getFieldProps('Co_assigned_people')}
                // onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="People" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {MTUsersName &&
                  MTUsersName.map((data) => (
                    <MenuItem
                      key={data._id}
                      value={data._id}
                      style={getStyles(data.username, personName, theme)}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="h6">{data.username}</Typography>
                        <Typography variant="h7" sx={{ color: 'text.secondary' }}>
                          {data.email}
                        </Typography>
                        <Divider />
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div
            style={{
              alignSelf: 'center',
              width: '100%'
            }}
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...getFieldProps('Co_state')}
                  label="Role"
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
