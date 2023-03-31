export type sortPropertyType = "rating" | "price" | "name";
export type sortByType = "desc" | "inc";

export type sortItemType = {
  label: string;
  property: sortPropertyType;
  sortBy: sortByType;
};

export type categoryIdType =
  | "all"
  | "meat"
  | "vegan"
  | "grill"
  | "spicy"
  | "covered";

export type categoryType = {
  name: string;
  id: categoryIdType;
};
