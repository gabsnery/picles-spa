import styles from "./Home.module.css";
import { Button, ButtonVariant } from "../../components/common/Button";
import dog from "../../assets/dog.svg";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className={styles.container}>
      <img src={dog} width={"100%"} />
      <Link to={"/pets"}>
        <Button variant={ButtonVariant.Default}>Quero adotar da Gabi</Button>
      </Link>
      <Link to={"/admin"}>
        <Button variant={ButtonVariant.Outlined}>Tenho um abrigo</Button>
      </Link>
    </div>
  );
};
