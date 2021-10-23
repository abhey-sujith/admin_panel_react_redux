import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
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
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
//
import USERLIST from '../../_mocks_/user';
import { fDate } from '../../utils/formatTime';
import { getContractsDataAsync } from '../../features/movetech/moveTechSlice';
import { deleteQuotation } from '../../api/apicalls';
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

export default function MTContractsDisplay() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const token = useSelector((state) => state.auth.token);
  const QUOTATIONS = useSelector((state) => state.movetech.getquotationsdata);

  console.log(QUOTATIONS, '-----------------------------');
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  // const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('customerName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [personNames, setPersonNames] = React.useState([]);

  useEffect(() => {
    dispatch(getContractsDataAsync({ token }));
  }, []);

  const handleDeleteQuotation = async (id) => {
    const isDeleted = await deleteQuotation(id, token);

    if (isDeleted) {
      dispatch(getContractsDataAsync({ token }));
      alert('Quotation is Deleted');
    } else {
      alert('Error Could not Quotation');
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - QUOTATIONS.length) : 0;

  const filteredUsers = applySortFilter(QUOTATIONS, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/register"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            // numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={QUOTATIONS.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        customerName,
                        quotationDetails,
                        createdBy,
                        state,
                        createdAt,
                        updatedAt,
                        updatedBy,
                        requirements,
                        amount,
                        daysToComplete,
                        people,
                        advanceAmount,
                        deliveryDate,
                        settledAmount
                      } = row;
                      // const isItemSelected = selected.indexOf(username) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {/* <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, username)}
                            /> */}
                          </TableCell>
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar sx={{ bgcolor: 'orange' }}>N</Avatar>
                              <Typography variant="subtitle2" noWrap>
                                {contractname}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                          <TableCell align="left">{customerName}</TableCell>
                          <TableCell align="left">
                            {quotationDetails.slice(0, 70)}
                            {quotationDetails.length > 40 ? '...' : ''}
                          </TableCell>
                          {/* <TableCell align="left">
                            <div>
                              <FormControl sx={{ m: 1, width: 150 }} disabled>
                                <Select
                                  labelId="demo-multiple-chip-label"
                                  id="demo-multiple-chip"
                                  multiple
                                  value={people}
                                  // onChange={handleChange}
                                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                  renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {selected.map(({ username, _id }) => (
                                        <Chip key={_id} label={username} />
                                      ))}
                                    </Box>
                                  )}
                                  MenuProps={MenuProps}
                                >
                                </Select>
                              </FormControl>
                            </div>
                          </TableCell> */}

                          {requirements ? (
                            <TableCell align="left">
                              {requirements.slice(0, 70)}
                              {requirements.length > 40 ? '...' : ''}
                            </TableCell>
                          ) : (
                            <TableCell align="center">-</TableCell>
                          )}
                          <TableCell align="left">{amount}</TableCell>
                          <TableCell align="left">{daysToComplete}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (state === 'PENDING' && 'info') ||
                                (state === 'APPROVED' && 'success') ||
                                (state === 'DONE' && 'warning') ||
                                'error'
                              }
                            >
                              {state}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{createdBy.username}</TableCell>
                          <TableCell align="left">{updatedBy.username}</TableCell>
                          <TableCell align="left">{fDate(updatedAt)}</TableCell>

                          <TableCell align="left">{fDate(createdAt)}</TableCell>

                          {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}

                          <TableCell align="right">
                            <UserMoreMenu
                              id={_id}
                              handleDeleteQuotation={handleDeleteQuotation}
                              customerName={customerName}
                              quotationDetails={quotationDetails}
                              state={state}
                              requirements={requirements}
                              amount={amount}
                              daysToComplete={daysToComplete}
                              advanceAmount={advanceAmount}
                              settledAmount={settledAmount}
                              deliveryDate={deliveryDate}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={QUOTATIONS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
