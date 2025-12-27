import { Fragment, useEffect, useState, useMemo } from 'react';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import {
  EllipsisVertical,
  Luggage,
  Mail,
  MapPin,
  ChartLine,
  ChartBar,
  ChartPie,
  MessagesSquare,
  Users,
  ArrowRight
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { DropdownMenuAds } from './components/dropdown-menu';
import { CampainNavBarTitles } from './components/campainNavBarTitles';
import { Statistics } from './components/statistics';
import { CampainStatisticQuebs } from './components/campainStatisticQuebs';
import { CampainTitleHeader } from './components/campainTitleHeader';
import { ClicksTable } from '../components/tables/clicksTable';
import { GroupData } from './data/AdsGroupData';
import CampainKeyWords from './data/campainKeyWords';
import CampainTable from '../components/tables/campainTable';
import SearchTermsTable from '../components/tables/SearchTermsTable';
import KeywordsTable from '../components/tables/KeywordsTable';
import NegativeKeywordsTable from '../components/tables/NegativeKeywordsTable';
import { AiInsightsModal } from '../components/AiInsightsModal';
import { useCampaignsStore } from '../store/useCampaignsStore';
import { Sparkles } from 'lucide-react';

import { mapCampaignsWithStatus } from '../services/campaignService';

export function SingleCampain() {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const { date, getCampainById, fetchSearchTerms, fetchKeywords, fetchNegativeKeywords } = useCampaignsStore();
  const [singleData, setSingleData] = useState([]);
  const [searchTermsData, setSearchTermsData] = useState([]);
  const [keywordsData, setKeywordsData] = useState([]);
  const [negativeKeywordsData, setNegativeKeywordsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [negativeLoading, setNegativeLoading] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCampainById({
        startDate: date.from,
        endDate: date.to,
        campaignId: id,
      })
        .then((data) => {
          // מפה את הסטטוסים עבור ad_group
          const mappedData = mapCampaignsWithStatus(data, 'ad_group');
          setSingleData(mappedData);
          setLoading(false);
        })
        .catch(() => setLoading(false));

      // טעינת נתונים ל-AI ברקע
      fetchSearchTerms({ startDate: date.from, endDate: date.to, campaignId: id })
        .then(setSearchTermsData);
      fetchKeywords({ startDate: date.from, endDate: date.to, campaignId: id })
        .then(data => setKeywordsData(mapCampaignsWithStatus(data, 'ad_group_criterion')));
    }
  }, [id, date.from, date.to, getCampainById, fetchSearchTerms, fetchKeywords]);

  useEffect(() => {
    if (id && name === 'negativeWords') {
      setNegativeLoading(true);
      fetchNegativeKeywords({
        campaignId: id,
      })
        .then((data) => {
          const mappedData = mapCampaignsWithStatus(data, 'campaign_criterion');
          setNegativeKeywordsData(mappedData);
          setNegativeLoading(false);
        })
        .catch(() => setNegativeLoading(false));
    }
  }, [id, name, fetchNegativeKeywords]);

  const headerInfo = useMemo(() => {
    if (!singleData || singleData.length === 0) return [];
    
    // This assumes singleData is an array of ad groups or similar for one campaign
    // Or maybe it's just one item. Let's assume it's like the campaigns list but for one ID.
    const campaign = singleData[0]?.campaign || {};
    const metrics = singleData[0]?.metrics || {};
    
    return [
      { label: `${singleData.length} קבוצות מודעות`, icon: ChartLine },
      { label: `${metrics.conversions || 0} המרות`, icon: ChartBar },
      { label: `סטטוס ${campaign.statusName || 'לא ידוע'}`, icon: ChartPie },
    ];
  }, [singleData]);

  return (
    <div className="py-0 px-5">
      {/* //*************************
         קריאה לכותרת שם הקמפיין
       **************************** */}

      <CampainTitleHeader
        name={singleData?.[0]?.campaign?.name || (loading ? "טוען נתונים..." : "קמפיין")}
        info={headerInfo}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/campain')}
          className="ml-2"
        >
          <ArrowRight className="size-4 ml-2" />
          חזרה לעמוד קמפיינים
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

        {/* //*************************
        קוביות סטטיסטיקה     
       **************************** */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-6 gap-5 lg:gap-7.5 h-full items-stretch">
            <CampainStatisticQuebs />
          </div>
        </div>

        {/* //*************************
       בר תפריטים         
          config/groups.config.js
       **************************** */}
        <div className="mt-[20px]">
          <Navbar>
            <CampainNavBarTitles />
          </Navbar>
        </div>

        {loading ? (
          <div className="py-10 text-center">טוען נתונים...</div>
        ) : (
          <>
            {name == 'ads' && <CampainTable data={singleData} />}
            {name == 'keyWords' && <SearchTermsTable data={searchTermsData} />}
            {name == 'searchWords' && <KeywordsTable data={keywordsData} />}
            {name == 'negativeWords' && (
              negativeLoading ? <div className="py-10 text-center">טוען מילים שליליות...</div> : <NegativeKeywordsTable data={negativeKeywordsData} />
            )}
          </>
        )}
      </Container>
    </div>
  );
}
