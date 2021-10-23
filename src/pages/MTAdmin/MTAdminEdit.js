import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
// components
import Page from '../../components/Page';
import { MTAdminFormEdit } from '../../components/movetech';

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

export default function MTAdminEdit() {
  const location = useLocation();
  console.log(location.state, '---------location.state');
  const {
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
  } = location.state;

  return (
    <RootStyle title="Register | Minimal-UI">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Edit Quotation
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>
              Free forever. No credit card needed.
            </Typography> */}
          </Box>

          <MTAdminFormEdit
            id={id}
            customerName={customerName}
            quotationDetails={quotationDetails}
            state={state}
            requirements={requirements}
            amount={amount}
            daysToComplete={daysToComplete}
            advanceAmount={advanceAmount}
            deliveryDate={deliveryDate}
            settledAmount={settledAmount}
          />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
