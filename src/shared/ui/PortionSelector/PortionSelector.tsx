import React from "react";
import styles from "./PortionSelector.module.scss";

type portionItemType = {
  weight: number;
  price: number;
};

type PortionSelectorType = {
  portionsList: portionItemType[];
  selectedPortion: portionItemType;
  onClickHandler: (value: React.SetStateAction<portionItemType>) => void;
};

const PortionSelector: React.FC<PortionSelectorType> = ({
  portionsList,
  selectedPortion,
  onClickHandler,
}) => {
  return (
    <div className={styles.portionSelector}>
      <ul>
        {portionsList.map((portion) => (
          <li
            key={portion.weight}
            className={selectedPortion === portion ? styles.active : ""}
            onClick={() => onClickHandler(portion)}
          >
            {portion.weight}g
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortionSelector;
