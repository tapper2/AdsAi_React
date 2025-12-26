export const statusNames = {
  0: 'לא הוגדר סטטוס',
  1: 'סטטוס לא ידוע',
  2: 'פעיל',
  3: 'מושהה',
  4: 'נמחק',
};

/**
 * מומר מזהה סטטוס לשם סטטוס בעברית
 * @param {number|string} statusId 
 * @returns {string}
 */
export const getStatusName = (statusId) => {
  return statusNames[statusId] || 'לא ידוע';
};

/**
 * ממפה נתוני קמפיינים ומוסיף להם statusName
 * @param {Array} data 
 * @param {string} campaignKey - המפתח שבו נמצא אובייקט הקמפיין (ברירת מחדל: 'campaign')
 * @returns {Array}
 */
export const mapCampaignsWithStatus = (data, campaignKey = 'campaign') => {
  const items = Array.isArray(data) ? data : (data?.data || []);
  
  return items.map((item) => {
    const campaign = item[campaignKey];
    if (!campaign) return item;
    
    return {
      ...item,
      [campaignKey]: {
        ...campaign,
        statusName: getStatusName(campaign.status),
      },
    };
  });
};

