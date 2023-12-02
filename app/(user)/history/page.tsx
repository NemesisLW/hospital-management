"use client";
import { databases } from "@/appwrite";
import { Models, Query } from "appwrite";
import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState<Models.Document[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID!
      );
      setHistory(appointments.documents);
    };

    fetchAppointments();
  }, []);

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Appointment ID
            </th>
            <th scope="col" className="px-6 py-3">
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map((appointment) => (
            <tr
              key={appointment.$id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {appointment.$id}
              </th>
              <td className="px-6 py-4">{appointment.patient}</td>
              <td className="px-6 py-4">{appointment.doctor}</td>
              <td className="px-6 py-4">
                {capitalizeFirstLetter(appointment.category)}
              </td>
              <td className="px-6 py-4">
                {new Date(appointment.datetime).toLocaleString()}
              </td>
              <td className="px-6 py-4">{appointment.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
