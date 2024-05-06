import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <img className={styles.poster} src="./images/poster.png" alt="" />
      <h1 className={styles.company}>
        Better Call Us — це надійність  та високий професіоналізм, який Ви
        відчуєте з першого дзвінка!
      </h1>
    </section>
  );
};

export default HeroSection;
