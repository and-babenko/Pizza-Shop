import styles from "./Header.module.scss";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";

import { UilSearch, UilTimes, UilShoppingCart } from "@iconscout/react-unicons";
import logoSvg from "shared/assets/imgs/pizza-logo.svg";

import { resetFilters, setSearch } from "modules/ProductsModule";
import { cartSelector } from "modules/CartModule";
import { filtersSelector } from "modules/ProductsModule";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const path = useLocation().pathname;

  const { totalPrice, totalCount } = useSelector(cartSelector);
  const { search, category, sortBy, sortProperty } =
    useSelector(filtersSelector);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string | undefined>("");

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = evt.target.value;
    setInputValue(inputData);
    debouncedInput(inputData);
  };

  const debouncedInput = useCallback(
    debounce((value: string) => {
      dispatch(setSearch(value));
      setSearchToUrl(value);
    }, 500),
    [category, sortBy, sortProperty]
  );
  const setSearchToUrl = (value: string) => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    if (value.trim() !== "") {
      paramsObj["search"] = value;
    } else {
      delete paramsObj["search"];
    }
    setSearchParams(paramsObj);
  };

  const onLogoClick = () => {
    setInputValue("");
    dispatch(resetFilters());
    setInputValue("");
  };

  const onClearClich = () => {
    setSearchToUrl("");
    setInputValue("");
    dispatch(setSearch(""));
    inputRef.current?.focus();
  };

  return (
    <header className={styles.header}>
      <Link onClick={onLogoClick} to="/" className={styles.logo}>
        <img src={logoSvg} alt="Shop Logo" />
        <div>
          <h1>React Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </Link>

      {path === "/" ? (
        <>
          <div className={styles.search}>
            <UilSearch className={styles.iconSearch} />

            <input
              ref={inputRef}
              onChange={inputChangeHandler}
              value={inputValue}
              type="text"
              placeholder="Поиск..."
            />

            {inputValue && (
              <UilTimes
                className={styles.iconClearSearch}
                onClick={onClearClich}
              />
            )}
          </div>

          <Link to="/cart" className={styles.cart}>
            <span className={styles.beforeLine}>{totalPrice} $</span>
            <UilShoppingCart className={styles.iconCart} />
            <span>{totalCount}</span>
          </Link>
        </>
      ) : (
        <div className={styles.return}>
          <Link to="/">
            <span>Вернуться назад</span>
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
