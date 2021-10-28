import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// utils
import { fDate, fToNow } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import { useState } from 'react';
import { contractstatus } from 'src/config';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

QuotationCard.propTypes = {
  product: PropTypes.object
};

export default function QuotationCard({
  quotation,
  handleClick,
  stateValue,
  showButton,
  buttonValue
}) {
  const {
    _id: quotationId,
    customerName,
    quotationDetails,
    requirements,
    deliveryDate,
    people,
    startDate,
    amount,
    advanceAmount,
    settledAmount
  } = quotation.quotation;

  const { _id, state } = quotation;

  const [SAmount, setSAmount] = useState(state === 'ONGOING' ? null : amount - advanceAmount);

  const handleSettledAmountChange = (e) => {
    setSAmount(e.target.value);
  };
  return (
    <Card>
      <Box sx={{ p: '10%' }}>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block' }}
        >
          {fDate(startDate)}
        </Typography>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={cover} /> */}
        <Typography variant="subtitle1" noWrap>
          Customer Name
        </Typography>
        <Typography variant="subtitle3" color={'#757575'} noWrap>
          {customerName}
        </Typography>
        <Typography variant="subtitle1" noWrap>
          Details
        </Typography>
        <Typography variant="subtitle3" color={'#757575'}>
          {quotationDetails}
        </Typography>
        {requirements ? (
          <Typography variant="subtitle1" noWrap>
            Requirements
          </Typography>
        ) : null}
        {requirements ? (
          <Typography variant="subtitle3" color={'#757575'}>
            {requirements}
          </Typography>
        ) : null}
        <Typography variant="subtitle1" noWrap>
          Delivery Date
        </Typography>
        <Typography variant="subtitle3" color={'#757575'}>
          {fDate(deliveryDate)}
          {/* {' - '}
          {fToNow(deliveryDate)}
          {' left'} */}
        </Typography>
        <Typography variant="subtitle1" noWrap sx={{ pb: 1 }}>
          Assigned People
        </Typography>
        {people.map((obj) => (
          <Chip key={obj.email} label={obj.username} sx={{ mr: 1, mt: 1 }} />
        ))}
      </Box>
      {state === 'ACCEPTED' ? (
        <>
          {' '}
          {settledAmount ? (
            <TextField
              fullWidth
              label="Settled Amount"
              value={settledAmount}
              disabled
              sx={{ pl: 2, pr: 2 }}
              // error={Boolean(
              //   (touched.Q_amount && errors.Q_amount) || (error?.errors?.amount ?? false)
              // )}
              // helperText={(touched.Q_amount && errors.Q_amount) || error?.errors?.amount}
            />
          ) : (
            <TextField
              fullWidth
              label="Settled Amount"
              value={SAmount}
              onChange={handleSettledAmountChange}
              sx={{ pl: 2, pr: 2 }}
              // error={Boolean(
              //   (touched.Q_amount && errors.Q_amount) || (error?.errors?.amount ?? false)
              // )}
              // helperText={(touched.Q_amount && errors.Q_amount) || error?.errors?.amount}
            />
          )}
        </>
      ) : null}

      {showButton ? (
        <Stack spacing={2} sx={{ p: 3 }}>
          {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
          <Button
            onClick={() => handleClick(_id, quotationId, settledAmount ? settledAmount : SAmount)}
            variant="contained"
            style={{ color: 'white', backgroundColor: '#ffb74d' }}
          >
            Set to {buttonValue}
          </Button>
          {/* </Link> */}

          {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack> */}
        </Stack>
      ) : null}
    </Card>
  );
}
