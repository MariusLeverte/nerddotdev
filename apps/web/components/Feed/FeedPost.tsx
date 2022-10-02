import useUser from "@hooks/useUser";
import { useFirebaseUser } from "@libs/firebase/FirebaseAuthProvider";
import { FeedShare, FeedUser } from "@types/sanity/response";
import { getTimeSince } from "@utils/date";
import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "sanity-codegen";
import { Tag, Text } from "ui";
import { PostReaction } from "./PostReaction";

interface Props {
  children: React.ReactNode;
  user: FeedUser;
  createdAt: SanityDocument["_createdAt"];
  updatedAt?: SanityDocument["_updatedAt"];
  id: SanityDocument["_id"];
  category: FeedShare["category"];
  skill: FeedShare["skills"];
}

export const FeedPost = ({
  user,
  createdAt,
  updatedAt,
  children,
  id,
  category = [],
}: Props) => {
  return (
    <div className="bg-white p-4 rounded-sm item">
      <div className="flex items-start gap-4">
        <Link href={`/${user.slug?.current || ""}`}>
          <a className="shrink-0">
            <Image
              src={user.photo?.photoURL || ""}
              alt={user.name}
              width={50}
              height={50}
              className="rounded-full flex-1"
            />
          </a>
        </Link>
        <div>
          <Link href={`/${user.slug?.current || ""}`}>
            <a className="flex gap-4 items-center">
              <Text weight="semibold">{user.name}</Text>
            </a>
          </Link>
          <Text className="text-xs opacity-40" weight="light">
            {updatedAt ? "Redigert" : "Postet"}{" "}
            {getTimeSince(updatedAt || createdAt)}
          </Text>
        </div>
      </div>

      <div className="mt-4 space-y-4 flex-1">
        <div>
          {category?.map((c) => (
            <Tag text={c.name || ""} key={c._id} />
          ))}
        </div>
        <div>{children}</div>
      </div>
      <div className="mt-4">
        <PostReaction id={id} />
      </div>
    </div>
  );
};
