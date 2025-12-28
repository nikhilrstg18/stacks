import * as React from "react";
import * as styles from "../styles/skillorbit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faOpenai } from "@fortawesome/free-brands-svg-icons";
import NodeIcon from "../images/Node.js.svg";
import NetCoreIcon from "../images/NetCore.svg";
import AngularIcon from "../images/Angular.svg";
import PythonIcon from "../images/Python.svg";
import FigmaIcon from "../images/Figma.svg";
import DockerIcon from "../images/Docker.svg";
import CssIcon from "../images/CSS3.svg";
import HtmlIcon from "../images/HTML5.svg";
import JsIcon from "../images/JavaScript.svg";
import BootstrapIcon from "../images/Bootstrap.svg";
import GitlabIcon from "../images/GitLab.svg";
import GitIcon from "../images/Git.svg";
import TailwindIcon from "../images/Tailwind.svg";
import FirebaseIcon from "../images/Firebase.svg";
import TypescriptIcon from "../images/TypeScript.svg";
import CsIcon from "../images/C#.svg";
import MongoDBIcon from "../images/MongoDB.svg";
import NextjsIcon from "../images/Next.js.svg";
import PostgresSQLIcon from "../images/PostgresSQL.svg";
import SqlServerIcon from "../images/SqlServer.svg";
import KafkaIcon from "../images/Kafka.svg";
import RabbitMQIcon from "../images/RabbitMQ.svg";
import VsCodeIcon from "../images/VsCode.svg";
import AwsIcon from "../images/AWS.svg";
import CassandraIcon from "../images/Cassandra.svg";
import BashIcon from "../images/Bash.svg";
import ConfluenceIcon from "../images/Confluence.svg";
import GatsbyIcon from "../images/Gatsby.svg";
import GraphQLIcon from "../images/GraphQL.svg";
import PlaywriteIcon from "../images/Playwrite.svg";
import KubernetesIcon from "../images/Kubernetes.svg";
const SkillOrbit = () => {
  return (
    <div className={styles.orbit}>
      <ul className={styles.orbitWrap}>
        <li className={styles.orbitCenter}>
          <FontAwesomeIcon icon={faCode} className={styles.orbitCenterIcon} />
        </li>
        <li>
          <ul className={styles.ring0}>
            <li>
              <img
                src={GitlabIcon}
                className={styles.orbitIcon}
                alt="Gitlab"
                title="Gitlab"
              />
            </li>
            <li>
              <img
                src={VsCodeIcon}
                className={styles.orbitIcon}
                alt="VS Code"
                title="VS Code"
              />
            </li>
            <li>
              <img
                src={DockerIcon}
                className={styles.orbitIcon}
                alt="Docker"
                title="Docker"
              />
            </li>
            <li>
              <FontAwesomeIcon
                icon={faOpenai}
                className={[styles.orbitCenterIcon, styles.faOpenai].join(" ")}
                alt="OpenAi"
                title="OpenAi"
              />
            </li>
            <li>
              <img
                src={AwsIcon}
                className={styles.orbitIcon}
                alt="Aws"
                title="Aws"
              />
            </li>
            <li>
              <img
                src={CassandraIcon}
                className={styles.orbitIcon}
                alt="Cassandra"
                title="Cassandra"
              />
            </li>
            <li>
              <img
                src={BashIcon}
                className={styles.orbitIcon}
                alt="Bash"
                title="Bash"
              />
            </li>
            <li>
              <img
                src={ConfluenceIcon}
                className={styles.orbitIcon}
                alt="Confluence"
                title="Confluence"
              />
            </li>
            <li>
              <img
                src={GatsbyIcon}
                className={styles.orbitIcon}
                alt="Gatsby"
                title="Gatsby"
              />
            </li>
            <li>
              <img
                src={GraphQLIcon}
                className={styles.orbitIcon}
                alt="GraphQL"
                title="GraphQL"
              />
            </li>
            <li>
              <img
                src={PlaywriteIcon}
                className={styles.orbitIcon}
                alt="Playwrite"
                title="Playwrite"
              />
            </li>
            <li>
              <img
                src={KubernetesIcon}
                className={styles.orbitIcon}
                alt="Kubernetes"
                title="Kubernetes"
              />
            </li>
          </ul>
        </li>

        <li>
          <ul className={styles.ring1}>
            <li>
              <img
                src={NetCoreIcon}
                className={styles.orbitIcon}
                alt=".Net Core"
              />
            </li>
            <li>
              <img src={CsIcon} className={styles.orbitIcon} alt="c#" />
            </li>
            <li>
              <img
                src={SqlServerIcon}
                className={styles.orbitIcon}
                alt="SQL Server"
              />
            </li>
            <li>
              <img src={NodeIcon} className={styles.orbitIcon} alt="Node.js" />
            </li>
            <li>
              <img
                src={MongoDBIcon}
                className={styles.orbitIcon}
                alt="MongoDB"
              />
            </li>
            <li>
              <img src={PythonIcon} className={styles.orbitIcon} alt="Python" />
            </li>
            <li>
              <img
                src={PostgresSQLIcon}
                className={styles.orbitIcon}
                alt="PostgresSQL"
              />
            </li>
            <li>
              <img
                src={KafkaIcon}
                className={styles.orbitIcon}
                alt="Confluent Kafka"
              />
            </li>
            <li>
              <img
                src={RabbitMQIcon}
                className={styles.orbitIcon}
                alt="RabbitMQ"
              />
            </li>
          </ul>
        </li>
        <li>
          <ul className={styles.ring2}>
            <li>
              <img src={FigmaIcon} className={styles.orbitIcon} alt="Figma" />
            </li>
            <li>
              <img
                src={BootstrapIcon}
                className={styles.orbitIcon}
                alt="Bootstrap"
              />
            </li>
            <li>
              <img
                src={TailwindIcon}
                className={styles.orbitIcon}
                alt="Tailwind"
              />
            </li>
            <li>
              <img
                src={NextjsIcon}
                className={styles.orbitIcon}
                alt="Next.js"
              />
            </li>
            <li>
              <img
                src={AngularIcon}
                className={styles.orbitIcon}
                alt="Angular"
              />
            </li>
            <li>
              <img
                src={TypescriptIcon}
                className={styles.orbitIcon}
                alt="Typescrip"
              />
            </li>
            <li>
              <img
                src={FirebaseIcon}
                className={styles.orbitIcon}
                alt="Firebase"
              />
            </li>
          </ul>
        </li>
        <li>
          <ul className={styles.ring3}>
            <li>
              <img src={HtmlIcon} className={styles.orbitIcon} alt="HTML5" />
            </li>
            <li>
              <img src={CssIcon} className={styles.orbitIcon} alt="CSS3" />
            </li>
            <li>
              <img src={JsIcon} className={styles.orbitIcon} alt="Javascript" />
            </li>
            <li>
              <img src={GitIcon} className={styles.orbitIcon} alt="Git" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SkillOrbit;
