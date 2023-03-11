import React from "react";
import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";

import logoSvg from "../assets/imgs/pizza-logo.svg";
import { setSearch, resetFilters } from "../redux/slices/filtersSlice";
import { cartSelector } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";

const Header: React.FC = React.memo(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");

  const { totalPrice, totalCount } = useSelector(cartSelector);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setValue(inputData);
    debouncedInput(inputData);
  };
  //eslint-disable-next-line
  const debouncedInput = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 650),
    []
  );

  const onClearClich = (event: React.MouseEvent<SVGSVGElement>) => {
    setValue("");
    dispatch(setSearch(""));
    inputRef.current?.focus();
  };

  return (
    <div className="header">
      <div className="container">
        <Link
          onClick={() => dispatch(resetFilters())}
          to="/"
          className="header__logo"
        >
          <img width="38" src={logoSvg} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        <div className="search-container">
          <svg
            className="search-logo"
            enableBackground="new 0 0 50 50"
            height="50px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 50 50"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="none" height="50" width="50" />
            <circle
              cx="21"
              cy="20"
              fill="none"
              r="16"
              stroke="#000000"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              strokeWidth="4"
              x1="32.229"
              x2="45.5"
              y1="32.229"
              y2="45.5"
            />
          </svg>
          <input
            ref={inputRef}
            onChange={onInputChange}
            value={value}
            type="text"
            className="search-input"
            placeholder="Поиск пиццы..."
          />
          {value ? (
            <svg
              onClick={onClearClich}
              className="search-close"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                fillRule="evenodd"
                points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
              />
            </svg>
          ) : (
            ""
          )}
        </div>
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Header;
