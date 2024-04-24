import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";


export function Sidebar() {
  const validate = (event: React.MouseEvent) => {
    const canAccess = false;
    if (canAccess) {
      event.preventDefault();
    }

  };
  return (
    <nav className={styles.sidebar}>
      <Toaster />
      <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.active : '')} end>Meu abrigo</NavLink>
      <NavLink to="/admin/pets" onClick={validate} className={({ isActive }) => (isActive ? styles.active : '')}> Pets </NavLink>
      <NavLink to="/">Sair</NavLink>
    </nav>
  );
}
