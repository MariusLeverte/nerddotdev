import { AiFillGithub } from "react-icons/ai";
import { Button, Container } from "ui";
import Lottie from "lottie-react";
import Image from "next/image";

interface GithubProps {
  onAuth: () => void;
  photoUrl?: string | null;
  displayName?: string | null;
  loading?: boolean;
}

const Github = ({
  onAuth,
  photoUrl,
  displayName,
  loading = false,
}: GithubProps) => {
  return (
    <Container className="space-y-6 flex items-center flex-col" width="sm">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={displayName || ""}
          width={160}
          height={160}
          objectFit="cover"
          className="rounded-full"
        />
      ) : (
        <AiFillGithub size={80} />
      )}

      <Button onClick={onAuth} rounded="full">
        {loading ? (
          <Lottie
            animationData={require("../../lottie/9904-bouncy-cartoon-ball-loader.json")}
            style={{ height: 24 }}
          />
        ) : (
          <> {displayName ? `Hei ${displayName}` : "Logg inn"}</>
        )}
      </Button>
    </Container>
  );
};

export default Github;
