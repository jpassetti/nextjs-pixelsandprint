import { Fragment } from "react";

import classnames from 'classnames/bind'

import styles from './tabs.module.scss'

let cx = classnames.bind(styles)

const Tabs = ({items, setActiveTab, activeTab}) => {
    return <ul className={styles.tabs}>
        {items.map((item, index) => {
            const {name, slug} = item;
            return <Tab 
                key={index} 
                slug={slug}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabIndex={index}
                >
                {name}
            </Tab>
        })}
    </ul>
}
const Tab = ({children, activeTab, setActiveTab, slug, tabIndex}) => {
    let tabClasses = cx({
        tab: true,
        active: tabIndex === activeTab
    });
    return <li className={tabClasses} onClick={() => {
        setActiveTab(tabIndex);
    }}>
        {children}
    </li>
}
export default Tabs;