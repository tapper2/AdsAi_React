import { Fragment, useState, useMemo, useEffect } from 'react';
import { Container } from '@/components/common/container';
import { CampainTitleHeader } from '../components/campainTitleHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardTable } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCampaignsStore } from '../store/useCampaignsStore';
import { Search, Globe, Key, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { tableColumn } from '../components/tables/tableColumn';
import { Badge } from '@/components/ui/badge';

export function KeywordTool() {
  const { getKeywordIdeas, fetchAllKeywords } = useCampaignsStore();
  const [searchMode, setSearchMode] = useState('keywords');
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingKeywords, setExistingKeywords] = useState(new Set());

  // טעינת מילים קיימות בחשבון להשוואה
  useEffect(() => {
    fetchAllKeywords(new Date(0), new Date()).then(data => {
      const texts = new Set(data.map(k => k.ad_group_criterion?.keyword?.text?.toLowerCase().trim()));
      setExistingKeywords(texts);
    });
  }, [fetchAllKeywords]);

  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    
    setLoading(true);
    try {
      const params = searchMode === 'keywords' 
        ? { keywords: inputValue.split(',').map(s => s.trim()) }
        : { url: inputValue.trim() };
        
      const data = await getKeywordIdeas(params);
      setResults(data || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => [
    tableColumn('שם מילת המפתח', 'שם מילת המפתח', 'text', 200, 'string'),
    tableColumn('חיפושים חודשיים', 'חיפושים חודשיים', 'avgMonthlySearches', 100, 'int'),
    {
      id: 'threeMonthChange',
      header: 'שינוי (3 חודשים)',
      cell: ({ row }) => {
        const val = row.original.threeMonthChange;
        return (
          <span className={val > 0 ? 'text-green-500' : val < 0 ? 'text-red-500' : ''}>
            {val > 0 ? '+' : ''}{val}%
          </span>
        );
      },
      size: 100,
    },
    {
      id: 'competition',
      header: 'תחרות',
      cell: ({ row }) => {
        const comp = row.original.competition;
        const colors = {
          'HIGH': 'bg-red-100 text-red-700',
          'MEDIUM': 'bg-yellow-100 text-yellow-700',
          'LOW': 'bg-green-100 text-green-700'
        };
        const labels = { 'HIGH': 'גבוהה', 'MEDIUM': 'בינונית', 'LOW': 'נמוכה' };
        return <Badge className={colors[comp] || ''}>{labels[comp] || comp}</Badge>;
      },
      size: 100,
    },
    {
        id: 'bid',
        header: 'טווח הצעת מחיר',
        cell: ({ row }) => {
          const low = row.original.lowBid || 0;
          const high = row.original.highBid || 0;
          return (
            <div className="flex flex-col text-xs font-mono">
              <span className="text-muted-foreground">נמוך: ₪{Number(low).toFixed(2)}</span>
              <span className="text-primary font-bold">גבוה: ₪{Number(high).toFixed(2)}</span>
            </div>
          );
        },
        size: 150,
    },
    {
      id: 'exists',
      header: 'קיים בחשבון',
      cell: ({ row }) => {
        const exists = existingKeywords.has(row.original.text?.toLowerCase().trim());
        return exists ? (
          <CheckCircle2 className="size-5 text-green-500 mx-auto" />
        ) : (
          <XCircle className="size-5 text-slate-300 mx-auto" />
        );
      },
      size: 100,
    }
  ], [existingKeywords]);

  const table = useReactTable({
    data: results,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="py-0 px-5">
      <CampainTitleHeader 
        name="כלי מילות מפתח" 
        info={[{ label: 'מחקר מילות מפתח ורעיונות חדשים', icon: Search }]} 
      />

      <Container>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>חיפוש רעיונות חדשים</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup 
              defaultValue="keywords" 
              value={searchMode} 
              onValueChange={setSearchMode}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="keywords" id="r1" />
                <Label htmlFor="r1" className="flex items-center gap-2 cursor-pointer">
                  <Key className="size-4" /> חיפוש לפי מילות מפתח
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="url" id="r2" />
                <Label htmlFor="r2" className="flex items-center gap-2 cursor-pointer">
                  <Globe className="size-4" /> חיפוש לפי אתר
                </Label>
              </div>
            </RadioGroup>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  placeholder={searchMode === 'keywords' ? "הזן מילות מפתח מופרדות בפסיקים (למשל: עורך דין, גירושין)" : "הזן כתובת אתר (למשל: https://example.com)"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="ps-10"
                />
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin ml-2" /> : <Search className="size-4 ml-2" />}
                קבל רעיונות
              </Button>
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <DataGrid table={table} recordCount={results.length}>
            <Card>
              <CardHeader>
                <CardTitle>תוצאות חיפוש ({results.length})</CardTitle>
              </CardHeader>
              <CardTable>
                <ScrollArea>
                  <DataGridTable />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardTable>
            </Card>
          </DataGrid>
        )}

        {!loading && results.length === 0 && inputValue && (
            <div className="py-20 text-center text-muted-foreground">
                הזן מילות מפתח ולחץ על חיפוש כדי לקבל רעיונות חדשים.
            </div>
        )}
      </Container>
    </div>
  );
}

