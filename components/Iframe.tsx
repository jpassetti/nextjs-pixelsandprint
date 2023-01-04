import classNames from 'classnames/bind';
import * as styles from './iframe.module.scss';

let cx = classNames.bind(styles);

const Iframe = ({ src, title, aspectRatio }) => {
    let embedClasses = cx({
        embedResponsive: true,
        [`embedResponsive${aspectRatio}`]: aspectRatio,
    });
    return <div className={embedClasses}>
        <iframe
        src={src}
        title={title}
        width="560" 
        height="315"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        />
    </div>
}
export default Iframe