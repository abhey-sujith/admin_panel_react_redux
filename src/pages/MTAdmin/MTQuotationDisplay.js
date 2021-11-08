import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { confirmAlert } from 'react-confirm-alert';
import { sentenceCase } from 'change-case';
import { useEffect, useState, memo, useRef } from 'react';
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
  TablePagination,
  TextField,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
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
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      lineHeight: '24px',
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      '& .cellValue': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  })
);

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

const GridCellExpand = memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = useRef(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <div
      ref={wrapper}
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cellDiv}
        style={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0
        }}
      />
      <div ref={cellValue} className="cellValue">
        {value}
      </div>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper elevation={1} style={{ minHeight: wrapper.current.offsetHeight - 3 }}>
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </div>
  );
});

function renderCellExpand(params) {
  return <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />;
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
    <Page title="User ">
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
                {selectedRowData.state === 'APPROVED' || selectedRowData.state === 'DONE' ? (
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
                ) : null}
                {selectedRowData.state === 'PENDING' ? (
                  <Button
                    variant="contained"
                    sx={{ pl: 2, pr: 2, ml: 1, mr: 1 }}
                    startIcon={<Icon icon={plusFill} />}
                    component={RouterLink}
                    to="/dashboard/movetech/approve-quotation"
                    state={{
                      id: selectedRowData.id,
                      amount: selectedRowData.amount,
                      daysToComplete: selectedRowData.daysToComplete
                    }}
                  >
                    Approve
                  </Button>
                ) : selectedRowData.state === 'APPROVED' ? (
                  <Button
                    variant="contained"
                    sx={{ pl: 2, pr: 2, ml: 1, mr: 1 }}
                    startIcon={<Icon icon={plusFill} />}
                    component={RouterLink}
                    to="/dashboard/movetech/end-quotation"
                    state={{
                      id: selectedRowData.id
                    }}
                  >
                    End
                  </Button>
                ) : null}
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

        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={[
              {
                field: 'customerName',
                renderHeader: (params) => (
                  <strong>
                    {'Customer Name'}
                    {/* <span role="img" aria-label="enjoy">
                      🎂
                    </span> */}
                  </strong>
                ),
                minWidth: 150
              },
              {
                field: 'quotationDetails',
                renderHeader: (params) => <strong>{'Quotation Details'}</strong>,
                renderCell: renderCellExpand,
                minWidth: 200
              },
              {
                field: 'requirements',
                renderHeader: (params) => <strong>{'Requirements'}</strong>,
                renderCell: renderCellExpand,
                minWidth: 200
              },

              {
                field: 'amount',
                renderHeader: (params) => <strong>{'Amount'}</strong>,
                minWidth: 150
              },
              {
                field: 'state',
                renderHeader: (params) => <strong>{'State '}</strong>,
                renderCell: (params) => (
                  <strong>
                    <Label
                      variant="ghost"
                      color={
                        (params.value === 'PENDING' && 'info') ||
                        (params.value === 'APPROVED' && 'success') ||
                        (params.value === 'DONE' && 'warning') ||
                        'error'
                      }
                    >
                      {params.value}
                    </Label>
                  </strong>
                ),
                minWidth: 150
              },
              {
                field: 'daysToComplete',
                renderHeader: (params) => <strong>{'Days to Complete'}</strong>,
                minWidth: 150
              },
              {
                field: 'advanceAmount',
                renderHeader: (params) => <strong>{'Advance Amount '}</strong>,
                minWidth: 150
              },
              {
                field: 'people',
                renderHeader: (params) => <strong>{'People Assigned '}</strong>,
                renderCell: (params) => (
                  <>
                    {params.value && params.value.length > 0 ? (
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={params.value}
                        sx={{ width: '100%' }}
                        // onChange={handleChange}
                        // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={() => <div>{params.value.length}</div>}
                      >
                        {params.value.map(({ username, email }) => (
                          <MenuItem key={email} value={username}>
                            <Box sx={{ width: '100%' }}>
                              <Typography variant="h6">{username}</Typography>
                              <Typography variant="h7" sx={{ color: 'text.secondary' }}>
                                {email}
                              </Typography>
                              <Divider />
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    ) : null}
                  </>
                ),
                minWidth: 150
              },
              {
                field: 'settledAmount',
                renderHeader: (params) => <strong>{'Settled Amount '}</strong>,
                minWidth: 150
              },

              {
                field: 'updatedBy',
                renderHeader: (params) => <strong>{'Updated By '}</strong>,
                minWidth: 150
              },
              {
                field: 'createdBy',
                renderHeader: (params) => <strong>{'Created By '}</strong>,
                minWidth: 150
              },
              {
                field: 'createdAt',
                renderHeader: (params) => <strong>{'Created At '}</strong>,
                valueFormatter: (params) => {
                  return fDate(params.value);
                },
                minWidth: 150
              },
              {
                field: 'updatedAt',
                renderHeader: (params) => <strong>{'Updated At '}</strong>,
                valueFormatter: (params) => {
                  return fDate(params.value);
                },
                minWidth: 150
              }
            ]}
            pagination
            pageSize={10}
            rowsPerPageOptions={[10]}
            rowCount={total}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            loading={loading}
            onRowClick={(params, e) => {
              console.log(e.metaKey, params.id);
              if (e.metaKey || e.ctrlKey) {
                if (params.id === selectedRow) {
                  setselectedRow('');
                  setselectedRowData('');
                } else {
                  setselectedRow(params.id);
                  setselectedRowData(params.row);
                }
              } else {
                setselectedRow(params.id);
                setselectedRowData(params.row);
              }
            }}
            selectionChange={(e) => {
              console.log(e);
            }}
            disableColumnFilter
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            components={{
              Toolbar: GridToolbar
            }}
          />
        </div>
      </Container>
    </Page>
  );
}
