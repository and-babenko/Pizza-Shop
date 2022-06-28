import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategory } from "../redux/slices/filtersSlice";

const Categories = () => {
  const categoriesList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const dispatch = useDispatch();
  const category = useSelector((state) => state.filters.category);

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item, index) => (
          <li
            onClick={() => {
              dispatch(setCategory(index));
            }}
            key={index}
            className={category === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
