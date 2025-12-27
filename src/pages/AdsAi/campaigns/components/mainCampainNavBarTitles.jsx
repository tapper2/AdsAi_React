import { NavbarMenu } from '@/partials/navbar/navbar-menu';

const MainCampainNavBarTitles = () => {
  const MainCampainNavBarTitlesData = [
    { title: 'קמפיינים', path: '/campain/list' },
    { title: 'קבוצות מודעות', path: '/campain/adGroups' },
    { title: 'מילות מפתח', path: '/campain/keyWords' },
    { title: 'מונחי חיפוש', path: '/campain/searchWords' },
    { title: 'מילים שליליות', path: '/campain/negativeWords' },
  ];

  return <NavbarMenu items={MainCampainNavBarTitlesData} />;
};
export { MainCampainNavBarTitles };

