import React, { useEffect, useRef } from "react";
import styles from "./ProductsModule.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Categories from "components/Categories";
import CatalogItem from "components/CatalogItem";
import Skeleton from "shared/ui/Skeleton";

import { IFilterState } from "./types";
import { sortList, categoriesList } from "components/Categories/params";
import { filtersSelector, setFilters } from "./store/filtersSlice";
import { productsSelector, fetchProducts } from "./store/productSlice";

const EmptyCatalog: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className={styles.emptyCatalog}>
      <h2>
        Произошла ошибка <span>😕</span>
      </h2>
      {error === "empty" ? (
        <p> По вашему запросу товары не найдены </p>
      ) : (
        <p>Я обязательно настрою sentry и узнаю о проблеме :)</p>
      )}
    </div>
  );
};

const skeletonList = [...new Array(4)].map((_, index) => (
  <Skeleton key={index} />
));

const ProductsModule: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();
  const { products, loadingIndicator } = useSelector(productsSelector);
  const { search, category, sortBy, sortProperty } =
    useSelector(filtersSelector);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) return;
    getProducts();
  }, [search, category, sortBy, sortProperty]);

  useEffect(() => {
    getFiltersFromUrl();
    isMounted.current = true;
  }, []);

  const getFiltersFromUrl = () => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    // We make a request only after updating one of the filtering parameters after first load (after setting them to URL). So only problem we can have if we have no such params.
    if (!Object.keys(paramsObj).length) getProducts();

    const filtersData: IFilterState = {
      category,
      sortBy,
      sortProperty,
      search,
    };

    // Getting SortItem
    if (paramsObj.sortProp && paramsObj.sortBy) {
      const sortParam = sortList.find(
        (sortItem) =>
          sortItem.property === paramsObj.sortProp &&
          sortItem.sortBy === paramsObj.sortBy
      );

      if (sortParam) {
        filtersData.sortProperty = sortParam.property;
        filtersData.sortBy = sortParam.sortBy;
      }
    }

    // Getting Category
    if (paramsObj.category) {
      const categoryParam = categoriesList.find(
        (cat) => cat.id === paramsObj.category
      );

      if (categoryParam) {
        filtersData.category = categoryParam.id;
      }
    }

    //Getting SearchValue
    if (paramsObj.search) {
      filtersData.search = paramsObj.search.toString();
    }

    dispatch(setFilters(filtersData));
  };

  const getProducts = async () => {
    dispatch(fetchProducts({ search, sortBy, sortProperty, category }));
  };

  const productsList = products.map((product) => {
    return <CatalogItem key={product.id} {...product} />;
  });

  return (
    <div className={styles.productsModule}>
      <Categories />

      {loadingIndicator === "rejected" || loadingIndicator === "empty" ? (
        <EmptyCatalog error={loadingIndicator} />
      ) : (
        <div className={styles.productList}>
          {loadingIndicator === "pending" ? skeletonList : productsList}
        </div>
      )}
    </div>
  );
};

export default ProductsModule;
