import * as React from "react";
import Site from "../layouts/site.layout";
import * as styles from "../styles/about.module.css";

const AboutPage = () => {
  return (
    <Site>
      {/* <section id="about" className={styles.about}>
        About section
      </section>
      <section id="work" className={styles.work}>
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            <div className={styles.column}>
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=1-1"
                alt=""
              />
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=1-2"
                alt=""
              />
            </div>
            <div className={styles.column}>
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=2-1"
                alt=""
              />
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=2-2"
                alt=""
              />
            </div>
            <div className={styles.column}>
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=3-1"
                alt=""
              />
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=3-2"
                alt=""
              />
            </div>
            <div className={styles.column}>
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=4-1"
                alt=""
              />
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=4-2"
                alt=""
              />
            </div>
            <div className={styles.column}>
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=5-1"
                alt=""
              />
              <img
                className={styles.img}
                src="https://picsum.photos/500/700?random=5-2"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section id="resume" className={styles.resume}>
        resume section
      </section>
      <section id="contact" className={styles.contact}>
        contact section
      </section> */}
      <div className={styles.slide}>
        <div className={styles.section}>
          <h4>ABOUT</h4>
        </div>
        <p>Scroll Down for next slide</p>
      </div>
      <div className={[styles.slide, styles.slideOpp, styles.sliden].join(" ")}>
        <div className={styles.section}>
          <h4>SKILLS</h4>
        </div>
        <p>Scroll Down for next slide</p>
      </div>
      <div className={[styles.slide, styles.sliden].join(" ")}>
        <div className={styles.section}>
          <h4>WORK</h4>
        </div>
        <p>Scroll Down for next slide</p>
      </div>
      <div className={[styles.slide, styles.slideOpp, styles.sliden].join(" ")}>
        <div className={styles.section}>
          <h4>RESUME</h4>
        </div>
        <p>Scroll Down for next slide</p>
      </div>
      <div className={[styles.slide, styles.sliden].join(" ")}>
        <div className={styles.section}>
          <h4>CONNECT</h4>
        </div>
        <p>Thank you</p>
      </div>
    </Site>
  );
};
export const Head = () => <title>Stacks|About</title>;
export default AboutPage;
