import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import thumbDefault from "../../../assets/thumb-default.jpg";
import { ImageBase64 } from "../ImageBase64/ImageBase64";
interface ICard {
  href: string;
  text: string;
  thumb: string;
}
export const Card = ({ href, text, thumb }: ICard) => {
  return (
    <Link to={href} className={styles.card}>
      <ImageBase64
        src={thumb}
       
      />
      <span>{text}</span>
    </Link>
  );
};
