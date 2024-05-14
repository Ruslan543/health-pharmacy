import PropTypes from "prop-types";
import { NUM_YEAR } from "../../utils/constans";
import { getDaysInMonth } from "../../utils/helper";
import styles from "./styles/FormAccount.module.scss";

function InputBirthBox({ options }) {
  const currentYear = new Date().getFullYear();
  const { birthday, dateOfBirth, yearBirth } = options.inputs;

  const daysArray = Array.from(
    { length: getDaysInMonth(dateOfBirth.value, yearBirth.value) },
    (_, index) => index + 1
  );
  const yearsArray = Array.from(
    { length: NUM_YEAR },
    (_, index) => currentYear - index
  );

  return (
    <div className={styles.inputBirthBox}>
      <div className={styles.inputBoxBirthday}>
        <select
          className={styles.inputBirthday}
          name="birthday"
          value={birthday.value}
          onChange={birthday.onChange}
        >
          <option disabled>Выберите день</option>

          {daysArray.map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
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
        <select
          className={styles.inputYearBirth}
          name="year-of-birth"
          value={yearBirth.value}
          onChange={yearBirth.onChange}
        >
          <option disabled>Выберите год</option>

          {yearsArray.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

InputBirthBox.propTypes = {
  options: PropTypes.object,
};

export default InputBirthBox;
