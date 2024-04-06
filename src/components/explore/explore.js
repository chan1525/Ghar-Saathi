// Explore.js

import React from 'react';
import styles from './explore.module.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const Explore = () => {
  const location = useLocation();
  const history = useHistory();
var formData = location.state.state.formData;

// formData=formData.formData;
// console.log(formData);

  return (
    <section className={styles.explore}>
      <div className={styles['explore-grid']}>
        <div className={`${styles.box} ${styles.finance}`}>
          <div className={styles.content}>
            <span>Finance</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles.sites}`}>
          <div className={styles.content}>
            <span onClick={() => history.push('/site', { state: { formData } })}>Sites</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles.houses}`}>
          <div className={styles.content}>
            <span>Houses</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles.buildings}`}>
          <div className={styles.content}>
            <span onClick={() => history.push('/buildings', { state: { formData } })}>Buildings</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles.contractors}`}>
          <div className={styles.content}>
            <span>Contractors</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles.workers}`}>
          <div className={styles.content}>
            <span>Workers</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles.maintenance}`}>
          <div className={styles.content}>
            <span>Maintenance</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles['legal-team']}`}>
          <div className={styles.content}>
            <span>Legal Team</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles['contact-us']}`}>
          <div className={styles.content}>
            <span>Contact Us</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Explore;
