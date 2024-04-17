import { useParams } from "react-router-dom";
import { Header } from "../../components/common/Header";
import { Grid } from "../../components/layout/Grid";
import styles from "./PetDetails.module.css";

export const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Grid>
      <div className={styles.container}>
        <Header showReturn={true} />
        <h1>Detalhes do pétchi {id}</h1>
      </div>
    </Grid>
  );
};
