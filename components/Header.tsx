import styles from "./header.module.scss";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="https://newhouse.syr.edu" target="_blank">
        <Logo
          marginBottom={4}
          entity="newhouse"
          variant="secondary"
          width={150}
        />
      </a>
      <br />
      <Link href="/">
        <Logo entity="pixels-and-print" width={300} />
      </Link>
    </header>
  );
};
export default Header;
