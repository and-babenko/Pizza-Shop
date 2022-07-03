import { useDispatch, useSelector } from "react-redux";

// Tut
import { setCategory, filtersSelector } from "../redux/slices/filtersSlice";

const Categories: React.FC = () => {
  const categoriesList: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",    
  ];

  const dispatch = useDispatch();

    // Tut
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
