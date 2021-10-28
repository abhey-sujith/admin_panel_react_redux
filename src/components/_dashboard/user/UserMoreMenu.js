import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Alert } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserMoreMenu({
  id,
  handleDeleteQuotation,
  customerName,
  quotationDetails,
  state,
  requirements,
  amount,
  daysToComplete,
  advanceAmount,
  deliveryDate,
  settledAmount
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const HandleDeleteItem = async () => {
    setIsOpen(false);
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteQuotation(id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={HandleDeleteItem}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {state === 'PENDING' ? (
          <MenuItem
            component={RouterLink}
            to="/dashboard/movetech/approve-quotation"
            state={{ id, amount, daysToComplete }}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : state === 'APPROVED' ? (
          <MenuItem
            component={RouterLink}
            to="/dashboard/movetech/end-quotation"
            state={{ id }}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="End" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : null}

        {state === 'APPROVED' || state === 'DONE' ? (
          <MenuItem
            component={RouterLink}
            to="/dashboard/movetech/edit-quotation"
            state={{
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
            }}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
}
