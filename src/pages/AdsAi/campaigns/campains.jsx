import { Fragment } from 'react';
import { PageNavbar } from '@/pages/account';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { Link } from 'react-router';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import campainsJson from '../../../data/campains_json';
import CampainsTable from '../components/tables/campainsTable';
//import { AccountTeamMembersContent } from '.';
import { CampaignsContent } from './components/card';

export function Campain() {
  const { settings } = useSettings();
  console.log('JSON : ', campainsJson);
  return (
    <div className="p-5">
      <Fragment>
        <PageNavbar />
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle text="רשימת כל הקמפיינים" />
              <ToolbarDescription>
                Overview of all team members and roles.
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">
                <Link to="#">Import Members</Link>
              </Button>
              <Button>
                <Link to="#">Add Member</Link>
              </Button>
            </ToolbarActions>
          </Toolbar>
        </Container>

        <Container>
          <CampainsTable data={campainsJson} />
        </Container>
      </Fragment>
      {/* <Fragment>
        <Container>
          <CampaignsContent mode="list" />
        </Container>
      </Fragment> */}
    </div>
  );
}
