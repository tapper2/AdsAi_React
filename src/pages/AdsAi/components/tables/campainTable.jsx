'use client';

import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from '@tanstack/react-table';
import { Card, CardFooter, CardHeader, CardTable, CardHeading, CardTitle, CardToolbar } from '@/components/ui/card';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable, DataGridTableHead } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { tableColumn } from './tableColumn';
import { Search, Settings2, SquarePen, Trash2, X, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';




const CampainTable = ({ data }) => {
  const navigate = useNavigate();
  const { id: campaignId } = useParams();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6, });
  const [sorting, setSorting] = useState([{ id: 'updated_at', desc: true }]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(
      (item) =>
        item['ad_group'].name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const columns = useMemo(
    () => [
      tableColumn('סטטוס', 'סטטוס', 'statusName', 40, 'string', 'ad_group'),
      tableColumn('המרות', 'המרות', 'conversions', 40, 'int', 'metrics'),
      tableColumn('עלות ממוצעת לקליק', 'CPC', 'average_cpc', 40, 'currency', 'metrics'),
      tableColumn('אחוז הקלקות', 'CTR', 'ctr', 40, 'percent', 'metrics'),
      tableColumn('צפיות', 'צפיות', 'impressions', 40, 'int', 'metrics'),
      tableColumn('קליקים', 'קליקים', 'clicks', 40, 'int', 'metrics'),
      tableColumn('שם הקבוצה', 'שם הקבוצה', 'name', 140, 'string', 'ad_group'),
      {
        id: 'view',
        header: () => <div className="text-center">צפייה</div>,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/singleAdGroup/keyWords/${campaignId}/${row.original.ad_group?.id}`)}
            >
              <Eye className="size-4" />
            </Button>
          </div>
        ),
        size: 40,
      },
    ],
    [navigate, campaignId],
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


  const Toolbar = () => {
    const { table } = useDataGrid();

    return (
      <CardToolbar>
        <DataGridColumnVisibility
          table={table}
          trigger={
            <Button variant="outline">
              <Settings2 />
              פלטר שדות
            </Button>
          }
        />
      </CardToolbar>
    );
  };

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
          <CardTitle>קבוצות מודעות</CardTitle>
          <CardHeading>
            <div className="flex items-center gap-2.5">

              <div className="relative">

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
              </div>
              <Toolbar />
            </div>
          </CardHeading>

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

export default CampainTable;
