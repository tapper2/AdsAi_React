import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Skeleton } from '@/components/ui/skeleton';

export const GroupData = [
  {
    ad_group: {
      resource_name: 'customers/9162124601/adGroups/189278453893',
      status: 2,
      id: 189278453893,
      name: 'מיסוי נדלן',
    },
    metrics: {
      clicks: '42',
      conversions_value: 0,
      conversions: 1,
      cost_micros: 632115270,
      ctr: 0.17073170731707318,
      impressions: 246,
    },
  },
  {
    ad_group: {
      resource_name: 'customers/9162124601/adGroups/190104168475',
      status: 2,
      id: 190104168475,
      name: 'מס רכישה',
    },
    metrics: {
      clicks: '0',
      conversions_value: 0,
      conversions: 0,
      cost_micros: 0,
      ctr: 0,
      impressions: 8,
    },
  },
  {
    ad_group: {
      resource_name: 'customers/9162124601/adGroups/189728735015',
      status: '2',
      id: 189728735015,
      name: 'מס שבח',
    },
    metrics: {
      clicks: '2',
      conversions_value: 0,
      conversions: 0,
      cost_micros: 18960000,
      ctr: 0.05714285714285714,
      impressions: 35,
    },
  },
  {
    ad_group: {
      resource_name: 'customers/9162124601/adGroups/190997767433',
      status: 2,
      id: 190997767433,
      name: 'עסקאות קומבינציה',
    },
    metrics: {
      clicks: '4',
      conversions_value: 0,
      conversions: 0,
      cost_micros: 58020000,
      ctr: 0.057971014492753624,
      impressions: 69,
    },
  },
  {
    ad_group: {
      resource_name: 'customers/9162124601/adGroups/189407336797',
      status: 2,
      id: 189407336797,
      name: 'פינוי בינוי',
    },
    metrics: {
      clicks: '11',
      conversions_value: 0,
      conversions: 1,
      cost_micros: 148675262,
      ctr: 0.0873015873015873,
      impressions: 126,
    },
  },
  {
    ad_group: {
      resource_name: 'customers/9162124601/adGroups/192450623187',
      status: 2,
      id: 192450623187,
      name: 'תמ"א 38',
    },
    metrics: {
      clicks: '9',
      conversions_value: 0,
      conversions: 0,
      cost_micros: 169050000,
      ctr: 0.15789473684210525,
      impressions: 57,
    },
  },
];

export const Data2 = [
  {
    id: 1,
    name: 'Product Management',
    userName: 'z-shay-ly',
    description: 'Product development & lifecycle',
    rating: 5,
    created_at: '21 Oct, 2024',
    updated_at: '21 Oct, 2024',
    users: [
      { path: '/media/avatars/300-4.png', fallback: 'PM' }, // Cristian Mitchell
      { path: '/media/avatars/300-1.png', fallback: 'PM' }, // Grace Mueller
      { path: '/media/avatars/300-2.png', fallback: 'PM' }, // Ephraim Wilderman
      { path: '/media/avatars/300-4.png', fallback: 'PM' }, // Colin Balistreri
    ],
  },
  {
    id: 2,
    name: 'Marketing Team',
    userName: 'z-shay-ly',
    description: 'Campaigns & market analysis',
    rating: 3.5,
    created_at: '15 Oct, 2024',
    updated_at: '15 Oct, 2024',
    users: [
      { path: '/media/avatars/300-4.png', fallback: 'MT' }, // Keenan Keeling
      { path: '', fallback: 'MT' }, // Una Goldner
    ],
  },
  {
    id: 3,
    name: 'HR Department',
    userName: 'z-shay-ly',
    description: 'Talent acquisition, employee welfare',
    rating: 5,
    created_at: '10 Oct, 2024',
    updated_at: '10 Oct, 2024',
    users: [
      { path: '/media/avatars/300-4.png', fallback: 'HR' }, // Rupert Maggio
      { path: '/media/avatars/300-1.png', fallback: 'HR' }, // Pattie Morar
      { path: '/media/avatars/300-2.png', fallback: 'HR' }, // Stuart Hermiston
    ],
  },
  {
    id: 4,
    name: 'Sales Division',
    userName: 'z-shay-ly',
    description: 'Customer relations, sales strategy',
    rating: 5,
    created_at: '05 Oct, 2024',
    updated_at: '05 Oct, 2024',
    users: [
      { path: '/media/avatars/300-24.png', fallback: 'SD' }, // Ezequiel Quigley
      { path: '/media/avatars/300-7.png', fallback: 'SD' }, // Florine Homenick
    ],
  },
  {
    id: 5,
    name: 'Development Team',
    userName: 'z-shay-ly',
    description: 'Software development',
    rating: 4.5,
    created_at: '01 Oct, 2024',
    updated_at: '01 Oct, 2024',
    users: [
      { path: '/media/avatars/300-3.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-8.png', fallback: 'DT' }, // Jarrod Kerluke
      { path: '/media/avatars/300-9.png', fallback: 'DT' }, // Trace Rosenbaum
    ],
  },
  {
    id: 6,
    name: 'Quality Assurance',
    userName: 'z-shay-ly',
    description: 'Product testing',
    rating: 5,
    created_at: '25 Sep, 2024',
    updated_at: '25 Sep, 2024',
    users: [
      { path: '/media/avatars/300-6.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-5.png', fallback: 'DT' }, // Jarrod Kerluke
    ],
  },
  {
    id: 7,
    name: 'Finance Team',
    userName: 'z-shay-ly',
    description: 'Financial planning',
    rating: 4,
    created_at: '20 Sep, 2024',
    updated_at: '20 Sep, 2024',
    users: [
      { path: '/media/avatars/300-10.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-11.png', fallback: 'DT' }, // Jarrod Kerluke
      { path: '/media/avatars/300-12.png', fallback: 'DT' }, // Trace Rosenbaum
    ],
  },
  {
    id: 8,
    name: 'Customer Support',
    userName: 'z-shay-ly',
    description: 'Customer service',
    rating: 3,
    created_at: '15 Sep, 2024',
    updated_at: '15 Sep, 2024',
    users: [
      { path: '/media/avatars/300-13.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-14.png', fallback: 'DT' }, // Jarrod Kerluke
    ],
  },
  {
    id: 9,
    name: 'R&D Team',
    userName: 'z-shay-ly',
    description: 'Research & development',
    rating: 5,
    created_at: '10 Sep, 2024',
    updated_at: '10 Sep, 2024',
    users: [
      { path: '/media/avatars/300-15.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-16.png', fallback: 'DT' }, // Jarrod Kerluke
    ],
  },
  {
    id: 10,
    name: 'Operations Team',
    userName: 'z-shay-ly',
    description: 'Operations management',
    rating: 4,
    created_at: '05 Sep, 2024',
    updated_at: '05 Sep, 2024',
    users: [
      { path: '/media/avatars/300-17.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-18.png', fallback: 'DT' }, // Jarrod Kerluke
      { path: '/media/avatars/300-19.png', fallback: 'DT' }, // Trace Rosenbaum
    ],
  },
  {
    id: 11,
    name: 'IT Support',
    userName: 'z-shay-ly',
    description: 'Technical support',
    rating: 5,
    created_at: '01 Sep, 2024',
    updated_at: '01 Sep, 2024',
    users: [
      { path: '/media/avatars/300-20.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-21.png', fallback: 'DT' }, // Jarrod Kerluke
    ],
  },
  {
    id: 12,
    name: 'Legal Team',
    userName: 'z-shay-ly',
    description: 'Legal support',
    rating: 4,
    created_at: '25 Aug, 2024',
    updated_at: '25 Aug, 2024',
    users: [
      { path: '/media/avatars/300-22.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-23.png', fallback: 'DT' }, // Jarrod Kerluke
    ],
  },
  {
    id: 13,
    name: 'Logistics Team',
    userName: 'z-shay-ly',
    description: 'Supply chain',
    rating: 3,
    created_at: '20 Aug, 2024',
    updated_at: '20 Aug, 2024',
    users: [
      { path: '/media/avatars/300-24.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-25.png', fallback: 'DT' }, // Jarrod Kerluke
    ],
  },
  {
    id: 14,
    name: 'Procurement Team',
    userName: 'z-shay-ly',
    description: 'Supplier management',
    rating: 5,
    created_at: '15 Aug, 2024',
    updated_at: '15 Aug, 2024',
    users: [
      { path: '/media/avatars/300-26.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-27.png', fallback: 'DT' }, // Jarrod Kerluke
      { path: '/media/avatars/300-28.png', fallback: 'DT' }, // Trace Rosenbaum
    ],
  },
  {
    id: 15,
    name: 'Training Team',
    userName: 'z-shay-ly',
    description: 'Employee training',
    rating: 4,
    created_at: '10 Aug, 2024',
    updated_at: '10 Aug, 2024',
    users: [
      { path: '/media/avatars/300-29.png', fallback: 'DT' }, // Ubaldo Mosciski
      { path: '/media/avatars/300-30.png', fallback: 'DT' }, // Jarrod Kerluke
    ],
  },
];
