import React, { useEffect, useRef, useState } from "react";
import styles from "./Categories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { UilAngleUp } from "@iconscout/react-unicons";
import { useSearchParams } from "react-router-dom";

import { categoriesList, sortList } from "./params";
import {
  categoryIdType,
  sortByType,
  sortItemType,
  sortPropertyType,
} from "./types";
import { setCategory, setSortItem } from "modules/ProductsModule";
import { filtersSelector } from "modules/ProductsModule";

const Categories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { category, sortBy, sortProperty } = useSelector(filtersSelector);

  const [currentSort, setCurrentSort] = useState<sortItemType>();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setPopupVisible(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const currentSortItem = sortList.find(
      (elem) => elem.property === sortProperty && elem.sortBy === sortBy
    );
    setCurrentSort(currentSortItem);
  }, [sortBy, sortProperty]);

  const paramsObj = Object.fromEntries(searchParams.entries());

  const setFiltersToUrl = ({
    category,
    sortBy,
    sortProperty,
  }: {
    category?: categoryIdType;
    sortProperty?: sortPropertyType;
    sortBy?: sortByType;
  }) => {
    if (category) {
      paramsObj["category"] = category;

      if (paramsObj["category"] === "all") {
        delete paramsObj["category"];
      }
    }

    if (sortBy && sortProperty) {
      paramsObj["sortBy"] = sortBy;
      paramsObj["sortProperty"] = sortProperty;

      if (sortBy === "desc" && sortProperty === "rating") {
        delete paramsObj["sortBy"];
        delete paramsObj["sortProperty"];
      }
    }
    setSearchParams(paramsObj);
  };

  const onCategoryClick = (id: categoryIdType) => {
    dispatch(setCategory(id));
    setFiltersToUrl({ category: id });
  };

  const onSortClick = ({ property: sortProperty, sortBy }: sortItemType) => {
    setPopupVisible(false);
    dispatch(setSortItem({ sortProperty, sortBy }));
    setFiltersToUrl({ sortProperty, sortBy });
  };

  return (
    <div className={styles.container}>
      <ul className={styles.categories}>
        {categoriesList.map(({ id, name }) => (
          <li
            onClick={() => onCategoryClick(id)}
            key={id}
            className={category === id ? styles.active : ""}
          >
            {name}
          </li>
        ))}
      </ul>

      <div
        onClick={() => setPopupVisible(!isPopupVisible)}
        className={styles.sort}
        ref={sortRef}
      >
        <div>
          <UilAngleUp
            className={`${styles.icon} ${isPopupVisible && styles.iconRotate}`}
          />

          <b>Сортировка по:</b>
        </div>
        <p>{currentSort?.label}</p>

        {isPopupVisible && (
          <ul className={styles.popup}>
            {sortList.map((item) => (
              <li
                onClick={() => {
                  onSortClick(item);
                }}
                key={item.label}
                className={
                  item.label === currentSort?.label ? styles.active : ""
                }
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Categories;
