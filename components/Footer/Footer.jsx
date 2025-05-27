import React from "react";
import styles from "./Footer.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerIcons}>
        <div className={styles.footerLinks}>
            <a href="https://www.facebook.com/" className={styles.footerLink}>
              <span><i className="fa-brands fa-square-facebook fa-2x" style={{color: "#005eff"}}></i></span>
            </a>
            <a href="https://www.instagram.com/" className={styles.footerLink}>
              <span><i className="fa-brands fa-square-instagram fa-2x" style={{color: "#962fbf"}}></i></span>
            </a>
            <a href="https://www.youtube.com/" className={styles.footerLink}>
              <span><i className="fa-brands fa-youtube fa-2x" style={{color: "#ff0000"}}></i></span>
            </a>
            <span className={styles.pipeSymbol}>|</span>
            <span><i className="fab fa-cc-visa fa-2x"></i></span>
            <span><i className="fab fa-cc-mastercard fa-2x"></i></span>
            <span><i className="fab fa-cc-amex fa-2x"></i></span>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={`${styles.innerContainer} ${styles.left}`}>
          <p className={styles.footerText}>
            &copy; {new Date().getFullYear()} JUSA
          </p>
        </div>
        <div className={`${styles.innerContainer} ${styles.right}`}>
          <p className={styles.footerText}>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;