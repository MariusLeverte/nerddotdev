import { FeedUser } from "@types/sanity/response";
import { getTimeSince } from "@utils/date";
import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "sanity-codegen";
import { Card, Text } from "ui";

interface Props {
  children: React.ReactNode;
  user: FeedUser;
  createdAt: SanityDocument["_createdAt"];
  updatedAt?: SanityDocument["_updatedAt"];
}

export const FeedCard = ({ user, createdAt, updatedAt, children }: Props) => {
  return (
    <Card>
      <div>
        <Link href={`/${user.slug?.current || ""}`}>
          <a className="flex gap-4 items-center">
            <Image
              src={user.photo?.photoURL || ""}
              alt={user.name}
              width={50}
              height={50}
              className="rounded-xl"
            />
            <div>
              <Text weight="semibold">{user.name}</Text>
              <Text className="text-xs opacity-40" weight="light">
                {updatedAt ? "Redigert" : "Postet"}{" "}
                {getTimeSince(updatedAt || createdAt)}
              </Text>
            </div>
          </a>
        </Link>
      </div>
      <div className="mt-6 space-y-4">{children}</div>
    </Card>
  );
};
