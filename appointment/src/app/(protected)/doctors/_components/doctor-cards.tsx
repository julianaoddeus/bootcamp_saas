import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { CalendarIcon, PencilIcon } from "lucide-react";

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

import UpsertDoctorForm from "./upsert-doctor";

interface DoctorCardsProps {
  doctor: typeof doctorsTable.$inferSelect;
}

const DoctorCards = ({ doctor }: DoctorCardsProps) => {
  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar>
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
      <CardContent className="gap1 flex flex-col">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          Segunda à Sexta
        </Badge>
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          Segunda à Sexta
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
