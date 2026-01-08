import classnames from "classnames/bind";
import Icon from "./Icon";
import styles from "./expandbutton.module.scss";

const cx = classnames.bind(styles);

// Define the types for the component's props
interface ExpandButtonProps {
  clickHandler: () => void; // Assuming clickHandler is a function that takes no arguments and returns nothing
  isActive: boolean;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({
  clickHandler,
  isActive,
}) => {
  const expandButtonClasses = cx({
    expandbutton: true,
    active: isActive,
  });

  return (
    <button onClick={clickHandler} className={expandButtonClasses}>
      <Icon icon="plus" />
    </button>
  );
};

export default ExpandButton;
