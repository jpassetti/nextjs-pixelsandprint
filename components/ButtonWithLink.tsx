import Link from "next/link";
import classnames from "classnames/bind";
import styles from "./button.module.scss";

let cx = classnames.bind(styles);

// Define a type for the component's props
interface ButtonWithLinkProps {
  href: string;
  label: string;
  type?: "primary"; // Add other types as needed, separated by | (e.g., 'secondary' | 'tertiary')
  gradient?: string; // You can replace `string` with more specific types if you have a predefined set of gradients
}

const ButtonWithLink: React.FC<ButtonWithLinkProps> = ({
  href,
  label,
  type,
  gradient,
}) => {
  let buttonClasses = cx({
    button: true,
    [`primary`]: type === "primary",
    [`gradient-${gradient}`]: gradient,
  });

  // Note: Next.js Link component does not accept className directly. It should be passed to an <a> tag inside Link
  return (
    <Link href={href} passHref>
      <a className={buttonClasses}>{label}</a>
    </Link>
  );
};

export default ButtonWithLink;
