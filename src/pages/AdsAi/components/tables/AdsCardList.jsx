'use client';

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MousePointer2, 
  Eye, 
  Target, 
  TrendingUp, 
  AlignLeft, 
  Layout,
  CircleCheck,
  CircleDashed,
  AlertCircle,
  BrainCircuit
} from 'lucide-react';
import { AdAiAnalysisModal } from '../AdAiAnalysisModal';
import { useState } from 'react';

const AdsCardList = ({ data }) => {
  const [analysisAdId, setAnalysisAdId] = useState(null);
  const ads = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  if (ads.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground bg-card border rounded-xl">
        לא נמצאו מודעות להצגה.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AdAiAnalysisModal 
        isOpen={!!analysisAdId} 
        onClose={() => setAnalysisAdId(null)} 
        adId={analysisAdId}
      />
      {ads.map((item, index) => {
        const ad = item.ad_group_ad?.ad?.responsive_search_ad;
        const metrics = item.metrics || {};
        const status = item.ad_group_ad?.statusName || 'לא ידוע';
        const headlines = ad?.headlines || [];
        const descriptions = ad?.descriptions || [];

        // Formatting values
        const clicks = Number(metrics.clicks || 0).toLocaleString();
        const impressions = Number(metrics.impressions || 0).toLocaleString();
        const ctr = (Number(metrics.clicks || 0) / Math.max(Number(metrics.impressions || 1), 1) * 100).toFixed(2) + '%';
        const conversions = Number(metrics.conversions || 0).toLocaleString();
        const cost = metrics.cost_micros 
          ? '\u20AA ' + (Number(metrics.cost_micros) / 1000000).toLocaleString('en-US', { minimumFractionDigits: 2 })
          : '\u20AA 0.00';

        const statusColor = status === 'פעיל' ? 'bg-green-100 text-green-700 border-green-200' : 
                          status === 'מושהה' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                          'bg-slate-100 text-slate-700 border-slate-200';

        return (
          <Card key={index} className="overflow-hidden border-t-4 pt-3 border-t-primary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Layout className="size-4 text-primary" />
                    <CardTitle className="text-lg">מודעת חיפוש רספונסיבית</CardTitle>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">ID: {item.ad_group_ad?.ad?.id || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 border-primary/30 hover:bg-primary/5 text-primary"
                    onClick={() => setAnalysisAdId(item.ad_group_ad?.ad?.id)}
                  >
                    <BrainCircuit className="size-4" />
                    ניתוח AI חכם
                  </Button>
                  <Badge className={statusColor}>{status}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6 space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                    <MousePointer2 className="size-4 text-blue-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">קליקים</span>
                  <span className="font-bold text-sm">{clicks}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                    <Eye className="size-4 text-purple-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">חשיפות</span>
                  <span className="font-bold text-sm">{impressions}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                    <TrendingUp className="size-4 text-orange-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">CTR</span>
                  <span className="font-bold text-sm text-orange-600">{ctr}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                    <Target className="size-4 text-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">המרות</span>
                  <span className="font-bold text-sm text-green-600">{conversions}</span>
                </div>
              </div>

              {/* Ad Content Accordion */}
              <Accordion type="single" collapsible className="w-full border rounded-lg bg-card">
                <AccordionItem value="content" className="border-none px-4">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center gap-2">
                      <AlignLeft className="size-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">צפה בתוכן המודעה ({headlines.length} כותרות, {descriptions.length} תיאורים)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider border-b pb-1">
                          <CircleCheck className="size-3" />
                          כותרות ({headlines.length})
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {headlines.map((h, i) => (
                            <div key={i} className="text-xs px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100 flex items-center gap-1.5">
                               <div className="size-1.5 bg-blue-400 rounded-full" />
                               {h.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider border-b pb-1">
                          <AlignLeft className="size-3" />
                          תיאורים ({descriptions.length})
                        </div>
                        <div className="space-y-2">
                          {descriptions.map((d, i) => (
                            <div key={i} className="text-xs p-3 bg-muted/50 rounded-lg border italic leading-relaxed text-muted-foreground">
                              "{d.text}"
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Summary Line */}
              <div className="flex justify-between items-center text-xs pt-2 border-t text-muted-foreground italic">
                 <div className="flex items-center gap-1">
                    <CircleDashed className="size-3" />
                    סוג: Responsive Search Ad
                 </div>
                 <div className="font-bold text-primary">
                    עלות: {cost}
                 </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdsCardList;

