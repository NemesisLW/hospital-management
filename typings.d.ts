interface Appointment {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "general" | "bone" | "heart" | "eye" | "kidney";
type authType = "login" | "register";

interface Column {
  id: TypedColumn;
  appointments: Details[];
}

interface Details {
  $id: string;
  $createdAt: string;
  title: string;
  category: TypedColumn;
  datetime: Date;
  patient: string;
  doctor: string;
}
