import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import { ButtonVariant } from "./Button.constants";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  variant = ButtonVariant.Default,
  children,
  ...rest
}: IButton) => {
  let buttonClass = `${styles.buttonBase} ${styles[`button${variant}`]}`;   
/*    switch (variant) {
    case ButtonVariant.Default:
      buttonClass += `${styles.buttonDefault}`;
      break;
    case ButtonVariant.Outlined:
      buttonClass += `${styles.buttonOutlined}`;
      break;
    case ButtonVariant.Text:
      buttonClass += `${styles.buttonText}`;
      break;
    case ButtonVariant.Disabled:
      buttonClass += `${styles.buttonDisabled}`;
      break;
  }   */
  return (
    <button {...rest} className={buttonClass}>
      {children}
    </button>
  );
};
