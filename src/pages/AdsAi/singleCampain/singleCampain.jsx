import { Fragment } from 'react';
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
import CampainTable from '../components/tables/campainTable'


export function SingleCampain() {
  const { name } = useParams();
  return (
    <div className="py-0 px-5">
      {/* //*************************
         קריאה לכותרת שם הקמפיין
       **************************** */}

      <CampainTitleHeader
        name="קמפיין חדש לעוד מיסוי מקרקעין ומס שבח"
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

        {name == 'ads' && <CampainTable data={GroupData} />}
        {name == 'clicks' && <ClicksTable data={CampainKeyWords} />}
      </Container>
    </div>
  );
}
