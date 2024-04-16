import { useState } from "react";
import { Button } from "./components/common";
import { ButtonVariant } from "./components/common/Button/Button.constants";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {count}
      <Button variant={ButtonVariant.Default} onClick={() => setCount((count) => count + 1)}>
        Quero adotar!
      </Button>
      <Button variant={ButtonVariant.Outlined} onClick={() => setCount((count) => count + 1)}>
        Tenho um abrigo!
      </Button>
    </>
  );
}
