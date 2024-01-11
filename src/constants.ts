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
  AAA = "Aaa",
  BBB = "Bbb",
};

export const categories = [
  {
    name: CategoryNames.HOME,
  },
  {
    name: CategoryNames.AAA,
  },
  {
    name: CategoryNames.BBB,
  }
];

export const INPUT_PLACEHOLDER = 'Share your SaaS experiences with the community';


