import { DiscussStackScreen } from "./screens/discuss/index";
import { Discover } from "./screens/discover/index";
import { Route } from "expo-router/build/Route";
import { BuyerAIStackStackScreen } from "./screens/buyerai";
import { Home } from "./screens/Home";
import { DiscussCreatePost } from "./screens/DiscussCreatePost";
import { BuyerAIFollowup } from "./screens/BuyerAIFollowup";
import { BuyerAIMessenger } from "./screens/BuyerAIMessenger";
import { ProfileCreateHome } from "./screens/ProfileCreateHome";
import { ProfileQuestion } from "./screens/ProfileQuestion";
import { HomeNavBar } from "./common/HomeNavBar";

export enum RouteNames {
  DISCUSS = "Discuss",
  DISCOVER = "Discover",
  BUYER_AI = "BuyerAI",
};

export const screens = [
  {
    name: "Home",
    component: Home,
  },
  {
    name: RouteNames.BUYER_AI,
    component: BuyerAIStackStackScreen,
  },
  {
    name: RouteNames.DISCUSS,
    component: DiscussStackScreen,
  },
  {
    name: RouteNames.DISCOVER,
    component: Discover,
  },
]

export enum Routes {

}

// export const routes = [
//   {
//     name: "Home",
//     // component: Home,
//     component: HomeNavBar,
//   },
//   {
//     name: "DiscussCreatePost",
//     component: DiscussCreatePost,
//   },
//   {
//     name: "BuyerAIMessenger",
//     component: BuyerAIMessenger,
//   },
//   {
//     name: "BuyerAIFollowup",
//     component: BuyerAIFollowup,
//   },
//   {
//     name: "ProfileCreateHome",
//     component: ProfileCreateHome,
//   },
//   {
//     name: "ProfileQuestion",
//     component: ProfileQuestion,
//   }

// ]

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

export const BUYERAI_PLACEHOLDER = 'Message Buyer AI...';


