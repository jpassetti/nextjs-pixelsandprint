import { ReactNode } from 'react'

import classNames from 'classnames/bind';
import * as styles from './container.module.scss';

let cx = classNames.bind(styles)

type Props = {
    children?: ReactNode
}

const Container = ({ children }:Props) => {
	let containerClasses = cx({
		container: true
	});
	return <div className={containerClasses}>{children}</div>
}
export default Container;