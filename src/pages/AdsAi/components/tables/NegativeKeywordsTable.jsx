'use client';

import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardHeading,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { tableColumn } from './tableColumn';
import { Search, Settings2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';

const NegativeKeywordsTable = ({ data }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: 'text', desc: false }]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data;
    
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) => {
      const keywordText = item.campaign_criterion?.keyword?.text || '';
      return keywordText.toLowerCase().includes(lowerQuery);
    });
  }, [data, searchQuery]);

  const columns = useMemo(
    () => [
      tableColumn('סוג התאמה', 'סוג התאמה', 'match_type', 100, 'string', 'campaign_criterion.keyword'),
      tableColumn('סטטוס', 'סטטוס', 'statusName', 100, 'string', 'campaign_criterion'),
      tableColumn('ID קריטריון', 'ID', 'criterion_id', 100, 'string', 'campaign_criterion'),
      tableColumn('מילת מפתח', 'מילת מפתח', 'text', 200, 'string', 'campaign_criterion.keyword'),
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row, index) => row.campaign_criterion?.criterion_id || index.toString(),
    state: {
      pagination,
      sorting,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
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
          <CardTitle>מילות מפתח שליליות</CardTitle>
          <CardHeading>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  placeholder="חיפוש מילה..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9 w-40 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                {searchQuery.length > 0 && (
                  <Button
                    variant="ghost"
                    className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="size-4" />
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

export default NegativeKeywordsTable;

