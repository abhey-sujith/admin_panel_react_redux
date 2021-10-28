import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
// components
import Page from '../../components/Page';
import {
  getQuotationsAsync,
  setQuotationtoAcceptedAsync
} from '../../features/movetech/moveTechSlice';
import QuotationList from '../../components/movetech/quotationcard/QuotationList';
import { contractstatus } from '../../config';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function MTContractsAvailable() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const QUOTATIONSDATA = useSelector((state) => state.movetech.getQuotationsData);
  useEffect(() => {
    dispatch(getQuotationsAsync({ token }));
  }, []);
  console.log(QUOTATIONSDATA, '--------------QUOTATIONSDATA--');

  const handleClick = (id, state = 'ACCEPTED') => {
    dispatch(setQuotationtoAcceptedAsync({ id, token, state })).then(() => {
      dispatch(getQuotationsAsync({ token }));
    });
  };

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Quotations Available
        </Typography>

        <QuotationList
          quotations={QUOTATIONSDATA}
          handleClick={handleClick}
          stateValue={contractstatus.ONGOING}
          buttonValue={'Accepted'}
          showButton={true}
        />
      </Container>
    </Page>
  );
}
