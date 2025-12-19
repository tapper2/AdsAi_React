//UNSPECIFIED = 0, UNKNOWN = 1, ENABLED = 2, PAUSED = 3 , REMOVED = 4

// metrics.clicks: מספר הקליקים.
// metrics.impressions: מספר החשיפות.
// metrics.cost_micros: העלות הכוללת במיקרו-יחידות.
// metrics.conversions: מספר ההמרות.
// metrics.conversions_value: ערך ההמרות.

const statusNames = {
  1: 'ok',
  2: 'bad',
  3: 'complete',
  4: 'cancel',
};

function addStatusNameToCampaigns(campaigns) {
  return campaigns.map(item => ({
    ...item,
    campaign: {
      ...item.campaign,
      statusName: statusNames[item.campaign.status] || '',
    },
  }));
}

const campainsJson = addStatusNameToCampaigns([
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/23312353667',
      status: 2,
      name: 'קמפיין חדש לעו"ד מיסוי מקרקעין ומס שבח',
      id: 23312353667,
      start_date: '2025-11-29',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 33,
      conversions_value: 0,
      conversions: 1,
      cost_micros: 502330532,
      impressions: 267,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/22117280564',
      status: 3,
      name: 'Lousky youtube',
      id: 22117280564,
      start_date: '2025-01-11',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 67,
      conversions_value: 0,
      conversions: 0,
      cost_micros: 215225754,
      impressions: 24297,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/22097674001',
      status: 4,
      name: 'LOUSKY - מיסוי כללי #2',
      id: 22097674001,
      start_date: '2025-01-06',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 6,
      conversions_value: 0,
      conversions: 4,
      cost_micros: 63797821,
      impressions: 57,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/22044106768',
      status: 3,
      name: 'LOUSKY - מיסוי כללי',
      id: 22044106768,
      start_date: '2024-12-18',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 2182,
      conversions_value: 163.961639861,
      conversions: 114,
      cost_micros: 13410741719,
      impressions: 70308,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/22022071380',
      status: 3,
      name: 'LOUSKY - פינוי בינוי',
      id: 22022071380,
      start_date: '2024-12-14',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 8,
      conversions_value: 0,
      conversions: 0,
      cost_micros: 97170000,
      impressions: 232,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/22028638028',
      status: 3,
      name: 'LOUSKY - מיסוי נדלן',
      id: 22028638028,
      start_date: '2024-12-14',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 1365,
      conversions_value: 0,
      conversions: 70,
      cost_micros: 7553380373,
      impressions: 56320,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/21959158712',
      status: 3,
      name: 'שי פינוי בינוי',
      id: 21959158712,
      start_date: '2024-11-27',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 13,
      conversions_value: 0,
      conversions: 0,
      cost_micros: 129800000,
      impressions: 168,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20974466589',
      status: 3,
      name: 'מתחרים  max clicks 10 (LO 05/02)',
      id: 20974466589,
      start_date: '2024-01-29',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 105,
      conversions_value: 7,
      conversions: 8,
      cost_micros: 979470000,
      impressions: 1190,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20974533786',
      status: 3,
      name: 'Brand max clicks 8 (LO 05/02)',
      id: 20974533786,
      start_date: '2024-01-29',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 125,
      conversions_value: 0,
      conversions: 1,
      cost_micros: 267430000,
      impressions: 381,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20980162526',
      status: 3,
      name: 'עורך דין מיסוי מקרקעין+קומבינציה  max clicks 11 (LO 24/02)',
      id: 20980162526,
      start_date: '2024-01-29',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 840,
      conversions_value: 2,
      conversions: 12,
      cost_micros: 7286048051,
      impressions: 7219,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20980191119',
      status: 4,
      name: 'אתי לוסקי אתר ראשי #2',
      id: 20980191119,
      start_date: '2024-01-29',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 0,
      conversions_value: 0,
      conversions: 0,
      cost_micros: 0,
      impressions: 0,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20984464732',
      status: 4,
      name: 'עורך דין מיסוי מקרקעין #2',
      id: 20984464732,
      start_date: '2024-01-29',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 0,
      conversions_value: 0,
      conversions: 0,
      cost_micros: 0,
      impressions: 0,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20954104305',
      status: 3,
      name: 'עסקת קומבינציה',
      id: 20954104305,
      start_date: '2024-01-20',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 19,
      conversions_value: 0,
      conversions: 0,
      cost_micros: 157690000,
      impressions: 334,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20963760670',
      status: 3,
      name: 'מיסוי מקרקעין',
      id: 20963760670,
      start_date: '2024-01-20',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 50,
      conversions_value: 0,
      conversions: 0,
      cost_micros: 204843210,
      impressions: 797,
    },
  },
  {
    campaign: {
      resource_name: 'customers/9162124601/campaigns/20905088863',
      status: 3,
      name: 'אתי לוסקי אתר ראשי',
      id: 20905088863,
      start_date: '2023-12-28',
      end_date: '2037-12-30',
    },
    metrics: {
      clicks: 129,
      conversions_value: 1,
      conversions: 1,
      cost_micros: 932150000,
      impressions: 2675,
    },
  },
]);

export default campainsJson;
