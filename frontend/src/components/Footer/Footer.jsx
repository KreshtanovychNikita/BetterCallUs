import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerText}>
        &copy; 2024 Better Call Us. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
