"use client";
import { db } from "@/firebase.config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    //push into firestore
    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_session"),
      {
        price: "price_si_OnlcsLNQYbMVzV",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    // Firestore Stripe Extension Code Block
    return onSnapshot(docRef, (snap) => {
      const data = snap.data;
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An Error occured: ${error.message}`);
        setLoading(false);
      }
    });
    //redirect to checkout page
  };
  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => createCheckoutSession()}
        className="mt-8 rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer disabled:opacity-80 disabled:bg-blue-600/50 disabled:text-white"
      >
        {loading ? <LoadingSpinner /> : "Sign Up"}{" "}
      </button>
    </div>
  );
}

export default CheckoutButton;
