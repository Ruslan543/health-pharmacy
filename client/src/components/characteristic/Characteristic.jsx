import CharacteristicItem from "./CharacteristicItem";
import styles from "./Characteristic.module.scss";

function Characteristic() {
  return (
    <section className={styles.characteristic}>
      <ul className={styles.list}>
        <CharacteristicItem
          characteristic={{
            image: "/icon-money.svg",
            imageAlt: "Значок денег",
            title: "Доступные цены",
            text: "Работаем напрямую с ведущими производителями",
          }}
        />
        <CharacteristicItem
          characteristic={{
            image: "/icon-quality.svg",
            imageAlt: "Значок качества",
            title: "Качество товара",
            text: "Гарантия подлинности препаратов",
          }}
        />
        <CharacteristicItem
          characteristic={{
            image: "/icon-medicaments.svg",
            imageAlt: "Значок медикаментов",
            title: "Широкий ассортимент",
            text: "Удовлетворим любой спрос",
          }}
        />
        <CharacteristicItem
          characteristic={{
            image: "/icon-peoples.svg",
            imageAlt: "Значок людей",
            title: "Клиентский сервис",
            text: "Квалифицированный персонал",
          }}
        />
      </ul>
    </section>
  );
}

export default Characteristic;
