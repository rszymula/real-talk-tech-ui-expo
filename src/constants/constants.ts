import DISCUSS from  '../assets/discuss.png';
import DISCOVER from '../assets/discover.png';
import MARKETPLACE from '../assets/marketplace.png';
import DISCUSS_ACTIVE from  '../assets/discuss_active.png';
import DISCOVER_ACTIVE from '../assets/discover_active.png';
import MARKETPLACE_ACTIVE from '../assets/marketplace_active.png';

export enum RouteNames {
  DISCUSS_HOME = "DiscussHome",
  DISCUSS_POST_DETAIL = "DiscussPostDetail",
  DISCUSS_CREATE_POST = "DiscussCreatePost",
  DISCOVER_HOME = "DiscoverHome",
  DISCOVER_LIST = "DiscoverList",
  DISCOVER_VENDOR_DETAILS = "DiscoverVendorDetails",
  MARKETPLACE_HOME = "MarketplaceHome",
  BUYER_AI_HOME = "BuyerAIHome",
  BUYER_AI_FOLLOWUP = "BuyerAIFollowup",
  BUYER_AI_MESSENGER = "BuyerAIMessenger",
  PROFILE_USER = "ProfileUser",
  PROFILE_USER_OTHER = "ProfileUserOther",
  PROFILE_WELCOME = "ProfileWelcome",
  PROFILE_LOGIN = "ProfileLogin",
  PROFILE_CREATE_HOME = "ProfileCreateHome",
  PROFILE_QUESTION = "ProfileQuestion",
  PROFILE_CONTACT_US = "ProfileContactUs",
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
  COMMUNITY = 'Community',
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
    id: 0,
    name: CategoryNames.HOME,
  },
  {
    id: 1,
    name: CategoryNames.AI,
  },
  {
    id: 2,
    name: CategoryNames.ENGINEERING,
  },
  {
    id: 3,
    name: CategoryNames.OPERATIONS,
  },
  {
    id: 4,
    name: CategoryNames.MARKETING,
  },
  {
    id: 5,
    name: CategoryNames.SALES,
  },
  {
    id: 6,
    name: CategoryNames.CUSTOMER_SUCCESS,
  },
  {
    id: 7,
    name: CategoryNames.DATA,
  },
  {
    id: 8,
    name: CategoryNames.PRODUCT,
  },
  {
    id: 9,
    name: CategoryNames.HR_AND_TALENT,
  },
  {
    id: 10,
    name: CategoryNames.FINANCE,
  },
  {
    id: 11,
    name: CategoryNames.LEADERHIP_EXEC,
  },
  {
    id: 12,
    name: CategoryNames.FOUNDER,
  },
  {
    id: 13,
    name: CategoryNames.COMMUNITY,
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

export const POSTS_COUNT_PER_PAGE = 3;
export const COMMENTS_COUNT_PER_PAGE = 2;

export const tabs = [
  {
    routeName: RouteNames.DISCUSS_HOME,
    title: "Discuss",
    icon: DISCUSS,
    iconActive: DISCUSS_ACTIVE,
  },
  {
    routeName: RouteNames.DISCOVER_HOME,
    title: "Discover",
    icon: DISCOVER,
    iconActive: DISCOVER_ACTIVE,
  },
  {
    routeName: RouteNames.MARKETPLACE_HOME,
    title: "Marketplace",
    icon: MARKETPLACE,
    iconActive: MARKETPLACE_ACTIVE,
  },
  // {
  //   routeName: RouteNames.BUYER_AI_HOME,
  //   title: "Buyer AI",
  //   icon: DISCUSS,
  //   iconActive: DISCUSS_ACTIVE,
  // },
]

export const FAIL_MESSAGE = "failed due to an issue on our end. Please try again. If the error continues, come back at a later time";

import SALES_TOOLS_IMG from '../assets/discover/sales_tools.png'
import MARKETING_IMG from '../assets/discover/marketing.png'
import ANALYTICS_TOOLS_IMG from '../assets/discover/analytics_tools.png'
import CAD_PLM_IMG from '../assets/discover/cad_plm.png'
import COLLAB_IMG from '../assets/discover/collab.png'
import COMMERCE_IMG from '../assets/discover/comerce.png'
import CONTENT_MGMT_IMG from '../assets/discover/content_mgmt.png'
import CUSTOMER_SERVICE_IMG from '../assets/discover/customer_service.png'
import DATA_PRIVACY_IMG from '../assets/discover/data_privacy.png'
import DESIGN_IMG from '../assets/discover/design.png'
import DEVELOPMENT_IMG from '../assets/discover/development.png'
import DIGITAL_AD_IMG from '../assets/discover/digital_ad.png'
import ERP_IMG from '../assets/discover/erp.png'
import GOVERNANCE_IMG from '../assets/discover/governance.png'
import HOSTING_IMG from '../assets/discover/hosting.png'
import HR_IMG from '../assets/discover/hr.png'
import IT_INFRA_IMG from '../assets/discover/it_infra.png'
import IT_MGMT_IMG from '../assets/discover/it_mgmt.png'
import SECURITY_IMG from '../assets/discover/security.png'
import SUPPLY_LOGISTICS_IMG from '../assets/discover/supply_logistics.png'
import VERTICAL_INDUSTRY_IMG from '../assets/discover/vertical_industry.png'

// Temporary, should get SVG's frpm API response
export const discoverGroupsImages = {
  1: SALES_TOOLS_IMG,
  2: MARKETING_IMG,
  3: ANALYTICS_TOOLS_IMG,
  4: CAD_PLM_IMG,
  5: COLLAB_IMG,
  6: COMMERCE_IMG,
  7: CONTENT_MGMT_IMG,
  8: CUSTOMER_SERVICE_IMG,
  9: DATA_PRIVACY_IMG,
  10: DESIGN_IMG,
  11: DEVELOPMENT_IMG,
  12: DIGITAL_AD_IMG,
  13: ERP_IMG,
  14: GOVERNANCE_IMG,
  15: HOSTING_IMG,
  16: HR_IMG,
  17: IT_INFRA_IMG,
  18: IT_MGMT_IMG,
  19: SECURITY_IMG,
  20: SUPPLY_LOGISTICS_IMG,
  21: VERTICAL_INDUSTRY_IMG,
};

