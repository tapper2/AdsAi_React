import { Fragment, useEffect } from 'react';
import { PageNavbar } from '@/pages/account';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { ChartBar, ChartLine, ChartPie } from 'lucide-react';
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
  const { campaigns, fetchCampaigns,fetchCampaignsData, loading, date } = useCampaignsStore();

  useEffect(() => {
    let campaigns = fetchCampaigns(date.from, date.to);
    let campaignsData = fetchCampaignsData(date.from, date.to);
    console.log("CAMPAIGNS : ", campaigns );
    console.log("CAMPAIGNS DATA : ", campaignsData );
    console.log("CAMPAIGNS : ", campaigns );
  }, [fetchCampaigns,fetchCampaignsData, date.from, date.to ]);

  //console.log('JSON : ', campainsJson);
  return (
    <div className="py-0 px-5">
      {/* //*************************
               קריאה לכותרת שם הקמפיין
             **************************** */}

      <CampainTitleHeader
        name="רשימת קמפיינים"
        info={[
          { label: '5 קבוצות מודעות', icon: ChartLine },
          { label: '78 המרות', icon: ChartBar },
          { label: 'סטטוס פעיל', icon: ChartPie },
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
