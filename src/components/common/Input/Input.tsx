import React, { InputHTMLAttributes, Ref } from "react";
import styles from "./Input.module.css";
interface IInput extends InputHTMLAttributes<HTMLElement> {
 label:string
}
//export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(

export const Input=React.forwardRef(({label,...rest}:IInput,ref:Ref<HTMLInputElement>) => {
  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <input ref={ref} {...rest} />
    </div>
  );
})

