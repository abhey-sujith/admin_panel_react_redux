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
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import { getUsersData, deleteUser } from '../api/apicalls';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'isactive', label: 'Active', alignRight: false },
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
      (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const token = useSelector((state) => state.auth.token);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  // const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('username');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERS, setUSERS] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const USERDATA = await getUsersData(token);
      console.log(USERDATA, 'USERDATA------');
      setUSERS(USERDATA);
    };
    getData();
  }, []);

  const handleDeleteUser = async (id) => {
    const isDeleted = await deleteUser(id, token);

    if (isDeleted) {
      const USERDATA = await getUsersData(token);
      console.log(USERDATA, 'USERDATA------');
      setUSERS(USERDATA);
      alert('User is Deleted');
    } else {
      alert('Error Could not delete');
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERS.length) : 0;

  const filteredUsers = applySortFilter(USERS, getComparator(order, orderBy), filterName);

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
                  rowCount={USERS.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, username, role, isactive, email } = row;
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
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar sx={{ bgcolor: 'orange' }}>N</Avatar>
                              <Typography variant="subtitle2" noWrap>
                                {username}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                          <TableCell align="left">
                            <Label variant="ghost" color={(true && 'success') || 'error'}>
                              {(true && 'active') || 'inactive'}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              id={_id}
                              DeleteUser={handleDeleteUser}
                              email={email}
                              username={username}
                              role={role}
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
            count={USERS.length}
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
