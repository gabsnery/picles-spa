import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel";

export const Shelter = () => {
  return (
    <Panel>
      <form>
        <Input label={"Nome"} />
        <Input label={"Tipo"} />
        <Input label={"WhatsApp"} />
        <Button type="submit">Salvar dados</Button>
      </form>
    </Panel>
  );
};
