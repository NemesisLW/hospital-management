"use client";

import { CalendarPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import LoadingSpinner from "../LoadingSpinner";
import { v4 as uuidv4 } from "uuid";

import { useModalStore } from "@/store/ModalStore";
import { useRecordStore } from "@/store/RecordStore";

function CreateAppointment({ isLarge }: { isLarge?: boolean }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [openModal] = useModalStore((state) => [state.openModal]);
  const [setNewAppointmentType] = useRecordStore((state) => [
    state.setNewAppointmentType,
  ]);

  const handleAdd = () => {
    setNewAppointmentType("general");
    openModal();
  };

  const createNewAppointment = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    toast({
      title: "Creating new appointment...",
      description: "We are working on your session, survive a little longer.",
      duration: 3000,
    });

    // uuid appointmentID
    const appointmentId = uuidv4();
    // router.push(`/chat/${chatId}`);
  };

  if (isLarge) {
    return (
      <div>
        <Button variant={"default"} onClick={createNewAppointment}>
          {loading ? <LoadingSpinner /> : "Create a New Appointment"}
        </Button>
      </div>
    );
  }
  return (
    <Button variant={"ghost"} title="Book An Appointment">
      <CalendarPlus onClick={handleAdd} />
    </Button>
  );
}

export default CreateAppointment;
