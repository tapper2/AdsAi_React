import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { useParams } from 'react-router-dom';

const AdGroupNavBarTitles = () => {
  const { campaignId, adGroupId } = useParams();

  const AdGroupNavBarTitlesData = [
    { title: 'מילות מפתח', path: `/singleAdGroup/keyWords/${campaignId}/${adGroupId}` },
    { title: 'מונחי חיפוש', path: `/singleAdGroup/searchWords/${campaignId}/${adGroupId}` },
    { title: 'מילים שליליות', path: `/singleAdGroup/negativeWords/${campaignId}/${adGroupId}` },
  ];

  if (AdGroupNavBarTitlesData && adGroupId) {
    return <NavbarMenu items={AdGroupNavBarTitlesData} />;
  } else {
    return <></>;
  }
};
export { AdGroupNavBarTitles };

