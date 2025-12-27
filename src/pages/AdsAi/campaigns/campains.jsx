import { Fragment, useEffect, useMemo, useState } from 'react';
import { PageNavbar } from '@/pages/account';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { ChartBar, ChartLine, ChartPie, Trash2, PauseCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { Navbar } from '@/partials/navbar/navbar';
import { CampainTitleHeader } from '../components/campainTitleHeader';
import { StatisticQuebs } from '../components/statisticQuebs';
import CampainsTable from '../components/tables/campainsTable';
import CampainTable from '../components/tables/campainTable';
import KeywordsTable from '../components/tables/KeywordsTable';
import SearchTermsTable from '../components/tables/SearchTermsTable';
import NegativeKeywordsTable from '../components/tables/NegativeKeywordsTable';
import { MainCampainNavBarTitles } from './components/mainCampainNavBarTitles';
import { useCampaignsStore } from '../store/useCampaignsStore';

export function Campain() {
  const { name = 'list' } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { 
    campaigns, 
    fetchCampaigns, 
    fetchCampaignsData, 
    loading, 
    date,
    fetchAllAdGroups,
    fetchAllKeywords,
    fetchAllSearchTerms,
    fetchAllNegativeKeywords
  } = useCampaignsStore();

  const [adGroupsData, setAdGroupsData] = useState([]);
  const [keywordsData, setKeywordsData] = useState([]);
  const [searchTermsData, setSearchTermsData] = useState([]);
  const [negativeKeywordsData, setNegativeKeywordsData] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);

  useEffect(() => {
    fetchCampaigns(date.from, date.to);
    fetchCampaignsData(date.from, date.to);
  }, [fetchCampaigns, fetchCampaignsData, date.from, date.to]);

  useEffect(() => {
    const fetchData = async () => {
      setTabLoading(true);
      try {
        if (name === 'adGroups') {
          const data = await fetchAllAdGroups(date.from, date.to);
          setAdGroupsData(data);
        } else if (name === 'keyWords') {
          const data = await fetchAllKeywords(date.from, date.to);
          setKeywordsData(data);
        } else if (name === 'searchWords') {
          const data = await fetchAllSearchTerms(date.from, date.to);
          setSearchTermsData(data);
        } else if (name === 'negativeWords') {
          const data = await fetchAllNegativeKeywords();
          setNegativeKeywordsData(data);
        }
      } catch (error) {
        console.error("Error fetching tab data:", error);
      } finally {
        setTabLoading(false);
      }
    };

    fetchData();
  }, [name, date.from, date.to, fetchAllAdGroups, fetchAllKeywords, fetchAllSearchTerms, fetchAllNegativeKeywords]);

  const campaignStats = useMemo(() => {
    const total = campaigns?.length || 0;
    const active = campaigns?.filter(c => c.campaign?.status === 2).length || 0;
    const paused = campaigns?.filter(c => c.campaign?.status === 3).length || 0;
    const removed = campaigns?.filter(c => c.campaign?.status === 4).length || 0;

    return { total, active, paused, removed };
  }, [campaigns]);

  return (
    <div className="py-0 px-5">
      <CampainTitleHeader
        name="רשימת קמפיינים"
        info={[
          { label: `${campaignStats.total} קמפיינים`, icon: ChartLine },
          { label: `${campaignStats.active} פעילים`, icon: ChartBar },
          { label: `${campaignStats.paused} מושהים`, icon: PauseCircle },
          { label: `${campaignStats.removed} נמחקו`, icon: Trash2 },
        ]}
      />

      <Container>
        <div className="lg:col-span-1">
          <div className="grid grid-cols-6 gap-5 lg:gap-7.5 h-full items-stretch">
            <StatisticQuebs />
          </div>
        </div>

        <div className="mt-[20px]">
          <Navbar>
            <MainCampainNavBarTitles />
          </Navbar>
        </div>

        <div className="mt-[20px]">
          {tabLoading || loading ? (
            <div className="py-10 text-center">טוען נתונים...</div>
          ) : (
            <>
              {name === 'list' && <CampainsTable data={campaigns} />}
              {name === 'adGroups' && <CampainTable data={adGroupsData} />}
              {name === 'keyWords' && <KeywordsTable data={keywordsData} />}
              {name === 'searchWords' && <SearchTermsTable data={searchTermsData} />}
              {name === 'negativeWords' && <NegativeKeywordsTable data={negativeKeywordsData} />}
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
