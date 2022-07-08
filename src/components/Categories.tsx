import { useSelector } from "react-redux";

import { setCategory, filtersSelector } from "../redux/slices/filtersSlice";
import { useAppDispatch } from "../redux/store";

const Categories: React.FC = () => {
  const categoriesList: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const dispatch = useAppDispatch();
  const { category } = useSelector(filtersSelector);

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
