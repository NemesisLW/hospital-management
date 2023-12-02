import { ISODateString } from "next-auth";

interface Record {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "general" | "bone" | "heart" | "eye" | "kidney";
type authType = "login" | "register";
type role = "doctor" | "patient";

interface Column {
  id: TypedColumn;
  appointments: Appointment[];
}

interface Appointment {
  $id: string;
  $createdAt: string;
  title: string;
  category: TypedColumn;
  datetime: ISODateString;
  patient: string;
  doctor: string;
}
