import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { UpsertDoctorSchema, upsertDoctorSchema } from "./schema";

export const upsertDoctor = async (data: UpsertDoctorSchema) => {
  upsertDoctorSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  if (!session.user.clinic?.id) {
    throw new Error("Clinic not found");
  }

  await db
    .insert(doctorsTable)
    .values({
      ...data,
      clinicId: session.user.clinic.id,
    })
    .onConflictDoUpdate({
      target: [doctorsTable.id],
      set: {
        ...data,
      },
    });
};
