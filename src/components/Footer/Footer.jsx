import styles from "./Footer.module.css";
import { FaRegHeart } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";

function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.creator}>
        &copy; Made with <FaRegHeart />
        by Giorgia De Angelis
      </div>
      <div className={styles.socialIcons}>
        <a href="https://github.com/gideangelis" target='_blank' rel="noreferrer">
          <BsGithub />
        </a>
        <a href="https://www.linkedin.com/in/giorgia-de-angelis-webdev/" target='_blank' rel="noreferrer">
          <FaLinkedinIn />
        </a>
        <a href="https://gideangelis.github.io/portfolio/" target='_blank' rel="noreferrer">
          <BiWorld />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
