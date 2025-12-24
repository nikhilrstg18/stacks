import * as React from "react";
import Site from "../layouts/site.layout";
import * as styles from "../styles/about.module.css";
import ScrollLink from "../components/scroll-link.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import {
  faGit,
  faCodepen,
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faMicrosoft,
  faNodeJs,
  faPython,
  faAngular,
  faReact,
  faBootstrap,
  faAtlassian,
  faAws,
  faDocker,
  faEdge,
  faChrome,
  faWindows,
  faFigma,
  faGitlab,
  faMarkdown,
  faOpenai,
} from "@fortawesome/free-brands-svg-icons";
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
          <div className={styles.orbit}>
            <ul className={styles.orbitWrap}>
              <li className={styles.orbitCenter}>
                <FontAwesomeIcon
                  icon={faCode}
                  className={styles.orbitCenterIcon}
                />
              </li>
              <li>
                <ul className={styles.ring0}>
                  <li>
                    <FontAwesomeIcon
                      icon={faAtlassian}
                      className={[styles.orbitIcon, styles.faAtlassian].join(
                        " "
                      )}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faGit}
                      className={[styles.orbitIcon, styles.faGit].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faOpenai}
                      className={[styles.orbitIcon, styles.faOpenai].join(" ")}
                    />
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faMarkdown}
                      className={[styles.orbitIcon, styles.faMarkdown].join(
                        " "
                      )}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faEdge}
                      className={[styles.orbitIcon, styles.faEdge].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faChrome}
                      className={[styles.orbitIcon, styles.faChrome].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faWindows}
                      className={[styles.orbitIcon, styles.faWindows].join(" ")}
                    />
                  </li>
                </ul>
              </li>

              <li>
                <ul className={styles.ring1}>
                  <li>
                    <FontAwesomeIcon
                      icon={faDocker}
                      className={[styles.orbitIcon, styles.faDocker].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faGitlab}
                      className={[styles.orbitIcon, styles.faGitlab].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCodepen}
                      className={[styles.orbitIcon, styles.faCodepen].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faGit}
                      className={[styles.orbitIcon, styles.faGit].join(" ")}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <ul className={styles.ring2}>
                  <li>
                    <FontAwesomeIcon
                      icon={faFigma}
                      className={[styles.orbitIcon, styles.faFigma].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faAws}
                      className={[styles.orbitIcon, styles.faAws].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faBootstrap}
                      className={[styles.orbitIcon, styles.faBootstrap].join(
                        " "
                      )}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faReact}
                      className={[styles.orbitIcon, styles.faReact].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faAngular}
                      className={[styles.orbitIcon, styles.faAngular].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faPython}
                      className={[styles.orbitIcon, styles.faPython].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faNodeJs}
                      className={[styles.orbitIcon, styles.faNodeJs].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faMicrosoft}
                      className={[styles.orbitIcon, styles.faMicrosoft].join(
                        " "
                      )}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <ul className={styles.ring3}>
                  <li>
                    <FontAwesomeIcon
                      icon={faHtml5}
                      className={[styles.orbitIcon, styles.faHtml5].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCss3Alt}
                      className={[styles.orbitIcon, styles.faCss3].join(" ")}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faJsSquare}
                      className={[styles.orbitIcon, styles.faJs].join(" ")}
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
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
