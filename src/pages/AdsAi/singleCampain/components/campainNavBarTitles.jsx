import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { useParams } from 'react-router-dom';

const CampainNavBarTitles = () => {
  const { id } = useParams();

  const CampainNavBarTitlesData = [
    { title: 'קבוצות מודעות', path: `/singleCampain/ads/${id}` },
    { title: 'מילות מפתח', path: `/singleCampain/searchWords/${id}` },
    { title: 'מילות חיפוש', path: `/singleCampain/keyWords/${id}` },
    { title: 'מילים שליליות', path: `/singleCampain/negativeWords/${id}` },
    // { title: 'מונחי חיפוש', path: `/singleCampain/network/${id}` },
    // { title: 'מודעות', path: `/singleCampain/activity/${id}` },
  ];

  if (CampainNavBarTitlesData && id) {
    return <NavbarMenu items={CampainNavBarTitlesData} />;
  } else {
    return <></>;
  }
};

export { CampainNavBarTitles };
