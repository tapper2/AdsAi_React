'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogBody,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { analyzeKeywordOpportunities, analyzeNegativeOpportunities } from '../services/aiInsightsService';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export function AiInsightsModal({ isOpen, onClose, searchTerms, currentKeywords }) {
  const [isAnalyzing, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const runAnalysis = () => {
    setIsLoading(true);
    // סימולציה של עיבוד AI קצר
    setTimeout(() => {
      const opportunities = analyzeKeywordOpportunities(searchTerms, currentKeywords);
      const negativeOpportunities = analyzeNegativeOpportunities(searchTerms);
      
      setResults({
        opportunities,
        negativeOpportunities,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    setResults(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary animate-pulse" />
            <DialogTitle>ניתוח תובנות AI לקמפיין</DialogTitle>
          </div>
          <DialogDescription>
            המערכת תנתח את מונחי החיפוש האמיתיים של הגולשים ותציע שיפורים.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          {!results ? (
            <div className="py-10 text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full w-fit mx-auto">
                <Sparkles className="size-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">מוכן להתחיל בניתוח?</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                אנחנו נשווה בין מה שאנשים חיפשו בפועל לבין מילות המפתח שהגדרת, כדי למצוא "מכרות זהב" של המרות ובזבוזי תקציב.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {/* הזדמנויות למילות מפתח */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <TrendingUp className="size-5" />
                    <h4>הזדמנויות צמיחה (מילים חדשות)</h4>
                  </div>
                  {results.opportunities.length > 0 ? (
                    <div className="grid gap-3">
                      {results.opportunities.map((opt, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30">
                          <div>
                            <div className="font-medium text-lg">{opt.text}</div>
                            <div className="text-xs text-muted-foreground">קבוצה: {opt.ad_group}</div>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                              {opt.reason}
                            </Badge>
                            <div className="text-xs font-mono">{opt.conversions} המרות | {opt.ctr.toFixed(1)}% CTR</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">לא נמצאו מילים חדשות מומלצות כרגע.</p>
                  )}
                </section>

                {/* מילים שליליות מומלצות */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <AlertTriangle className="size-5" />
                    <h4>בזבוז תקציב (מילים שליליות מומלצות)</h4>
                  </div>
                  {results.negativeOpportunities.length > 0 ? (
                    <div className="grid gap-3">
                      {results.negativeOpportunities.map((opt, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30">
                          <div>
                            <div className="font-medium text-lg">{opt.text}</div>
                            <div className="text-xs text-muted-foreground">קבוצה: {opt.ad_group}</div>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                              ₪{opt.cost.toFixed(0)} בוזבזו
                            </Badge>
                            <div className="text-xs font-mono">{opt.impressions} חשיפות | 0 המרות</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">אין מילים שנראות כבזבוז תקציב מובהק כרגע.</p>
                  )}
                </section>
              </div>
            </ScrollArea>
          )}
        </DialogBody>

        <DialogFooter>
          {!results ? (
            <>
              <Button variant="ghost" onClick={handleClose}>ביטול</Button>
              <Button onClick={runAnalysis} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Sparkles className="size-4 mr-2 animate-spin" />
                    מנתח נתונים...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2" />
                    הפעל ניתוח AI
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="flex w-full justify-between items-center">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="size-3 text-green-500" />
                הניתוח הושלם בהצלחה
              </p>
              <Button onClick={handleClose}>סגור</Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

