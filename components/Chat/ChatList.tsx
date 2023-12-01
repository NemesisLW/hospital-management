import { authOptions } from "@/auth";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import ChatListRows from "./ChatListRows";

async function ChatList() {
  const session = await getServerSession(authOptions);

  //   const chatsSnapShot = await getDocs(
  //     chatMembersCollectionGroupRef(session?.user.id)
  //   );

  //   const initialChats = chatsSnapShot.docs.map((doc) => ({
  //     ...doc.data(),
  //   }));
  return <ChatListRows initialChats={initialChats} />;
}

export default ChatList;
