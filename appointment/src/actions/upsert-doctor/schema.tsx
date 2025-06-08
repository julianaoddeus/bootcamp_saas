import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().optional(),
    clinicId: z.string().uuid(),
    name: z.string().trim().min(3, { message: "Nome é obrigatório" }),
    speciality: z
      .string()
      .trim()
      .min(3, { message: "Especialidade é obrigatório" }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" }),
    availableFromWeekDays: z.number().min(0).max(6),
    availableToWeekDays: z.number().min(0).max(6),
    availableFromTime: z
      .string()
      .min(1, { message: "Horário de início é obrigatório" }),
    availableToTime: z
      .string()
      .min(1, { message: "Horário de término é obrigatório" }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "Horário de início não pode ser maior que o horário de término",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
