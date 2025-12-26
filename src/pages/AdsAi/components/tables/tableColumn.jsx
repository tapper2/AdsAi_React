// קובץ: tableHelpers.js (או היכן שהגדרת העמודות נמצאת)

import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';

export const tableColumn = (id, title, metricKey, size, type, arrType) => {
  const getNestedValue = (obj, path) => {
    if (!path) return obj;
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };
  
  return {
    id: id,
    accessorFn: (row) => {
      const dynamicMetricsObject = getNestedValue(row, arrType) || {};
      let value = dynamicMetricsObject[metricKey];

      // חישובים אוטומטיים אם השדות חסרים
      if (value == null) {
        if (metricKey === 'average_cpc') {
          const cost = dynamicMetricsObject.cost_micros || 0;
          const clicks = dynamicMetricsObject.clicks || 0;
          value = clicks > 0 ? cost / clicks : 0;
        } else if (metricKey === 'ctr') {
          const clicks = dynamicMetricsObject.clicks || 0;
          const impressions = dynamicMetricsObject.impressions || 0;
          value = impressions > 0 ? clicks / impressions : 0;
        }
      }

      if (type === 'int') return value != null ? +value : 0;
      return value;
    },
    header: ({ column }) => (
      <DataGridColumnHeader
        className="text-right" // ניתן לשנות ל-"text-center" אם צריך
        title={title}
        column={column}
      />
    ),

    cell: ({ getValue }) => {
      const metricValue = getValue();
      let formattedValue = metricValue;

      if (type === 'int') {
        formattedValue = metricValue != null ? (+metricValue).toLocaleString('en-US') : '0';
      }

      if (type === 'currency') {
        formattedValue = metricValue != null 
          ? '\u20AA ' + (+metricValue / 1000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : '\u20AA 0.00';
      }

      if (type === 'percent') {
        formattedValue = metricValue != null 
          ? (+metricValue * 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%'
          : '0.00%';
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


