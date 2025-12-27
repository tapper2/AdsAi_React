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
 * @param {Array|Object} data 
 * @param {string} campaignKey - המפתח שבו נמצא אובייקט הקמפיין (ברירת מחדל: 'campaign')
 * @returns {Array}
 */
export const mapCampaignsWithStatus = (data, campaignKey = 'campaign') => {
  let items = [];
  
  if (Array.isArray(data)) {
    items = data;
  } else if (data?.data) {
    items = data.data;
  } else if (data?.results) {
    items = data.results;
  } else if (data && typeof data === 'object' && (data[campaignKey] || data.metrics)) {
    // אם זה אובייקט בודד שמכיל את המפתח המבוקש או מטריקות, נעטוף אותו במערך
    items = [data];
  }
  
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

