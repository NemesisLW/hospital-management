"use client";
import { databases } from "@/appwrite";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";
import { Models, Query } from "appwrite";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { Suspense } from "react";

const montserrat = Montserrat({ weight: ["700"], subsets: ["latin"] });

function Doctors() {
  const DoctorList = async () => {
    const doctors = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [Query.equal("role", ["Doctor"])]
    );
    const list = doctors.documents;

    return (
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
          {list.map((doctor) => (
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
    );
  };

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <label>
        <p
          className={cn(
            "text-2xl font-bold text-gray-900 dark:text-white px-2 py-3",
            montserrat.className
          )}
        >
          Doctor&apos; List
        </p>
      </label>
      <Suspense fallback={<LoadingSpinner />}>
        <DoctorList />
      </Suspense>
    </div>
  );
}

export default Doctors;
