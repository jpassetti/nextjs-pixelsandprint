import styles from './filters.module.scss'
import Col from './Col';
import Label from './Label';
import Row from './Row';
import Select from './Select';
import Tabs from './Tabs'

const Filters = ({items, format, activeCategory, setActiveCategory}) => {
    return <div className={styles.filterBar}>
            {format === "dropdown" ? <Row paddingTop={2} paddingBottom={2}>
                <Col xs={12} sm={4}>
                    <Label>Filter by role:</Label>
                    <Select options={items} changeHandler={setActiveCategory} />
                </Col>
            </Row>
            : format === "tabs" ? <Row>
                <Col xs={12}>
                    <Tabs 
                    items={items} 
                    activeTab={activeCategory} 
                    setActiveTab={setActiveCategory} 
                    />
                </Col>
            </Row>
            : null}
        </div> 
}
export default Filters;
