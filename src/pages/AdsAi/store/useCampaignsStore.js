import { addDays, subDays, format } from 'date-fns';
import { create } from 'zustand';
import axios from 'axios';
import { APP_SETTINGS } from '@/config/settings.config';
import { mapCampaignsWithStatus } from '../services/campaignService';

export const useCampaignsStore = create((set) => ({
  date: { from: subDays(new Date(), 3000), to: addDays(new Date(), 0) },
  campaigns: [],
  campaignsData: [],
  loading: false,
  campaignsLoading: false,
  campaignsDataLoading: false,
  error: null,
  setDate: (date) => set({ date }),
  setFromDate: (from) => set((state) => ({ date: { ...state.date, from } })),
  setToDate: (to) => set((state) => ({ date: { ...state.date, to } })),
  fetchCampaigns: async (startDate, endDate) => {
    set({ campaignsLoading: true, loading: true, error: null });
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}allCampaigns`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      });
      
      const mappedData = mapCampaignsWithStatus(response.data);
      set({ campaigns: mappedData, campaignsLoading: false, loading: false });
      return mappedData;
    } catch (error) {
      set({ error: error.message, campaignsLoading: false, loading: false });
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },
  fetchCampaignsData: async (startDate, endDate) => {
    set({ campaignsDataLoading: true, error: null });
    try {
      console.log("STAT_LOG: Fetching for dates:", startDate, endDate);
      const response = await axios.post(`${APP_SETTINGS.global_url}campaignData`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      });

      console.log("STAT_LOG: RAW Response:", response.data);
      
      set({ campaignsData: response.data, campaignsDataLoading: false });
      return response.data;
    } catch (error) {
      console.error('STAT_LOG: Fetch error:', error);
      set({ error: error.message, campaignsDataLoading: false });
      throw error;
    }
  },
  getCampainById: async ({ startDate, endDate, campaignId }) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}getCampaignById`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
        campaignId,
      });
      const mappedData = mapCampaignsWithStatus(response.data);
      return mappedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching campaign by id:', error);
      throw error;
    }
  },
  getCampaignInfoById: async ({ startDate, endDate, campaignId }) => {
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}getCampaignInfoById`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
        campaignId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching campaign info by id:', error);
      throw error;
    }
  },
  fetchSearchTerms: async ({ startDate, endDate, campaignId }) => {
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}campainListSearchTerms`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
        campaignId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching search terms:', error);
      throw error;
    }
  },
  fetchKeywords: async ({ startDate, endDate, campaignId }) => {
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}campainListKeywords`, {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
        campaignId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching keywords:', error);
      throw error;
    }
  },
  fetchNegativeKeywords: async ({ campaignId }) => {
    try {
      const response = await axios.post(`${APP_SETTINGS.global_url}campainListNegativeKeywords`, {
        campaignId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching negative keywords:', error);
      throw error;
    }
  },
}));
