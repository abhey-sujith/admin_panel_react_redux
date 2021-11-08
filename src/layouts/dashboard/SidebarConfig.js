import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { Roles } from '../../config';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
    permission: [Roles.SALES_USER]
  },
  {
    title: 'Register User',
    path: '/dashboard/register',
    icon: getIcon(personAddFill),
    permission: [Roles.SUPER_ADMIN]
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon(peopleFill),
    permission: [Roles.SUPER_ADMIN]
  },
  {
    title: 'Create Quotation',
    path: '/dashboard/movetech/create',
    icon: getIcon(peopleFill),
    permission: [Roles.SUPER_ADMIN, Roles.MT_ADMIN]
  },
  // {
  //   title: 'Show Quotation',
  //   path: '/dashboard/movetech/display-contracts',
  //   icon: getIcon(peopleFill),
  //   permission: [Roles.SUPER_ADMIN, Roles.MT_ADMIN]
  // },
  {
    title: 'Show Quotation',
    path: '/dashboard/movetech/display-quotations',
    icon: getIcon(peopleFill),
    permission: [Roles.SUPER_ADMIN, Roles.MT_ADMIN]
  },
  {
    title: 'Quotation Available',
    path: '/dashboard/movetech/quotation-available',
    icon: getIcon(peopleFill),
    permission: [Roles.MT_USER]
  },
  {
    title: 'Quotation Accepted',
    path: '/dashboard/movetech/quotation-accepted',
    icon: getIcon(peopleFill),
    permission: [Roles.MT_USER]
  },
  {
    title: 'Quotation Done',
    path: '/dashboard/movetech/quotation-done',
    icon: getIcon(peopleFill),
    permission: [Roles.MT_USER]
  },
  {
    title: 'Sales Dashboard',
    path: '/dashboard/sales/dashboard',
    icon: getIcon(peopleFill),
    permission: [Roles.SALES_USER]
  },
  {
    title: 'Attendance',
    path: '/dashboard/sales/attendance',
    icon: getIcon(peopleFill),
    permission: [Roles.SALES_USER]
  },
  {
    title: 'Add Sales',
    path: '/dashboard/sales/addsales',
    icon: getIcon(peopleFill),
    permission: [Roles.SALES_USER]
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  }
];

export default sidebarConfig;
