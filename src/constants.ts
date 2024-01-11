import { Discuss } from "./screens/discuss/index";
import { Discover } from "./screens/discover/index";

export enum routeNames {
  DISCUSS = "Discuss",
  DISCOVER = "Discover",
};

export const screens = [
  {
    name: routeNames.DISCUSS,
    component: Discuss,
  },
  {
    name: routeNames.DISCOVER,
    component: Discover,
  }
]

export enum Categories {
  HOME = "Home",
  AAA = "Aaa",
  BBB = "Bbb",
};

