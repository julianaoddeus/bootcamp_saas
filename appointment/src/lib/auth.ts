import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { usersToClinicsTable } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: schema,
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      try {
        const clinics = await db.query.usersToClinicsTable.findMany({
          where: eq(usersToClinicsTable.userId, user.id),
          with: {
            clinic: true,
          },
        });

        const data = clinics?.[0];

        // Se não tem clínica, retorna undefined para clinic
        // O sistema irá redirecionar para /clinic
        return {
          user: {
            ...user,
            clinic: data?.clinicId
              ? {
                  id: data?.clinicId,
                  name: data?.clinic?.name,
                }
              : undefined,
          },
          session,
        };
      } catch (error) {
        console.error("Erro ao buscar clínicas do usuário:", error);
        // Em caso de erro na busca, também retorna undefined para clinic
        return {
          user: {
            ...user,
            clinic: undefined,
          },
          session,
        };
      }
    }),
  ],
  user: {
    modelName: "usersTable",
  },
  session: {
    modelName: "sessionsTable",
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});
