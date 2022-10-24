import { useEffect, useState } from "react";
import styles from "./select.module.css";
type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[] | undefined) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [higlightedIndex, setHighlightedIndex] = useState(0);

  const clearValue = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if( multiple) {
      if(value.includes(option)){
        onChange(value.filter(value => value.label === option.label))
      }else {
        onChange([...value, option])
      }
    }
    multiple ? onChange([]) : onChange(option);
    setIsOpen(false);
  };

  const isOptionSelected = (option: SelectOption) => {

    return multiple ? value.includes(option) : option === value;
  };

  const highlightOnHover = (index: number) => {
    setHighlightedIndex(index);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearValue();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option: SelectOption, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
            }}
            onMouseEnter={() => highlightOnHover(index)}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${higlightedIndex === index ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
