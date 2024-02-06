import React from "react";
import styles from "./filters.module.scss";
import Label from "./Label";
import Tabs from "./Tabs";

// Assuming the structure for items and the type for activeCategory
// Adjust these types according to your actual data structure and use case

interface Item {
  id: string; // or number, depending on your data
  label: string;
}

interface FiltersProps {
  items: Item[];
  format: string; // Assuming format is a string, adjust if it's meant to be something else
  activeCategory: string; // or number, depending on your identifiers
  setActiveCategory: (category: string) => void; // Adjust the type of category based on your actual usage
  filterBy: string;
}

const Filters: React.FC<FiltersProps> = ({
  items,
  format,
  activeCategory,
  setActiveCategory,
  filterBy,
}) => {
  return (
    <div className={styles.filterBar}>
      <Label caps fontWeight="400">
        {filterBy}
      </Label>
      <Tabs
        items={items}
        activeTab={activeCategory}
        setActiveTab={setActiveCategory}
      />
    </div>
  );
};

export default Filters;
