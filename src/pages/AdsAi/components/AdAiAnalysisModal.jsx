import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sparkles, 
  BrainCircuit, 
  ThumbsUp, 
  AlertTriangle, 
  Lightbulb, 
  MessageSquarePlus, 
  MousePointerClick,
  Tags,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useCampaignsStore } from '../store/useCampaignsStore';
import { useParams } from 'react-router-dom';

export function AdAiAnalysisModal({ isOpen, onClose, adId }) {
  const { date, analyzeAdGroupAds } = useCampaignsStore();
  const { adGroupId } = useParams();
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const result = await analyzeAdGroupAds({
        startDate: date.from,
        endDate: date.to,
        adGroupId: adGroupId
      });
      setAnalysisData(result);
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // מציאת הניתוח הספציפי למודעה אם יש כזה
  // אנחנו מתעדפים את הניתוח של ה-AI שנמצא תחת analysis.ads
  const adsArray = analysisData?.analysis?.ads || analysisData?.ads || [];
  const currentAdAnalysis = adsArray.find(a => String(a.adId) === String(adId)) || adsArray[0];

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden" dir="rtl">
        <DialogHeader className="p-6 bg-primary/5 border-b shrink-0 text-right">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BrainCircuit className="size-6 text-primary" />
            </div>
            <div className="text-right">
              <DialogTitle className="text-xl text-right">ניתוח מודעה מבוסס AI</DialogTitle>
              <DialogDescription className="text-right">ה-AI ינתח את ביצועי המודעה ויתן המלצות לשיפור</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[65vh] w-full" viewportClassName="p-6 text-right" dir="rtl">
          <div className="w-full text-right" dir="rtl">
            {!analysisData && !loading ? (
              <div className="py-20 text-center space-y-4">
                <div className="mx-auto size-16 bg-muted rounded-full flex items-center justify-center">
                  <Sparkles className="size-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-center">מוכן לניתוח חכם?</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto text-center">
                    ה-AI יסרוק את המודעה שלך, יבדוק את הביצועים ויציע כותרות ותיאורים חדשים שיכולים להגדיל את אחוז ההקלקות.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button onClick={runAnalysis} size="lg" className="gap-2">
                    <BrainCircuit className="size-5" />
                    הפעל ניתוח AI עכשיו
                  </Button>
                </div>
              </div>
            ) : loading ? (
              <div className="py-20 text-center space-y-4">
                <Loader2 className="size-12 animate-spin text-primary mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold text-center">ה-AI מנתח את המודעות שלך...</h3>
                  <p className="text-sm text-muted-foreground italic text-center">זה עשוי לקחת כמה שניות, אנחנו שואלים את ChatGPT</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right w-full">
                {/* Header Analysis */}
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-card border rounded-xl p-6 shadow-sm w-full">
                  <div className="space-y-3 flex-1 text-right">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getScoreColor(currentAdAnalysis?.score)}>
                        ציון AI: {currentAdAnalysis?.score}/10
                      </Badge>
                    </div>
                    <h3 className="font-bold text-xl leading-tight text-primary text-right">סיכום הניתוח</h3>
                    <p className="text-muted-foreground italic leading-relaxed text-right">
                      "{currentAdAnalysis?.rationale}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 shrink-0 w-full md:w-auto">
                     <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-100">
                        <ThumbsUp className="size-4" />
                        <span className="text-xs font-bold">{currentAdAnalysis?.strengths?.length || 0} נקודות חוזקה</span>
                     </div>
                     <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-100">
                        <AlertTriangle className="size-4" />
                        <span className="text-xs font-bold">{currentAdAnalysis?.issues?.length || 0} נקודות לשיפור</span>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Strengths */}
                  <div className="space-y-4 text-right">
                    <div className="flex items-center gap-2 font-bold text-green-700">
                      <CheckCircle2 className="size-5" />
                      <span>חוזקות המודעה</span>
                    </div>
                    <div className="space-y-2">
                      {currentAdAnalysis?.strengths?.map((item, i) => (
                        <div key={i} className="p-3 bg-green-50/50 border border-green-100 rounded-lg text-sm text-right">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Issues */}
                  <div className="space-y-4 text-right">
                    <div className="flex items-center gap-2 font-bold text-red-700">
                      <AlertTriangle className="size-5" />
                      <span>בעיות שנמצאו</span>
                    </div>
                    <div className="space-y-2">
                      {currentAdAnalysis?.issues?.map((item, i) => (
                        <div key={i} className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-sm text-right">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ideas Section */}
                <div className="space-y-6 pt-4 border-t text-right w-full">
                  <div className="flex items-center gap-2 font-bold text-lg text-primary">
                    <Lightbulb className="size-6 text-yellow-500" />
                    <span>הצעות ורעיונות לשדרוג</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {/* Headline Ideas */}
                    <div className="space-y-3 text-right">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        <Tags className="size-4" />
                        כותרות חדשות מומלצות
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentAdAnalysis?.headlineIdeas?.map((item, i) => (
                          <div key={i} className="px-3 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-medium text-right">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description Ideas */}
                    <div className="space-y-3 text-right">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        <MessageSquarePlus className="size-4" />
                        תיאורים חדשים מומלצים
                      </div>
                      <div className="space-y-2">
                        {currentAdAnalysis?.descriptionIdeas?.map((item, i) => (
                          <div key={i} className="p-3 bg-muted/50 border rounded-lg text-xs italic text-right leading-relaxed">
                            "{item}"
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Ideas */}
                    <div className="space-y-3 text-right">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        <MousePointerClick className="size-4" />
                        הנעה לפעולה (CTA)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentAdAnalysis?.ctaIdeas?.map((item, i) => (
                          <Badge key={i} variant="secondary" className="px-3 py-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Keyword Suggestions */}
                    <div className="space-y-3 text-right">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        <Sparkles className="size-4 text-primary" />
                        מילות מפתח נוספות
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentAdAnalysis?.keywordSuggestions?.map((item, i) => (
                          <Badge key={i} variant="outline" className="bg-primary/5">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-muted/20 border-t flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">סגור</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

