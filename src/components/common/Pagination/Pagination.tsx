import styles from "./Pagination.module.css";
interface IPagination {
  currentPage: number;
  totalPages?: number;
  onPageChange: (newPage:number) => void;
}
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPagination) => {
  const pageNumber = Array.from({ length: totalPages||1 }, (_, i) => i + 1);
  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumber.map((number) => {
          return (
            <li
              key={number}
              className={`${currentPage === number ? styles.active : null}`}
            >
              <button onClick={()=>{
                onPageChange(number)
              }}>{number}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
