import styles from "./Header.module.scss";
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";

import { UilSearch, UilTimes, UilShoppingCart } from "@iconscout/react-unicons";
import logo from "shared/assets/imgs/ramen-logo.png";

import { resetFilters, setSearch } from "modules/ProductsModule";
import { cartSelector } from "modules/CartModule";
import { filtersSelector } from "modules/ProductsModule";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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
    // []
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
    dispatch(resetFilters());
    setInputValue("");
  };

  const onClearClick = () => {
    setSearchToUrl("");
    setInputValue("");
    dispatch(setSearch(""));
    inputRef.current?.focus();
  };

  const CartReturnButton: React.FC = () => {
    if (path === "/cart")
      return (
        <div className={styles.return}>
          <button onClick={() => navigate(-1)}>
            <span>Return</span>
          </button>
        </div>
      );
    return (
      <Link to="/cart" className={styles.cart}>
        <span className={styles.price}>{totalPrice} $</span>

        <span className={styles.iconCartWrapper}>
          <UilShoppingCart className={styles.iconCart} />
          {totalCount}
        </span>
      </Link>
    );
  };

  return (
    <header className={styles.header}>
      <Link onClick={onLogoClick} to="/" className={styles.logo}>
        <img src={logo} alt="Shop Logo" />
        <div>
          <h1>Ramen Yukitora</h1>
          <p>Taste the true flavors of Japan</p>
        </div>
      </Link>

      {path === "/" ? (
        <div className={styles.search}>
          <UilSearch className={styles.iconSearch} />

          <input
            ref={inputRef}
            onChange={inputChangeHandler}
            value={inputValue}
            type="text"
            placeholder="Search..."
          />

          {inputValue && (
            <UilTimes
              className={styles.iconClearSearch}
              onClick={onClearClick}
            />
          )}
        </div>
      ) : (
        <></>
      )}

      <CartReturnButton />
    </header>
  );
};
export default Header;
