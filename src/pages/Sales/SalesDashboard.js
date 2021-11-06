import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  AttendanceTimeline,
  SaleTimeline
} from '../../components/_dashboard/app';
import { getAttendanceAsync, getSalesAsync } from '../../features/sales/salesSlice';
// ----------------------------------------------------------------------

export default function SalesDashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const attendancedata = useSelector((state) => state.sales.getattendancedata);
  const salesdata = useSelector((state) => state.sales.getsalesdata);

  console.log(attendancedata, 'attendancedata-----', salesdata, '-------getsalesdata');
  useEffect(() => {
    dispatch(getAttendanceAsync({ token }));
    dispatch(getSalesAsync({ token }));
  }, []);
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box> */}
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          {attendancedata ? (
            <Grid item xs={12} md={6} lg={4}>
              <AttendanceTimeline attendancedata={attendancedata} />
            </Grid>
          ) : null}

          {salesdata ? (
            <Grid item xs={12} md={6} lg={4}>
              <SaleTimeline salesdata={salesdata} />
            </Grid>
          ) : null}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
