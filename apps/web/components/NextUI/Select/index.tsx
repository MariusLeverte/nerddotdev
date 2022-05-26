import { Container, Text } from "@nextui-org/react";
import { ChangeEventHandler } from "react";
import styles from "./styles.module.css";

interface SelectProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: (string | undefined)[] | undefined;
  label: string;
  name: string;
}

const Select = ({ onChange, options, label, name }: SelectProps) => {
  return (
    <Container
      fluid
      css={{ padding: 0, flex: "1 1 auto", flexDirection: "column" }}
      display="flex"
    >
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.select}>
        <select name={name} onChange={onChange}>
          <option value="">Velg</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
};

export default Select;
