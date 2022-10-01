import { FeedUser } from "@types/sanity/response";
import { getTimeSince } from "@utils/date";
import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "sanity-codegen";
import { Text } from "ui";
import { PostLike } from "./PostLike";

interface Props {
  children: React.ReactNode;
  user: FeedUser;
  createdAt: SanityDocument["_createdAt"];
  updatedAt?: SanityDocument["_updatedAt"];
  id: SanityDocument["_id"];
}

export const FeedPost = ({
  user,
  createdAt,
  updatedAt,
  children,
  id,
}: Props) => {
  return (
    <div className="bg-white p-4 rounded-sm">
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

      <div className="mt-4 space-y-4 flex-1">{children}</div>
    </div>
  );
};
