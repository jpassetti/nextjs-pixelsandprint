import React from "react";
import styles from "./filters.module.scss";
import Label from "./Label";
import Tabs from "./Tabs";

type FilterItem = {
  name: string;
  slug: string;
  time: { start: string; end: string };
};

interface FiltersProps {
  items: FilterItem[];
  format?: string;
  activeTabIndex: number;
  setActiveTabIndex: (tabIndex: number) => void;
  filterBy: string;
}

const Filters: React.FC<FiltersProps> = ({
  items,
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
