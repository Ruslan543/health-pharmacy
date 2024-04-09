import styles from "./styles/Search.module.scss";

function Search() {
  return (
    <form className={styles.search}>
      <input className={styles.input} type="text" placeholder="Поиск..." />
    </form>
  );
}

export default Search;
