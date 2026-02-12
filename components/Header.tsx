import styles from "./header.module.scss";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <a
        href="https://newhouse.syr.edu"
        target="_blank"
        rel="noopener noreferrer"
      >
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
