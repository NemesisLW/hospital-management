"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import LoadingSpinner from "../LoadingSpinner";
import { v4 as uuidv4 } from "uuid";

function CreateChat({ isLarge }: { isLarge?: boolean }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "We are working on your session, survive a little longer.",
      duration: 3000,
    });

    // uuid chatID
    const chatId = uuidv4();
    // router.push(`/chat/${chatId}`);
  };

  if (isLarge) {
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : "Create a New Chat"}
        </Button>
      </div>
    );
  }
  return (
    <Button variant={"ghost"}>
      <MessageSquarePlus />
    </Button>
  );
}

export default CreateChat;
