import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import QuotationCard from './QuotationCard';
import { Fragment } from 'react';

// ----------------------------------------------------------------------

QuotationList.propTypes = {
  quotations: PropTypes.array.isRequired
};

export default function QuotationList({
  quotations,
  handleClick,
  stateValue,
  showButton,
  buttonValue,
  ...other
}) {
  return (
    <Grid container spacing={3} {...other}>
      {quotations.map((quotation) => (
        <Fragment key={quotation._id}>
          {quotation.state === stateValue ? (
            <Grid key={quotation._id} item xs={12} sm={6} md={3}>
              <QuotationCard
                key={quotation._id}
                quotation={quotation}
                handleClick={handleClick}
                stateValue={stateValue}
                buttonValue={buttonValue}
                showButton={showButton}
              />
            </Grid>
          ) : null}
        </Fragment>
      ))}
    </Grid>
  );
}
