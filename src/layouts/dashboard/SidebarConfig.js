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
    icon: getIcon(pieChart2Fill)
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
    title: 'Create Contract',
    path: '/dashboard/movetech/create',
    icon: getIcon(peopleFill),
    permission: [Roles.SUPER_ADMIN, Roles.MT_ADMIN]
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
