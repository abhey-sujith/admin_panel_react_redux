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

function Item({ time, type, isLast }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              // (type === 'order1' && 'primary.main') ||
              // (type === 'order2' && 'success.main') ||
              (type === 'in' && 'info.main') || (type === 'out' && 'warning.main') || 'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{type === 'in' ? 'Morning' : 'Evening'}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AttendanceTimeline({ attendancedata }) {
  const { in_time, out_time } = attendancedata;
  console.log(in_time, out_time, '--------------out_time');
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Attendance" />
      <CardContent>
        <Timeline>
          {in_time && <Item time={in_time} type={'in'} isLast={out_time ? false : true} />}
          {out_time && <Item time={out_time} type={'out'} isLast={true} />}
        </Timeline>
      </CardContent>
    </Card>
  );
}
