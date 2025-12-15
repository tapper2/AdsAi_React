'use client';

import { useMemo, useState } from 'react';
import { AvatarGroup } from '@/partials/common/avatar-group';
import { Rating } from '@/partials/common/rating';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const Teams = ({ data }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState([{ id: 'updated_at', desc: true }]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const columns = useMemo(
    () => [
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
        id: 'userName',
        accessorFn: (row) => row.userName,
        header: ({ column }) => (
          <DataGridColumnHeader title="UserName" column={column} />
        ),

        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none font-medium text-sm text-mono hover:text-primary">
              {row.original.userName}
            </span>
            <span className="text-sm text-secondary-foreground font-normal leading-3">
              {row.original.userName}
            </span>
          </div>
        ),

        enableSorting: true,
        size: 140,
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

        cell: ({ row }) => (
          <AvatarGroup group={row.original.users} size="size-8" />
        ),

        enableSorting: true,
        size: 135,
        meta: {
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
      {
        id: 'adName',
        accessorFn: (row) => row.ad_group,
        header: ({ column }) => (
          <DataGridColumnHeader title="adName" column={column} />
        ),

        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none font-medium text-sm text-mono hover:text-primary">
              {row.ad_group.name}
            </span>
          </div>
        ),

        enableSorting: true,
        size: 140,
        meta: {
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
              <Skeleton className="h-2.5 w-[90px]" />
            </div>
          ),
        },
      },
    ],

    [],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader className="py-3.5">
          <CardTitle>Teams</CardTitle>
          <CardToolbar className="relative">
            <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search Teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 w-40"
            />

            {searchQuery.length > 0 && (
              <Button
                mode="icon"
                variant="ghost"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery('')}
              >
                <X />
              </Button>
            )}
          </CardToolbar>
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
};

export { Teams };
