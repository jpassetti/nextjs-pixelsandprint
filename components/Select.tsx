import styles from './select.module.scss'

type Option = {
    name: string
    slug: string
}

type Props = {
    options: Option[],
    changeHandler: (value: string) => void,
    value?: string
}

const Select = ({options, changeHandler, value}: Props) => {
    return <select className={styles.select} onChange={(e) => {
        changeHandler(e.target.value);
    }} value={value}>
        <option value="all">All</option>
        {options.map((option, index) => {
            const {name, slug} = option;
            if (value === "uncategorized") return null
            return <option key={index} value={slug}>{name}</option>
        })}
    </select>
}
export default Select