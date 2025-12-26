import { Fragment, useEffect, useMemo } from 'react';
import { PageNavbar } from '@/pages/account';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { ChartBar, ChartLine, ChartPie, Trash2, PauseCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
// import campainsJson from '../../../data/campains_json';
import { CampainTitleHeader } from '../components/campainTitleHeader';
import { StatisticQuebs } from '../components/statisticQuebs';
import CampainsTable from '../components/tables/campainsTable';
//import { AccountTeamMembersContent } from '.';
import { CampaignsContent } from './components/card';
import { useCampaignsStore } from '../store/useCampaignsStore';

export function Campain() {
  const { settings } = useSettings();
  const { campaigns, fetchCampaigns, fetchCampaignsData, loading, date } = useCampaignsStore();

  useEffect(() => {
    // קוראים לפונקציות מהסטור ללא השמה למשתנה מקומי שמסתיר את הסטייט
    fetchCampaigns(date.from, date.to);
    fetchCampaignsData(date.from, date.to);
  }, [fetchCampaigns, fetchCampaignsData, date.from, date.to]);

  const campaignStats = useMemo(() => {
    const total = campaigns?.length || 0;
    const active = campaigns?.filter(c => c.campaign?.status === 2).length || 0;
    const paused = campaigns?.filter(c => c.campaign?.status === 3).length || 0;
    const removed = campaigns?.filter(c => c.campaign?.status === 4).length || 0;

    return { total, active, paused, removed };
  }, [campaigns]);

  //console.log('JSON : ', campainsJson);
  return (
    <div className="py-0 px-5">
      {/* //*************************
               קריאה לכותרת שם הקמפיין
             **************************** */}

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
        {/* //*************************
              קוביות סטטיסטיקה     
             **************************** */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-6 gap-5 lg:gap-7.5 h-full items-stretch">
            <StatisticQuebs />
          </div>
        </div>
        <div className="mt-[20px]">
          {loading ? <div>טוען נתונים...</div> : <CampainsTable data={campaigns} />}
        </div>
      </Container>
    </div>
  );
}
