import classNames from 'classnames/bind';
import * as styles from './iframe.module.scss';

let cx = classNames.bind(styles);

const Iframe = ({ src, title, aspectRatio, width, height }) => {
    let embedClasses = cx({
        embedResponsive: true,
        [`embedResponsive${aspectRatio}`]: aspectRatio,
    });
    return <div className={embedClasses}>
        <iframe
        src={src}
        title={title}
        width={width} 
        height={height}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        />
    </div>
}
export default Iframe