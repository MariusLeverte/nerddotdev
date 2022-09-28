import Image from "next/image";
import Link from "next/link";
import { Card, Text } from "ui";
import { SkillUser } from "../../types/sanity";

interface Props {
  users: SkillUser[];
}

export const UsersListCard = ({ users }: Props) => {
  return (
    <Card>
      <ul className="lg:space-y-4">
        {users.map((user) => (
          <li key={user.name}>
            <Link href={`/${user.slug?.current || ""}`}>
              <a className="flex gap-4 items-center">
                <Image
                  src={user.photo?.photoURL || ""}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-xl"
                />

                <Text weight="semibold" className="hidden lg:block">
                  {user.name}
                </Text>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
};
