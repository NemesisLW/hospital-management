"use client";
import { databases } from "@/appwrite";
import { Models, Query } from "appwrite";
import { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState<Models.Document[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctors = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        [Query.equal("role", ["Doctor"])]
      );
      setDoctors(doctors.documents);
    };

    fetchDoctors();
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
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Specialisation
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr
              key={doctor.$id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {doctor.$id}
              </th>
              <td className="px-6 py-4">{doctor.name}</td>
              <td className="px-6 py-4">
                {capitalizeFirstLetter(doctor.specialization)}
              </td>
              <td className="px-6 py-4">{doctor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
