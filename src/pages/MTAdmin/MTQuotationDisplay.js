import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { confirmAlert } from 'react-confirm-alert';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
import { QuotationFilterSidebar } from '../../components/_dashboard/products';
//
import USERLIST from '../../_mocks_/user';
import { fDate } from '../../utils/formatTime';
import { getContractsDataAsync } from '../../features/movetech/moveTechSlice';
import { loadServerData, deleteQuotation } from '../../api/apicalls';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'customerName', label: 'Customer Name', alignRight: false },
  { id: 'details', label: 'Details', alignRight: false },
  { id: 'requirements', label: 'Requirements', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'daystocomplete', label: 'Days to Complete', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'createdby', label: 'Created By', alignRight: false },
  { id: 'updated', label: 'Updated By', alignRight: false },
  { id: 'createdat', label: 'Created At', alignRight: false },
  { id: 'updatedat', label: 'Updated At', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.customerName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

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

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder'
// ];

// function getStyles(name, personNames, theme) {
//   return {
//     fontWeight:
//       personNames.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium
//   };
// }

function loadServerRows(page, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.rows.slice(page * 5, (page + 1) * 5));
    }, Math.random() * 500 + 100); // simulate network latency
  });
}
export default function MTQuotationDisplay() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const token = useSelector((state) => state.auth.token);

  // const [order, setOrder] = useState('asc');
  // const [selected, setSelected] = useState([]);
  // const [orderBy, setOrderBy] = useState('customerName');
  // const [filterName, setFilterName] = useState('');
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [personNames, setPersonNames] = React.useState([]);

  // useEffect(() => {
  //   dispatch(getContractsDataAsync({ token }));
  // }, []);

  // const handleDeleteQuotation = async (id) => {
  //   const isDeleted = await deleteQuotation(id, token);

  //   if (isDeleted) {
  //     dispatch(getContractsDataAsync({ token }));
  //     alert('Quotation is Deleted');
  //   } else {
  //     alert('Error Could not Quotation');
  //   }
  // };

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERS.map((n) => n.email);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, username) => {
  //   const selectedIndex = selected.indexOf(username);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, username);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - QUOTATIONS.length) : 0;

  // const filteredUsers = applySortFilter(QUOTATIONS, getComparator(order, orderBy), filterName);

  // const isUserNotFound = filteredUsers.length === 0;
  const [page, setPage] = useState(0);
  const [stateValue, setstateValue] = useState(['PENDING', 'APPROVED', 'DONE']);
  const [sortModel, setSortModel] = useState([{ field: 'updatedAt', sort: 'desc' }]);
  const [selectedRow, setselectedRow] = useState('');
  const [selectedRowData, setselectedRowData] = useState('');

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    let active = true;

    console.log('in useeffect page');
    (async () => {
      setLoading(true);
      const data = await loadServerData(page, token, stateValue, sortModel);

      console.log('data', data);
      if (!active) {
        return;
      }

      if (data === 'could not fetch') {
        console.log('in--------');
        setLoading(false);
        return;
      }

      if (data?.length !== 0) {
        setRows(data?.quotations);
        setTotal(data?.total);
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, stateValue, total, sortModel]);

  const formik = useFormik({
    initialValues: {
      state: []
    },
    onSubmit: (data) => {
      setOpenFilter(false);
      console.log(data, '----datasadsd');
      setstateValue(data.state);
      setRows([]);
      setTotal(0);
      setPage(0);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleSubmitFilter = () => {
    handleSubmit();
  };

  const handleResetFilter = () => {
    resetForm();
    setstateValue(['PENDING', 'APPROVED', 'DONE']);
    setRows([]);
    setTotal(0);
    setPage(0);
    setOpenFilter(false);
  };

  const handleDeleteQuotation = async () => {
    const isDeleted = await deleteQuotation(selectedRow, token);

    if (isDeleted) {
      setRows([]);
      setTotal(0);
      setPage(0);
      alert('Quotation is Deleted');
    } else {
      alert('Error Could not Quotation');
    }
  };

  const confirmDelete = () => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteQuotation()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleSortModelChange = (newModel) => {
    console.log(newModel, 'newModel-----------');
    setSortModel(newModel);
  };

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            // sx={{ mb: 5 }}
          >
            <QuotationFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              onSubmitFilter={handleSubmitFilter}
            />
            {selectedRow ? (
              <>
                <Button
                  variant="contained"
                  sx={{ pl: 2, pr: 2, ml: 1, mr: 1 }}
                  startIcon={<Icon icon={plusFill} />}
                  component={RouterLink}
                  to="/dashboard/movetech/edit-quotation"
                  state={{
                    id: selectedRowData.id,
                    customerName: selectedRowData.customerName,
                    quotationDetails: selectedRowData.quotationDetails,
                    state: selectedRowData.state,
                    requirements: selectedRowData.requirements,
                    amount: selectedRowData.amount,
                    daysToComplete: selectedRowData.daysToComplete,
                    advanceAmount: selectedRowData.advanceAmount,
                    deliveryDate: selectedRowData.deliveryDate,
                    settledAmount: selectedRowData.settledAmount
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{ pl: 2, pr: 2, ml: 1, mr: 1 }}
                  onClick={confirmDelete}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Delete
                </Button>
              </>
            ) : null}
          </Stack>
        </Stack>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={[
              { field: 'customerName' },
              { field: 'quotationDetails' },
              { field: 'requirements' },
              { field: 'amount' },
              { field: 'daysToComplete' },
              { field: 'advanceAmount' },
              { field: 'settledAmount' },
              { field: 'state' },
              { field: 'createdBy' },
              { field: 'updatedBy' },
              { field: 'createdAt' },
              { field: 'updatedAt' }
            ]}
            pagination
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowCount={total}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            loading={loading}
            onRowClick={(e) => {
              console.log(e);
              setselectedRow(e.id);
              setselectedRowData(e.row);
            }}
            disableColumnFilter
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
          />
        </div>
      </Container>
    </Page>
  );
}
