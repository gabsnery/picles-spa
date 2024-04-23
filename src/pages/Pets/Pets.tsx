import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, ButtonVariant } from "../../components/common/Button";
import { Card } from "../../components/common/Card/Card.";
import { Header } from "../../components/common/Header";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { Select } from "../../components/common/Select";
import { Skeleton } from "../../components/common/Skeleton";
import { Grid } from "../../components/layout/Grid";
import { usePetList } from "../../hooks/usePetList";
import styles from "./Pets.module.css";
import { filterColumns } from "./Pet.constants";
import { GetPetsRequest } from "../../interfaces/pet";

export const Pets = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const [isButtonEnable, setIsButtonEnable] = useState<boolean>(false);
  /* const [especies, setEspecies] = useState<string[]>([]); */

  const urlParams = {
    page: searchParam.get("page") ? Number(searchParam.get("page")) : 1,
    type: searchParam.get("type") ?? "",
    gender: searchParam.get("gender") ?? "",
    size: searchParam.get("size") ?? "",
    itemsPetPage: 12,
  };

  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = usePetList(urlParams);
  const checkButtonStatus = (event: ChangeEvent<HTMLFormElement>) => {
    const props = getFormValue(event.target.form);
    if (
      props.type !== urlParams.type ||
      props.size !== urlParams.size ||
      props.gender !== urlParams.gender
    ) {
      setIsButtonEnable(true);
    } else setIsButtonEnable(false);
  };
  /*  useEffect(() => {
    if (data) setEspecies([...new Set(data.items.map((item) => item.type))]);
  }, [data]); */
  const changePage = (page: number) => {
    setSearchParams((params) => {
      params.set("page", String(page));
      return params;
    });
  };

  function getFormValue(form: HTMLFormElement) {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
  }

  function updateSearchParams(urlParams: GetPetsRequest) {
    const fields: (keyof GetPetsRequest)[] = ["type", "size", "gender"];
    const newParams = new URLSearchParams();

    fields.forEach((field) => {
      if (urlParams[field]) {
        newParams.set(field, String(urlParams[field]));
      }
    });
    newParams.set("page", "1");

    return newParams;
  }

  function applyFilters(event: FormEvent) {
    event.preventDefault();

    const formValues = getFormValue(event.target as HTMLFormElement);
    const newSearchParams = updateSearchParams(formValues);

    setSearchParams(newSearchParams);
    setIsButtonEnable(false);
  }

  return (
    <>
      <Grid>
        <div className={styles.container}>
          <Header />
          <form
            className={styles.filters}
            onSubmit={applyFilters}
            onChange={checkButtonStatus}
          >
            <div className={styles.columns}>
              {filterColumns.map((filter, index) => {
                return (
                  <div key={index} className={styles.column}>
                    <Select
                      label={filter.name}
                      defaultValue={urlParams[filter.name]}
                      name={filter.name}
                      options={filter.options}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              type={"submit"}
              variant={
                isButtonEnable ? ButtonVariant.Default : ButtonVariant.Disabled
              }
            >
              Buscar
            </Button>
          </form>
          {isLoading && (
            <Skeleton
              count={5}
              /* highlightColor="#f00" baseColor="#ff9"  */
              containerClassName={styles.skeleton}
            />
          )}
          <main className={styles.list}>
            {data?.items.map((item, index) => (
              <Card
                key={index}
                href={`/pets/${item.id}`}
                text={`${item.name}-${item.type}`}
                thumb={item.photo}
              />
            ))}
          </main>
          <Pagination
            currentPage={page}
            totalPages={data?.totalPage}
            onPageChange={function (newPage: number): void {
              setPage(newPage);
              changePage(newPage);
            }}
          />
        </div>
      </Grid>
    </>
  );
};
