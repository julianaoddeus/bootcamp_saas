import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().trim().min(3, { message: "Nome é obrigatório" }),
  speciality: z
    .string()
    .trim()
    .min(3, { message: "Especialidade é obrigatório" }),
  appointmentPrice: z
    .number()
    .min(1, { message: "Preço da consulta é obrigatório" }),
  availableFromWeekDays: z
    .number()
    .min(1, { message: "Dia da semana é obrigatório" }),
  availableToWeekDays: z
    .number()
    .min(1, { message: "Dia da semana é obrigatório" }),
  availableFromTime: z
    .string()
    .min(1, { message: "Horário de início é obrigatório" }),
  availableToTime: z
    .string()
    .min(1, { message: "Horário de término é obrigatório" }),
});

const UpsertDoctorForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      speciality: "",
      appointmentPrice: 0,
      availableFromWeekDays: 0,
      availableToWeekDays: 0,
      availableFromTime: "",
      availableToTime: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDoctorForm;
