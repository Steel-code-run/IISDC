import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import {SvgIcon} from '@mui/material';
import {CogIcon} from "@heroicons/react/20/solid";
import {PestControl} from "@mui/icons-material";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArchiveIcon from '@mui/icons-material/Archive';

export const items = [
  // {
  //   title: 'Overview',
  //   path: '/',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ChartBarIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Пользователи',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    childrenNav: [
      {
        title: 'Роли',
        path: '/customers/roles',
        icon: (
            <SvgIcon fontSize="small">
              <UsersIcon />
            </SvgIcon>
        )
      },
    ]
  },

  {
    title: 'Парсеры',
    path: '/parsers',
    icon: (
        <SvgIcon fontSize="small">
          <PestControl />
        </SvgIcon>
    ),
    childrenNav: []
  },
  {
    title: 'Гранты',
    path: '/grants',
    icon: (
        <SvgIcon fontSize="small">
          <PostAddIcon />
        </SvgIcon>
    ),
    childrenNav: []
  },
  {
    title: 'Конкурсы',
    path: '/competitions',
    icon: (
        <SvgIcon fontSize="small">
          <PostAddIcon />
        </SvgIcon>
    ),
    childrenNav: []
  },
  {
    title: 'Архив',
    path: '/archive',
    icon: (
        <SvgIcon fontSize="small">
          <ArchiveIcon />
        </SvgIcon>
    ),
    childrenNav: []
  },
  // {
  //   title: 'Скрыте статьи',
  //   path: '/blackList',
  //   icon: (
  //       <SvgIcon fontSize="small">
  //         <UsersIcon />
  //       </SvgIcon>
  //   ),
  //   childrenNav: []
  // },
  // {
  //   title: 'Companies',
  //   path: '/companies',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Account',
  //   path: '/account',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Настройки',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
    childrenNav: []
  },
  {
    title: 'Логи',
    path: '/logs',
    icon: (
        <SvgIcon fontSize="small">
          <SyncAltIcon />
        </SvgIcon>
    ),
    childrenNav: []
  },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
