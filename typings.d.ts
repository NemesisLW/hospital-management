interface AppointmentRecord {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "general" | "bone" | "heart" | "eye" | "kidney";
type authType = "login" | "register";
type role = "doctor" | "patient" | null;

interface Column {
  id: TypedColumn;
  appointments: Appointment[];
}

interface Appointment {
  $id: string;
  $createdAt: string;
  title: string;
  category: TypedColumn;
  datetime: Date;
  patient: string;
  doctor: string;
}
