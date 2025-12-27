import { Fragment, useEffect, useState, useMemo } from 'react';
import { Navbar } from '@/partials/navbar/navbar';
import {
  ChartLine,
  ChartBar,
  ChartPie,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { AdGroupNavBarTitles } from './components/adGroupNavBarTitles';
import { AdGroupStatisticQuebs } from './components/adGroupStatisticQuebs';
import { CampainTitleHeader } from '../components/campainTitleHeader';
import SearchTermsTable from '../components/tables/SearchTermsTable';
import KeywordsTable from '../components/tables/KeywordsTable';
import NegativeKeywordsTable from '../components/tables/NegativeKeywordsTable';
import AdsCardList from '../components/tables/AdsCardList';
import { AiInsightsModal } from '../components/AiInsightsModal';
import { useCampaignsStore } from '../store/useCampaignsStore';
import { mapCampaignsWithStatus } from '../services/campaignService';

export function SingleAdGroup() {
  const { name, campaignId, adGroupId } = useParams();
  const navigate = useNavigate();
  const { 
    date, 
    fetchAdGroupKeywords, 
    fetchAdGroupSearchTerms, 
    fetchAdGroupNegativeKeywords,
    fetchAdGroupAds,
    getAdGroupInfoById
  } = useCampaignsStore();

  const [adGroupInfo, setAdGroupInfo] = useState(null);
  const [keywordsData, setKeywordsData] = useState([]);
  const [searchTermsData, setSearchTermsData] = useState([]);
  const [negativeKeywordsData, setNegativeKeywordsData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    if (adGroupId) {
      setLoading(true);
      // Fetch Ad Group Info for header
      getAdGroupInfoById({
        startDate: date.from,
        endDate: date.to,
        adGroupId: adGroupId,
      }).then(data => {
        setAdGroupInfo(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      }).catch(() => setLoading(false));

      // Background fetches for tables and AI
      fetchAdGroupKeywords({ startDate: date.from, endDate: date.to, adGroupId })
        .then(data => setKeywordsData(mapCampaignsWithStatus(data, 'ad_group_criterion')));
      
      fetchAdGroupSearchTerms({ startDate: date.from, endDate: date.to, adGroupId })
        .then(setSearchTermsData);
      
      fetchAdGroupNegativeKeywords({ adGroupId })
        .then(data => setNegativeKeywordsData(mapCampaignsWithStatus(data, 'campaign_criterion')));

      fetchAdGroupAds({ startDate: date.from, endDate: date.to, adGroupId })
        .then(data => setAdsData(mapCampaignsWithStatus(data, 'ad_group_ad')));
    }
  }, [adGroupId, date.from, date.to, getAdGroupInfoById, fetchAdGroupKeywords, fetchAdGroupSearchTerms, fetchAdGroupNegativeKeywords, fetchAdGroupAds]);

  const headerInfo = useMemo(() => {
    if (!adGroupInfo) return [];
    const metrics = adGroupInfo.metrics || {};
    const adGroup = adGroupInfo.ad_group || {};
    
    return [
      { label: `${metrics.clicks || 0} קליקים`, icon: ChartLine },
      { label: `${metrics.conversions || 0} המרות`, icon: ChartBar },
      { label: `קבוצה: ${adGroup.name || 'לא ידוע'}`, icon: ChartPie },
    ];
  }, [adGroupInfo]);

  const adGroupName = useMemo(() => {
    const name = adGroupInfo?.ad_group?.name;
    if (name) return `קבוצת מודעות - ${name}`;
    return loading ? "טוען נתונים..." : "קבוצת מודעות";
  }, [adGroupInfo, loading]);

  return (
    <div className="py-0 px-5">
      <CampainTitleHeader
        name={adGroupName}
        info={headerInfo}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/singleCampain/ads/${campaignId}`)}
          className="ml-2"
        >
          <ArrowRight className="size-4 ml-2" />
          חזרה לקמפיין
        </Button>
        <Button 
          variant="primary" 
          size="sm" 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={() => setIsAiModalOpen(true)}
        >
          <Sparkles className="size-4 mr-2" />
          תובנות AI
        </Button>
      </CampainTitleHeader>

      <AiInsightsModal 
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        searchTerms={searchTermsData}
        currentKeywords={keywordsData}
      />

      <Container>
        <div className="lg:col-span-1">
          <div className="grid grid-cols-6 gap-5 lg:gap-7.5 h-full items-stretch">
            <AdGroupStatisticQuebs />
          </div>
        </div>

        <div className="mt-[20px]">
          <Navbar>
            <AdGroupNavBarTitles />
          </Navbar>
        </div>

        {loading ? (
          <div className="py-10 text-center">טוען נתונים...</div>
        ) : (
          <>
            {name === 'keyWords' && <KeywordsTable data={keywordsData} />}
            {name === 'searchWords' && <SearchTermsTable data={searchTermsData} />}
            {name === 'negativeWords' && <NegativeKeywordsTable data={negativeKeywordsData} />}
            {name === 'ads' && <AdsCardList data={adsData} />}
          </>
        )}
      </Container>
    </div>
  );
}

