import { Fragment } from 'react';
import { Container } from '@/components/common/container';
import { CampaignsContent } from './components/card';

export function Campain() {
  return (
    <div className="p-5">
      <Fragment>
        <Container>
          <CampaignsContent mode="list" />
        </Container>
      </Fragment>
    </div>
  );
}
