export enum RouteNames {
  DISCUSS_HOME = "DiscussHome",
  DISCUSS_CREATE_POST = "DiscussCreatePost",
  DISCOVER_HOME = "DiscoverHome",
  DISCOVER_LIST = "DiscoverList",
  DISCOVER_COMPANY_PROFILE = "DiscoverCompanyProfile",
  MARKETPLACE_HOME = "MarketplaceHome",
  BUYER_AI_HOME = "BuyerAIHome",
  BUYER_AI_FOLLOWUP = "BuyerAIFollowup",
  BUYER_AI_MESSENGER = "BuyerAIMessenger",
  PROFILE_USER = "ProfileUser",
  PROFILE_WELCOME = "ProfileWelcome",
  PROFILE_LOGIN = "ProfileLogin",
  PROFILE_CREATE_HOME = "ProfileCreateHome",
  PROFILE_QUESTION = "ProfileQuestion",
};

export const DEFAULT_TAB = "DiscussHome";

export enum CategoryNames {
  HOME = "Home",
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

export enum ToolTypes {
  SALES = 'Sales',
  MARKETING = 'Marketing',
  ANALYTICS_SOFTWARE = 'Analytics Tools & Software',
  CAD_PLM = 'CAD & PLM',
  COLLAB_PRODUCTIVITY = 'Collaboration & Productivity',
  COMMERCE = 'Commerce',
  // TODO add the rest
}

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

export enum CompanyType {
  DATABASE = 'Database',
  ANALYTICS = 'Analytics',
  CLOUD = 'Cloud',
  PERFORMANCE = 'Performance',
};


export const INPUT_PLACEHOLDER = 'Share your SaaS experiences with the community';

export const BUYERAI_PLACEHOLDER = 'Message Buyer AI...';


