import styles from "../../styles/Home.module.css";

const InfoSection = () => {
  return (
    <section className={styles.info}>
      <h2>Why Choose SmartBuy?</h2>

      <p className={styles.infoText}>
        SmartBuy is designed to make your shopping experience faster, smarter, 
        and more reliable. We connect you with trusted local and online shops, 
        helping you discover the best products at the best prices. Whether you 
        are a customer or a shop owner, our platform provides powerful tools 
        to grow, compare, and make confident decisions.
      </p>

      {/* FEATURES */}
      <div className={styles.features}>
        <div className={styles.infocard}>
          <h4>Build Your Shop</h4>
          <p>
            Create your own offline store presence and expand it into a 
            powerful online shop to reach more customers.
          </p>
        </div>

        <div className={styles.infocard}>
          <h4>Compare Prices</h4>
          <p>
            Easily compare product prices across different shops and choose 
            the best deal that fits your budget.
          </p>
        </div>

        <div className={styles.infocard}>
          <h4>Watch & Analyze</h4>
          <p>
            Explore product reels, watch real usage, and analyze features 
            to make smarter buying decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;