import { useEffect, useState } from "react";
import { Card } from "../../components/common/Card/Card.";
import { Header } from "../../components/common/Header";
import { Grid } from "../../components/layout/Grid";
import { IPet } from "../../interfaces/pet";
import { getPets } from "../../services/pets/getPets";
import styles from "./Pets.module.css";
import { Skeleton } from "../../components/common/Skeleton";

export const Pets = () => {
  const [pets, setPets] = useState<IPet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getPets({ itemsPetPage: 100 }).then((item) => {
      setPets(item.items);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Grid>
        <div className={styles.container}>
          <Header />
          {loading && (
            <Skeleton count={5} containerClassName={styles.skeleton} />
          )}
          <main className={styles.list}>
            {pets.map((item, index) => (
              <Card
                key={index}
                href={`/pets/${item.id}`}
                text={item.name}
                thumb={item.photo}
              />
            ))}
          </main>
        </div>
      </Grid>
    </>
  );
};
