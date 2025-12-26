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
} from 'lucide-react';
import { useParams } from 'react-router-dom';
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
import { useCampaignsStore } from '../store/useCampaignsStore';

import { mapCampaignsWithStatus } from '../services/campaignService';

export function SingleCampain() {
  const { name, id } = useParams();
  const { date, getCampainById, fetchSearchTerms, fetchKeywords, fetchNegativeKeywords } = useCampaignsStore();
  const [singleData, setSingleData] = useState([]);
  const [searchTermsData, setSearchTermsData] = useState([]);
  const [keywordsData, setKeywordsData] = useState([]);
  const [negativeKeywordsData, setNegativeKeywordsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [negativeLoading, setNegativeLoading] = useState(false);

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
    }
  }, [id, date.from, date.to, getCampainById]);

  useEffect(() => {
    if (id && name === 'keyWords') {
      setSearchLoading(true);
      fetchSearchTerms({
        startDate: date.from,
        endDate: date.to,
        campaignId: id,
      })
        .then((data) => {
          setSearchTermsData(data);
          setSearchLoading(false);
        })
        .catch(() => setSearchLoading(false));
    }
  }, [id, name, date.from, date.to, fetchSearchTerms]);

  useEffect(() => {
    if (id && name === 'searchWords') {
      setKeywordsLoading(true);
      fetchKeywords({
        startDate: date.from,
        endDate: date.to,
        campaignId: id,
      })
        .then((data) => {
          const mappedData = mapCampaignsWithStatus(data, 'ad_group_criterion');
          setKeywordsData(mappedData);
          setKeywordsLoading(false);
        })
        .catch(() => setKeywordsLoading(false));
    }
  }, [id, name, date.from, date.to, fetchKeywords]);

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

        {loading || searchLoading || keywordsLoading || negativeLoading ? (
          <div className="py-10 text-center">טוען נתונים...</div>
        ) : (
          <>
            {name == 'ads' && <CampainTable data={singleData} />}
            {name == 'keyWords' && <SearchTermsTable data={searchTermsData} />}
            {name == 'searchWords' && <KeywordsTable data={keywordsData} />}
            {name == 'negativeWords' && <NegativeKeywordsTable data={negativeKeywordsData} />}
          </>
        )}
      </Container>
    </div>
  );
}
