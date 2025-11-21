import * as React from "react";
import Site from "../layouts/site.layout";
import * as styles from "../styles/about.module.css";
import ScrollLink from "../components/scroll-link.component";

const AboutPage = () => {
  return (
    <Site>
      <div id="about" className={styles.slide}>
        <div className={styles.section}>
          <h4>ABOUT</h4>
          <div className={styles.shadow}></div>
        </div>

        <ScrollLink id="skills">
          <div className={styles.scrolldowns}>
            <div className={styles.mousey}>
              <div className={styles.scroller}></div>
            </div>
          </div>
        </ScrollLink>
      </div>
      <div
        id="skills"
        className={[styles.slide, styles.slideOpp, styles.sliden].join(" ")}
      >
        <div className={styles.section}>
          <h4>SKILLS</h4>
          <div className={styles.shadow}></div>
        </div>
        <ScrollLink id="work">
          <div className={styles.scrolldowns}>
            <div className={[styles.mousey, styles.dark].join(" ")}>
              <div className={[styles.scroller, styles.sdark].join(" ")}></div>
            </div>
          </div>
        </ScrollLink>
      </div>
      <div id="work" className={[styles.slide, styles.sliden].join(" ")}>
        <div className={styles.section}>
          <h4>WORK</h4>
          <div className={styles.shadow}></div>
        </div>
        <ScrollLink id="resume">
          <div className={styles.scrolldowns}>
            <div className={styles.mousey}>
              <div className={styles.scroller}></div>
            </div>
          </div>
        </ScrollLink>
      </div>
      <div
        id="resume"
        className={[styles.slide, styles.slideOpp, styles.sliden].join(" ")}
      >
        <div className={styles.section}>
          <h4>RESUME</h4>
          <div className={styles.shadow}></div>
        </div>
        <ScrollLink id="connect">
          <div className={styles.scrolldowns}>
            <div className={[styles.mousey, styles.dark].join(" ")}>
              <div className={[styles.scroller, styles.sdark].join(" ")}></div>
            </div>
          </div>
        </ScrollLink>
      </div>
      <div id="connect" className={[styles.slide, styles.sliden].join(" ")}>
        <div className={styles.section}>
          <h4>CONNECT</h4>
          <div className={styles.shadow}></div>
        </div>
        <ScrollLink id="about">
          <div className={styles.scrolldowns}>
            <div className={styles.mousey}>
              <div className={styles.scroller}></div>
            </div>
          </div>
        </ScrollLink>
      </div>
    </Site>
  );
};
export const Head = () => <title>Stacks|About</title>;
export default AboutPage;
