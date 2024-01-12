import { DiscussStackScreen } from "./screens/discuss/index";
import { Discover } from "./screens/discover/index";

export enum RouteNames {
  DISCUSS = "Discuss",
  DISCOVER = "Discover",
};

export const screens = [
  {
    name: RouteNames.DISCUSS,
    component: DiscussStackScreen,
  },
  {
    name: RouteNames.DISCOVER,
    component: Discover,
  }
]

export enum CategoryNames {
  HOME = "Home",
  // AAA = "Aaa",
  // BBB = "Bbb",
  AI = 'AI',
  ENGINEERING = 'Engineering',
  OPERATIONS = 'Operations',
  MARKETING = 'Marketing',
  SALES = 'Sales',
  CUSTOMER_SUCCESS = 'Customer Success',
  DATA = 'Data',
  PRODUCT = 'Product',
  HR_AND_TALENT = 'HR & Talent',
  FINANCE = 'Finance',
  LEADERHIP_EXEC = 'Leadership/Exec',
  FOUNDER = 'Founder',
  INVESTOR_VC = 'Investor/VC',
};

export const categories = [
  {
    name: CategoryNames.HOME,
  },
  {
    name: CategoryNames.ENGINEERING,
  },
  {
    name: CategoryNames.OPERATIONS,
  },
  {
    name: CategoryNames.MARKETING,
  },
  {
    name: CategoryNames.SALES,
  },
  {
    name: CategoryNames.CUSTOMER_SUCCESS,
  },
  {
    name: CategoryNames.DATA,
  },
  {
    name: CategoryNames.PRODUCT,
  },
  {
    name: CategoryNames.HR_AND_TALENT,
  },
  {
    name: CategoryNames.FINANCE,
  },
  {
    name: CategoryNames.LEADERHIP_EXEC,
  },
  {
    name: CategoryNames.FOUNDER,
  },
  {
    name: CategoryNames.INVESTOR_VC,
  },
];

export const INPUT_PLACEHOLDER = 'Share your SaaS experiences with the community';


