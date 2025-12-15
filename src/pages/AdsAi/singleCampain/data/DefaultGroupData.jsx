export const columnsArray = [
  {
    accessorKey: 'id',
    accessorFn: (row) => row.id,
    header: () => <DataGridTableRowSelectAll />,
    cell: ({ row }) => <DataGridTableRowSelect row={row} />,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    size: 48,
    meta: {
      cellClassName: '',
    },
  },
  {
    id: 'name',
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <DataGridColumnHeader title="Team" column={column} />
    ),

    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <span className="leading-none font-medium text-sm text-mono hover:text-primary">
          {row.original.name}
        </span>
        <span className="text-sm text-secondary-foreground font-normal leading-3">
          {row.original.description}
        </span>
      </div>
    ),

    enableSorting: true,
    size: 280,
    meta: {
      skeleton: (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[125px]" />
          <Skeleton className="h-2.5 w-[90px]" />
        </div>
      ),
    },
  },
  {
    id: 'rating',
    accessorFn: (row) => row.rating,
    header: ({ column }) => (
      <DataGridColumnHeader title="Rating" column={column} />
    ),

    cell: ({ row }) => (
      <Rating
        rating={Math.floor(row.original.rating)}
        round={row.original.rating % 1}
      />
    ),

    enableSorting: true,
    size: 135,
    meta: {
      skeleton: <Skeleton className="h-5 w-[60px]" />,
    },
  },
  {
    id: 'updated_at',
    accessorFn: (row) => row.updated_at,
    header: ({ column }) => (
      <DataGridColumnHeader title="Last Modified" column={column} />
    ),

    cell: ({ row }) => row.original.updated_at,
    enableSorting: true,
    size: 135,
    meta: {
      skeleton: <Skeleton className="h-5 w-[70px]" />,
    },
  },
  {
    id: 'users',
    accessorFn: (row) => row.users,
    header: ({ column }) => (
      <DataGridColumnHeader title="Members" column={column} />
    ),

    cell: ({ row }) => <AvatarGroup group={row.original.users} size="size-8" />,

    enableSorting: true,
    size: 135,
    meta: {
      skeleton: <Skeleton className="h-6 w-[75px]" />,
    },
  },
];

export const Data = [
  {
    id: 1,
    name: 'Product Management',
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

export default Data;
