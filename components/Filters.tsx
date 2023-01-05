import styles from './filters.module.scss'
import Col from './Col';
import Label from './Label';
import Row from './Row';
import Select from './Select';
import Tabs from './Tabs'

const Filters = ({items, format, activeCategory, setActiveCategory, filterBy}) => {
    return <div className={styles.filterBar}>
            <Label caps fontWeight="400">{filterBy}</Label>
            <Tabs 
                items={items} 
                activeTab={activeCategory} 
                setActiveTab={setActiveCategory} 
            />
        </div> 
}
export default Filters;
