import { addDays, subDays, format } from 'date-fns';
import { create } from 'zustand';
import axios from 'axios';
import { APP_SETTINGS } from '@/config/settings.config';

const statusNames = {
  0: 'לא הוגדר סטטוס',
  1: 'סטטוס לא ידוע',
  2: 'פעיל',
  3: 'מושהה',
  4: 'נמחק',
};

const mapCampaignStatus = (campaigns) => {
  if (!Array.isArray(campaigns)) return [];
  return campaigns.map((item) => ({
    ...item,
    campaign: {
      ...item.campaign,
      statusName: statusNames[item.campaign?.status] || 'לא ידוע',
    },
  }));
};

export const useCampaignsStore = create((set) => ({
  date: { from: subDays(new Date(), 3000), to: addDays(new Date(), 0) },
  campaigns: [],
  campaignsData: [],
  loading: false,
  error: null,
  setDate: (date) => set({ date }),
  setFromDate: (from) => set((state) => ({ date: { ...state.date, from } })),
  setToDate: (to) => set((state) => ({ date: { ...state.date, to } })),
  fetchCampaigns: async (startDate, endDate) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}allCampaigns`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      });
      
      const mappedData = mapCampaignStatus(response.data);
      set({ campaigns: mappedData, loading: false });
      console.log("RES mapped: ", mappedData)
      return mappedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },
  fetchCampaignsData: async (startDate, endDate) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}campaignData`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      });

      const mappedData = mapCampaignStatus(response.data);
      set({ campaignsData: mappedData, loading: false });
      console.log("RES mapped: ", mappedData)
      return mappedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },
}));
