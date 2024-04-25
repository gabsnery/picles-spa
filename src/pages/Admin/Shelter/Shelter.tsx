import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel";
import { useForm } from "react-hook-form";
import styles from "./Shelter.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { updateShelter } from "../../../services/shelter/updateShelter";
import { Toaster, toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useShelter } from "../../../hooks/useShelter";
import { useEffect } from "react";
const shelterSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ser maior que 2 caracteres")
    .max(30, "Nome deve ser menor que 30 caractes"),
  email: z.string().email("Campo deve ser email"),
  phone: z.string().refine(
    (value) => {
      const digits = value.replace(/\D/g, "").length;
      console.log("🚀 ~ digits:", digits);
      return digits >= 10 && digits <= 11;
    },
    { message: "Numero deve ter entre 10 e 11 caracteres" }
  ),
  whatsApp: z.string().refine(
    (value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 11;
    },
    { message: "Numero deve ter entre 10 e 11 caracteres" }
  ),
});

type ShelterSchema = z.infer<typeof shelterSchema>;
export const Shelter = () => {
  const { data: shelterData } = useShelter();
  const { handleSubmit, register, formState, setValue } =
    useForm<ShelterSchema>({
      resolver: zodResolver(shelterSchema),
    });
  useEffect(() => {
    if(shelterData){

      setValue("name", shelterData.shelterName);
      setValue("email", shelterData.shelterEmail);
      setValue("phone", shelterData.shelterPhone);
      setValue("whatsApp", shelterData.shelterWhatsApp);
    }
  }, [shelterData]);
  const registerWithMask = useHookFormMask(register);
  const queryClient = useQueryClient();

  const submit = async (props: ShelterSchema) => {
    const toastId = toast.loading("Salvando dados");
    try {
      await updateShelter({
        ...props,
        whatsApp: props.whatsApp.replace(/\D/g, ""),
        phone: props.phone.replace(/\D/g, ""),
      });
      toast.success("Dados salvos com sucesso", {
        id: toastId,
        closeButton: true,
      });
      queryClient.invalidateQueries({ queryKey: ["get-shelter"] });
    } catch {
      toast.error("Erro ao salvar dados", {
        id: toastId,
        closeButton: true,
      });
    }
  };
  return (
    <Panel>
      <form className={styles.container} onSubmit={handleSubmit(submit)}>
        <Input label={"Nome"} {...register("name")} />
        {formState.errors.name && (
          <p className={styles.formError}>{formState.errors.name.message}</p>
        )}
        <Input label={"Email"} {...register("email")} />
        {formState.errors.email && (
          <p className={styles.formError}>{formState.errors.email.message}</p>
        )}
        <Input
          label={"Telefone"}
          {...registerWithMask("phone", ["99 9999-9999", "99 99999-9999"])}
        />
        {formState.errors.phone && (
          <p className={styles.formError}>{formState.errors.phone.message}</p>
        )}
        <Input
          label={"WhatsApp"}
          {...registerWithMask("whatsApp", ["99 [9]9999-9999"])}
        />
        {formState.errors.whatsApp && (
          <p className={styles.formError}>
            {formState.errors.whatsApp.message}
          </p>
        )}
        <Button type="submit">Salvar dados</Button>
      </form>
    </Panel>
  );
};
