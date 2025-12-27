/**
 * שירות לניתוח תובנות AI מבוסס נתוני הקמפיין
 */

/**
 * מנתח הזדמנויות למילות מפתח חדשות מתוך מונחי החיפוש
 * @param {Array} searchTerms - מונחי החיפוש בפועל מה-API
 * @param {Array} currentKeywords - מילות המפתח המוגדרות כיום
 * @returns {Array} - רשימת המלצות למילות מפתח חדשות
 */
export const analyzeKeywordOpportunities = (searchTerms, currentKeywords) => {
  if (!searchTerms || !currentKeywords) return [];

  const existingKeywordsSet = new Set(
    currentKeywords.map(k => k.ad_group_criterion?.keyword?.text?.toLowerCase().trim())
  );

  return searchTerms
    .filter(term => {
      const text = term.search_term_view?.search_term?.toLowerCase().trim();
      const metrics = term.metrics || {};
      
      // תנאים למילה "מנצחת":
      // 1. לא קיימת כבר במילות המפתח
      // 2. הביאה לפחות המרה אחת או שיש לה CTR גבוה (מעל 10%)
      const isNew = !existingKeywordsSet.has(text);
      const hasConversions = (metrics.conversions || 0) > 0;
      const highCTR = (metrics.ctr || 0) > 0.1;

      return isNew && (hasConversions || highCTR);
    })
    .map(term => ({
      text: term.search_term_view?.search_term,
      conversions: term.metrics?.conversions || 0,
      ctr: (term.metrics?.ctr || 0) * 100,
      reason: term.metrics?.conversions > 0 ? 'הביא המרות' : 'CTR גבוה במיוחד',
      ad_group: term.ad_group?.name
    }))
    .sort((a, b) => b.conversions - a.conversions);
};

/**
 * מנתח מילים לבזבוז תקציב (מומלצות כשליליות)
 * @param {Array} searchTerms 
 * @returns {Array}
 */
export const analyzeNegativeOpportunities = (searchTerms) => {
  if (!searchTerms) return [];

  return searchTerms
    .filter(term => {
      const metrics = term.metrics || {};
      const cost = (metrics.cost_micros || 0) / 1000000;
      
      // תנאים למילה "בזבזנית":
      // 1. עלתה יותר מ-50 ש"ח
      // 2. אפס המרות
      return cost > 50 && (metrics.conversions || 0) === 0;
    })
    .map(term => ({
      text: term.search_term_view?.search_term,
      cost: (term.metrics?.cost_micros || 0) / 1000000,
      impressions: term.metrics?.impressions || 0,
      reason: 'עלות גבוהה ללא המרות',
      ad_group: term.ad_group?.name
    }))
    .sort((a, b) => b.cost - a.cost);
};

