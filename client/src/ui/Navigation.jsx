import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <a href="/" className={styles.logoLink}>
        <img className={styles.logo} src="/logo.svg" alt="Логотип компании" />
      </a>

      <ul className="navigation__list">
        <li className="navigation__item">
          <a href="/about.html" className="navigation__link">
            О нас
          </a>
        </li>

        <li className="navigation__item">
          <a href="/products.html" className="navigation__link">
            Продукция
          </a>
        </li>

        <li className="navigation__item">
          <a href="#contacts" className="navigation__link">
            Контакты
          </a>
        </li>
      </ul>

      <form className="navigation__search search">
        <input className="search__input" type="text" placeholder="Поиск..." />
      </form>

      <div className="navigation__auth auth-navigation">
        <a href="/registration.html" className="auth-navigation__signup">
          Регистрация
        </a>

        <a href="/signin.html" className="btn-primary">
          Войти
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
