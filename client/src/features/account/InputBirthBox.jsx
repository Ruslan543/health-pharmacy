import PropTypes from "prop-types";
import styles from "./styles/FormAccount.module.scss";

function InputBirthBox({ options }) {
  const { birthday, dateOfBirth, yearBirth } = options.inputs;

  return (
    <div className={styles.inputBirthBox}>
      <div className={styles.inputBoxBirthday}>
        <input
          className={styles.inputBirthday}
          id="birthday"
          name="birthday"
          type="number"
          placeholder="11"
          value={birthday.value}
          onChange={birthday.onChange}
        />
      </div>

      <div className={styles.lineVertical} />

      <div className={styles.selectBox}>
        <select
          className={styles.select}
          name="date-of-birth"
          value={dateOfBirth.value}
          onChange={dateOfBirth.onChange}
        >
          <option disabled>Выберите месяц</option>
          <option value="Январь">Январь</option>
          <option value="Февраль">Февраль</option>
          <option value="Март">Март</option>
          <option value="Апрель">Апрель</option>
          <option value="Май">Май</option>
          <option value="Июнь">Июнь</option>
          <option value="Июль">Июль</option>
          <option value="Август">Август</option>
          <option value="Сентябрь">Сентябрь</option>
          <option value="Октябрь">Октябрь</option>
          <option value="Ноябрь">Ноябрь</option>
          <option value="Декабрь">Декабрь</option>
        </select>
      </div>

      <div className={styles.lineVertical} />

      <div className={styles.inputBoxYearBirth}>
        <input
          className={styles.inputYearBirth}
          id="year-of-birth"
          name="year-of-birth"
          type="number"
          placeholder="2004"
          value={yearBirth.value}
          onChange={yearBirth.onChange}
        />
      </div>
    </div>
  );
}

InputBirthBox.propTypes = {
  options: PropTypes.object,
};

export default InputBirthBox;
