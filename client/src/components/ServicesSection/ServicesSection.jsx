import React from 'react'
import styles from './ServicesSection.module.css'
import Box from '../Box/Box'
import stylesBox from '../Box/Box.module.css';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  return (
    <div className={styles.container}>
        <Link to="/account" className={styles.boxLink}><Box text="JOIN our Membership Club" className={stylesBox['boxGreen']}/></Link>
        <Link to="/sale" className={styles.boxLink}><Box text="SALES UP TO 30%" className={stylesBox['boxRed']}/></Link>
        <div className={styles.boxWrapper}><Box text="FAST SHIPPING Nationwide" className={stylesBox['boxBlue']}/></div>
        <div className={styles.boxWrapper}><Box text="FREE RETURNS" className={stylesBox['boxPurple']}/></div>
    </div>
  )
};

export default ServicesSection;