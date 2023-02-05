import { useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaItem from "../components/PizzaItem";
import Skeleton from "../components/Skeleton";
import "../styles/components/_paginate.scss";
import {
  setPage,
  setFilters,
  filtersSelector,
  FilterSliceState,
} from "../redux/slices/filtersSlice";
import { sortList } from "../components/Sort";
import { fetchPizzas, pizzasSelector } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";
import React from "react";

type queryType = {
  page?: number;
  sortUrl: string;
  sortBy: string;
  category?: number;
  search?: string;
};

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { search, category, sortItem, page } = useSelector(filtersSelector);
  const { pizzas, loadingIndicator } = useSelector(pizzasSelector);

  const getPizzas = async () => {
    dispatch(fetchPizzas({ search, category, sortItem, page }));
  };

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.property === params.sortUrl && obj.sortBy === params.sortBy
      );

      if (sort) {
        const categoryNumber = params.category ? Number(params.category) : 0;
        const searchValue = params.search ? params.search.toString() : "";

        const filtersData: FilterSliceState = {
          category: categoryNumber,
          page: Number(params.page),
          sortItem: sort,
          search: searchValue,
        };

        dispatch(setFilters(filtersData));
        isSearch.current = true;
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryObj: queryType = {
        page,
        sortUrl: sortItem.property,
        sortBy: sortItem.sortBy,
      };

      if (category !== 0) {
        queryObj.category = category;
      }

      if (search) {
        queryObj.search = search;
      }

      const queryString = qs.stringify(queryObj);

      if (queryString !== "page=1&sortUrl=rating&sortBy=desc") {
        navigate(`?${queryString}`);
      } else {
        navigate("");
      }
    }
    isMounted.current = true;

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [search, category, sortItem, page]);

  const onPaginateClick = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

  const pizzasList = pizzas.map((pizza) => (
    <PizzaItem key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort value={sortItem} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {loadingIndicator === "rejected" ? (
        <div className="cart cart--empty">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            Что-то пошло не так
            <br />
            Но мы уже работаем над исправлением этой ошибки
          </p>
        </div>
      ) : (
        <div className="content__items">
          {loadingIndicator === "pending" ? skeletons : pizzasList}
        </div>
      )}
      <ReactPaginate
        nextLabel=">"
        onPageChange={onPaginateClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={3}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Home;
