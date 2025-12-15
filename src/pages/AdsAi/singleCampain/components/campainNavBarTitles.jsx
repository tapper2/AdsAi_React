import { NavbarMenu } from '@/partials/navbar/navbar-menu';

const CampainNavBarTitles = () => {

  const CampainNavBarTitlesData = [
    { title: 'קמפיינים', path: '/singleCampain/ads' },
    { title: 'קליקים', path: '/singleCampain/clicks' },
    { title: 'מילות חיפוש', path: '/public-profile/works' },
    { title: 'מילים שליליות', path: '/public-profile/teams' },
    { title: 'מונחי חיפוש', path: '/public-profile/network' },
    { title: 'מודעות', path: '/public-profile/activity' },
  ];

  if (CampainNavBarTitlesData) {
    return <NavbarMenu items={CampainNavBarTitlesData} />;
  } else {
    return <></>;
  }
};

export { CampainNavBarTitles };
