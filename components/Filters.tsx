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
  items: any[]; // You can replace `any` with the specific type of your items array
  format: string;
  activeTabIndex: number; // Replace `any` with the specific type of your activeCategory object
  setActiveTabIndex: (category: any) => void; // Replace `any` with the specific type of your setActiveCategory function argument
  filterBy: string;
}

const Filters: React.FC<FiltersProps> = ({
  items,
  format,
  activeTabIndex,
  setActiveTabIndex,
  filterBy,
}) => {
  return (
    <div className={styles.filterBar}>
      <Label caps fontWeight="400">
        {filterBy}
      </Label>
      <Tabs
        items={items}
        activeTab={activeTabIndex}
        setActiveTab={setActiveTabIndex}
      />
    </div>
  );
};

export default Filters;
