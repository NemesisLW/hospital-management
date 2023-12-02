import { ID, databases, account } from "@/appwrite";
import { create } from "zustand";

interface RecordState {
  record: AppointmentRecord;
  setRecordState: (record: AppointmentRecord) => void;
  newAppointment: string;
  doctorName: string;
  patientName: string;
  newAppointmentType: TypedColumn;
  datetime: Date;
  setNewAppointment: (input: string) => void;
  setDoctorName: (input: string) => void;
  setPatientName: (input: string) => void;
  setNewAppointmentType: (columnId: TypedColumn) => void;
  setDateTime: (input: Date) => void;

  updateDB: (appointment: Appointment, columnId: TypedColumn) => void;
  addAppointment: (
    appointmentTitle: string,
    columnId: TypedColumn,
    patientName: string,
    doctorName: string,
    dateTime: Date
  ) => void;
}

export const useRecordStore = create<RecordState>((set, get) => ({
  record: { columns: new Map<TypedColumn, Column>() },
  newAppointment: "",
  newAppointmentType: "general",
  patientName: "",
  doctorName: "",
  datetime: new Date(),

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
  setDateTime(input: Date) {
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
      datetime: new Date(),
    });
  },
}));
