import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/common/Header";
import { Grid } from "../../components/layout/Grid";
import styles from "./PetDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { getPetById } from "../../services/pets/getPetById";
import { ImageBase64 } from "../../components/common/ImageBase64/ImageBase64";
import { Button, ButtonVariant } from "../../components/common/Button";
import WhatsAppIcon from "../../assets/whatsapp.svg";
import Skeleton from "react-loading-skeleton";
import { useShelter } from "../../hooks/useShelter";

export const PetDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: shelterData, isError: shelterIsError } = useShelter();
  const {
    data: petData,
    isLoading: petIsLoading,
    isError: petIsError,
    ...rest
  } = useQuery({
    queryKey: ["get-pet-by-id", id],
    queryFn: () => getPetById(id ?? ""),
  });

  return (
    <Grid>
      <div className={styles.container}>
        <Header showReturn={true} />
        <main className={styles.content}>
          {petIsLoading && (
            <div className={styles.skeleton}>
              <Skeleton circle={true} width={200} height={200} />
              <Skeleton width={180} height={24} style={{ margin: 16 }} />
            </div>
          )}
{shelterIsError.toString()}
          {!petIsLoading && (
            <>
              <ImageBase64 src={petData?.photo} className={styles.picture} />
              {petIsError ? (
                <>
                  <h1>Pet não encontrado</h1>
                  <Link to={"/pets"}>Voltar para a listagem</Link>
                </>
              ) : (
                <>
                  <h1>{petData?.name}</h1>
                  <span>Sobre o pet:</span>
                  <p>{petData?.bio}</p>
                  {!shelterIsError && (
                    <a
                      href={`http://wa.me/${shelterData?.shelterWhatsApp}?text=Olá, gostaria de falar sobre o ${petData?.name}`}
                      target="_blank"
                      
                    >
                      <Button variant={ButtonVariant.Text} className={styles.buttonWhatsapp}>
                        <img
                          src={WhatsAppIcon}
                         
                        />
                        Fale no zap {shelterData?.shelterEmail}
                      </Button>
                    </a>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </Grid>
  );
};
