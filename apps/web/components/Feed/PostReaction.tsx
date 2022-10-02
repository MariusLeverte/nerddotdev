import { useFirebaseUser } from "@libs/firebase/FirebaseAuthProvider";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SanityDocument } from "sanity-codegen";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "@libs/firebase/initFirebase";
import { useCallback } from "react";
import { Text } from "ui";

interface Props {
  id: SanityDocument["_id"];
}

export const PostReaction = ({ id }: Props) => {
  const { user } = useFirebaseUser();
  const [value, loading, error] = useCollection(
    query(collection(firestore, "reactions"), where("post", "==", id))
  );
  const count = value?.docs.length || 0;
  const liked = value?.docs.find((doc) => doc.data().user === user?.uid);

  const handleReaction = useCallback(async () => {
    try {
      if (liked) {
        await deleteDoc(doc(firestore, "reactions", liked.id));
      } else {
        await addDoc(collection(firestore, "reactions"), {
          post: id,
          type: "heart",
          user: user?.uid,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, liked, user]);

  return (
    <button
      className="inline-flex items-center px-2 rounded-full gap-1 hover:bg-slate-100"
      onClick={handleReaction}
      disabled={loading || !!error}
    >
      {liked ? <AiFillHeart className="text-red-400" /> : <AiOutlineHeart />}{" "}
      <Text className="text-xs">{count}</Text>
    </button>
  );
};
