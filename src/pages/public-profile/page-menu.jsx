import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';
import GroupConfig from '../../config/groups.config';

const PageMenu = () => {
  //const accountMenuConfig = MENU_SIDEBAR?.['2']?.children;
  const accountMenuConfig = GroupConfig;
  if (accountMenuConfig) {
    return <NavbarMenu items={accountMenuConfig} />;
  } else {
    return <></>;
  }
};

export { PageMenu };
