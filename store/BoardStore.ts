import { ID, databases } from "@/appwrite";
import { create } from "zustand";

interface BoardState {
  board: Appointment;
  getBoard: () => void;
  setBoardState: (board: Appointment) => void;
  updateDB: (todo: Details, columnId: TypedColumn) => void;
  newAppointment: string;
  newAppointmentType: TypedColumn;
  date: Date;
  setNewAppointment: (input: string) => void;
  setNewAppointmentType: (columnId: TypedColumn) => void;
  addAppointment: (todo: string, columnId: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: { columns: new Map<TypedColumn, Column>() },
  newAppointment: "",
  newAppointmentType: "general",

  getBoard: async () => ({}),
}));
