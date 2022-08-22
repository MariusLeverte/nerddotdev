import { useAtom } from "jotai";
import Lottie from "lottie-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Text } from "ui";
import useSanityData from "../../hooks/useSanityData";
import { userById } from "../../libs/sanity/queries";
import { User } from "../../types/sanity";
import { alertAtom } from "../Alerts/AlertProvider";

interface Props {
  code: string;
  user?: string;
}

const UserInviteCodeCard = ({ code, user }: Props) => {
  const router = useRouter();
  const [alert, setAlert] = useAtom(alertAtom);

  const { data, fetchData } = useSanityData<User>(
    {
      query: userById,
      params: { user: user },
    },
    false,
    true
  );

  useEffect(() => {
    if (!user) return;

    fetchData();
  }, [user, fetchData]);

  const handleOnClick = () => {
    if (user) {
      router.push(`/${data?.slug?.current}`);
      return;
    }
    if (code) {
      navigator.clipboard.writeText(code).then(
        () => {
          setAlert({ type: "success", text: "Koden er kopiert" });
        },
        () => {
          setAlert({ type: "error", text: "Kunne ikke kopiere" });
        }
      );
    }
  };

  return (
    <div className="flex items-center w-full bg-white rounded-lg px-4 py-2">
      <div className="h-10 w-10 overflow-hidden rounded-full">
        {data?.photo?.photoURL ? (
          <Image
            src={data?.photo.photoURL}
            alt={data.name || ""}
            width={80}
            height={80}
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <Lottie
            animationData={require("../../lottie/28611-avatar.json")}
            loop={false}
            style={{ width: "100%", height: "100%" }}
          />
        )}
        <Lottie
          animationData={require("../../lottie/28611-avatar.json")}
          loop={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="flex justify-between pl-4 pr-0 flex-1">
        <Text weight="light" className="text-xl">
          {data?.name || code}
        </Text>

        <Button
          size="sm"
          rounded="full"
          color={user ? "transparent" : "primary"}
          onClick={() => handleOnClick()}
        >
          <Text className="text-xs">{user ? "Se profil" : "Kopier koden"}</Text>
        </Button>
      </div>
    </div>
  );
};

export default UserInviteCodeCard;
