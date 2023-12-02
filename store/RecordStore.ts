import { ID, databases, account } from "@/appwrite";
import { Appointment, Column, Record, TypedColumn } from "@/typings";
import { ISODateString } from "next-auth";
import { create } from "zustand";

interface RecordState {
  record: Record;
  setRecordState: (record: Record) => void;
  newAppointment: string;
  doctorName: string;
  patientName: string;
  newAppointmentType: TypedColumn;
  datetime: ISODateString;
  setNewAppointment: (input: string) => void;
  setDoctorName: (input: string) => void;
  setPatientName: (input: string) => void;
  setNewAppointmentType: (columnId: TypedColumn) => void;
  setDateTime: (input: ISODateString) => void;

  updateDB: (appointment: Appointment, columnId: TypedColumn) => void;
  addAppointment: (
    appointmentTitle: string,
    columnId: TypedColumn,
    patientName: string,
    doctorName: string,
    dateTime: ISODateString
  ) => void;
}

export const useRecordStore = create<RecordState>((set, get) => ({
  record: { columns: new Map<TypedColumn, Column>() },
  newAppointment: "",
  newAppointmentType: "general",
  patientName: "",
  doctorName: "",
  datetime: "1970-01-01T00:00:00.000Z",

  setRecordState: (record) => set({ record }),

  setNewAppointment(input: string) {
    set({ newAppointment: input });
  },
  setDoctorName(input: string) {
    set({ doctorName: input });
  },
  setPatientName(input: string) {
    set({ patientName: input });
  },
  setDateTime(input: ISODateString) {
    set({ datetime: input });
  },

  setNewAppointmentType(columnId: TypedColumn) {
    set({ newAppointmentType: columnId });
  },

  async updateDB(appointment, columnId) {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID!,
      appointment.$id,
      {
        title: appointment.title,
        category: columnId,
        datetime: appointment.datetime,
        patient: appointment.patient,
        doctor: appointment.doctor,
      }
    );
  },

  async addAppointment(
    appointmentTitle,
    columnId,
    patientName,
    doctorName,
    dateTime
  ) {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        title: appointmentTitle,
        category: columnId,
        datetime: dateTime,
        patient: patientName,
        doctor: doctorName,
      }
    );

    set({
      newAppointment: "",
      doctorName: "",
      patientName: "",
      datetime: "1970-01-01T00:00:00.000Z",
    });
  },
}));
