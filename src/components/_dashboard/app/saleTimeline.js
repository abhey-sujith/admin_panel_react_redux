import faker from 'faker';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

import { getAttendanceAsync } from '../../../features/sales/salesSlice';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: '1983, orders, $4220',
    time: faker.date.past(),
    type: 'order1'
  },
  {
    title: '12 Invoices have been paid',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'Order #37745 from September',
    time: faker.date.past(),
    type: 'order3'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order4'
  },
  {
    title: 'New order placed #XF-2346',
    time: faker.date.past(),
    type: 'order5'
  }
];

// ----------------------------------------------------------------------

// OrderItem.propTypes = {
//   time: PropTypes.object,
//   isLast: PropTypes.bool
// };
const title = (item) => {
  if (item === 'time_0800') return '08:00';
  else if (item === 'time_0900') return '09:00';
  else if (item === 'time_1000') return '10:00';
  else if (item === 'time_1100') return '11:00';
  else if (item === 'time_1200') return '12:00';
  else if (item === 'time_1300') return '13:00';
  else if (item === 'time_1400') return '14:00';
  else if (item === 'time_1500') return '15:00';
  else if (item === 'time_1600') return '16:00';
  else if (item === 'time_1700') return '17:00';
  else if (item === 'time_1800') return '18:00';
};

function Item({ item, data, isLast }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              ((item === 'time_0800' || item === 'time_1200' || item === 'time_1600') &&
                'primary.main') ||
              ((item === 'time_0900' || item === 'time_1300' || item === 'time_1700') &&
                'success.main') ||
              ((item === 'time_1000' || item === 'time_1400' || item === 'time_1800') &&
                'info.main') ||
              ((item === 'time_1100' || item === 'time_1500') && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title(item)}</Typography>
        {data[item]?.Details ? (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {data[item]?.Details}
          </Typography>
        ) : null}
      </TimelineContent>
    </TimelineItem>
  );
}

export default function SaleTimeline({ salesdata }) {
  // const { in_time, out_time } = salesdata;
  // console.log(in_time, out_time, '--------------out_time');
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Sales Entry" />
      <CardContent>
        <Timeline>
          {Object.keys(salesdata).map((key, index) => (
            <Item
              key={key}
              item={key}
              data={salesdata}
              isLast={index === Object.keys(salesdata).length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
