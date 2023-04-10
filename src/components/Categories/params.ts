import { sortItemType, categoryType } from "./types";

export const sortList: sortItemType[] = [
  {
    label: "popularity, desc",
    property: "rating",
    sortBy: "desc",
  },
  {
    label: "popularity, inc",
    property: "rating",
    sortBy: "inc",
  },

  {
    label: "price, inc",
    property: "startPrice",
    sortBy: "inc",
  },
  {
    label: "price, desc",
    property: "startPrice",
    sortBy: "desc",
  },
  {
    label: "name, inc",
    property: "name",
    sortBy: "inc",
  },
  {
    label: "name, desc",
    property: "name",
    sortBy: "desc",
  },
];

export const categoriesList: categoryType[] = [
  {
    name: "All",
    id: "all",
  },
  {
    name: "Pork",
    id: "pork",
  },
  {
    name: "Chicken",
    id: "chicken",
  },
  {
    name: "Fish",
    id: "fish",
  },
  {
    name: "Vegetarian",
    id: "vegan",
  },
  {
    name: "Noodles",
    id: "noodles",
  },
];
