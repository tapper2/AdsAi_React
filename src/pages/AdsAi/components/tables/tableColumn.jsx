// קובץ: tableHelpers.js (או היכן שהגדרת העמודות נמצאת)

import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';

export const tableColumn = (id, title, metricKey, size, type, arrType) => {
 
  
  return {
    id: id,
    accessorFn: (row) => {
      const dynamicMetricsObject = row[arrType] || {};
      const value = dynamicMetricsObject[metricKey];
      return type === 'int' ? (value != null ? +value : 0) : value;
    },
    header: ({ column }) => (
      <DataGridColumnHeader
        className="text-right" // ניתן לשנות ל-"text-center" אם צריך
        title={title}
        column={column}
      />
    ),

    cell: ({ row }) => {
      const dynamicMetricsObject = row.original?.[arrType] || {};
      const metricValue = dynamicMetricsObject[metricKey];
      let formattedValue = metricValue;

      if (type === 'int') {
        formattedValue = metricValue != null ? (+metricValue).toLocaleString('en-US') : '0';
      }

      if (type === 'date') {
        if (metricValue) {
          try {
            const dateObject = parseISO(metricValue);
            formattedValue = format(dateObject, 'dd-MM-yyyy');
          } catch (e) {
            console.error('Error parsing date:', metricValue, e);
            formattedValue = metricValue;
          }
        } else {
          formattedValue = '-';
        }
      }

      return (
        <div className="flex flex-col gap-2 text-right float-right">
          <span className="leading-none font-medium text-sm text-mono hover:text-primary">
            {formattedValue || '-'}
          </span>
        </div>
      );
    },

    enableSorting: true,
    size: size,
    meta: {
      skeleton: (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-2.5 w-[40px]" />
        </div>
      ),
    },
  };
};


