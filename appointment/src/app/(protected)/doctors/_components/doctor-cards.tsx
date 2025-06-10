import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  PencilIcon,
} from "lucide-react";

import { formatCurrencyInCents } from "@/_helpers/currency";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";

import { getAvailability } from "../_helpers/availability";
import UpsertDoctorForm from "./upsert-doctor";

interface DoctorCardsProps {
  doctor: typeof doctorsTable.$inferSelect;
}

const DoctorCards = ({ doctor }: DoctorCardsProps) => {
  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const availability = getAvailability(doctor);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm">{doctor.speciality}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {availability.from.format("dddd")} à {availability.to.format("dddd")}
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          {availability.from.format("HH:mm")} às{" "}
          {availability.to.format("HH:mm")}
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">
              <PencilIcon className="mr-1" />
              Ver detalhes
            </Button>
          </DialogTrigger>
          <UpsertDoctorForm />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCards;
