import classnames from "classnames/bind";
import styles from "./tabs.module.scss";

const cx = classnames.bind(styles);

const Tabs = ({ items, setActiveTab, activeTab }) => {
  return (
    <ul className={styles.tabs}>
      {items.map((item, index) => {
        const { name, time } = item;

        // Extract the date information from the time.start
        const date = new Date(time.start);
        const month = date.getMonth() + 1; // Months are 0-indexed
        const day = date.getDate();

        return (
          <Tab
            key={index}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabIndex={index}
          >
            {`${name}, ${month}/${day}`}
          </Tab>
        );
      })}
    </ul>
  );
};

const Tab = ({ children, activeTab, setActiveTab, tabIndex }) => {
  const tabClasses = cx({
    tab: true,
    active: tabIndex === activeTab,
  });

  return (
    <li
      className={tabClasses}
      onClick={() => {
        setActiveTab(tabIndex);
      }}
    >
      {children}
    </li>
  );
};

export default Tabs;