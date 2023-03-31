import { sortItemType, categoryType } from "./types";

export const sortList: sortItemType[] = [
  {
    label: "популярности, по убыванию",
    property: "rating",
    sortBy: "desc",
  },
  {
    label: "популярности, по возрастанию",
    property: "rating",
    sortBy: "inc",
  },

  {
    label: "цене, по возрастанию",
    property: "price",
    sortBy: "inc",
  },
  {
    label: "цене, по убыванию",
    property: "price",
    sortBy: "desc",
  },
  {
    label: "алфавиту, по возрастанию",
    property: "name",
    sortBy: "inc",
  },
  {
    label: "алфавиту, по убыванию",
    property: "name",
    sortBy: "desc",
  },
];

export const categoriesList: categoryType[] = [
  {
    name: "Все",
    id: "all",
  },
  {
    name: "Мясные",
    id: "meat",
  },
  {
    name: "Вегетарианские",
    id: "vegan",
  },
  {
    name: "Гриль",
    id: "grill",
  },
  {
    name: "Острые",
    id: "spicy",
  },
  {
    name: "Закрытые",
    id: "covered",
  },
];
