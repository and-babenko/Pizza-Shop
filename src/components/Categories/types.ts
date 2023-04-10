export type sortPropertyType = "rating" | "startPrice" | "name";
export type sortByType = "desc" | "inc";

export type sortItemType = {
  label: string;
  property: sortPropertyType;
  sortBy: sortByType;
};

export type categoryIdType =
  | "all"
  | "pork"
  | "chicken"
  | "fish"
  | "vegan"
  | "noodles";

export type categoryType = {
  name: string;
  id: categoryIdType;
};
