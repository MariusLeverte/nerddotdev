import {
  Button,
  Container,
  Image,
  Loading,
  Spacer,
  User,
} from "@nextui-org/react";
import { AiFillGithub } from "react-icons/ai";
import { UpdatePasswordHook } from "react-firebase-hooks/auth";

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
    <Container
      sm
      alignItems="center"
      justify="center"
      display="flex"
      direction="column"
      className="space-x-6"
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={displayName || ""}
          width={80}
          height={80}
          objectFit="cover"
          css={{ borderRadius: 80 }}
        />
      ) : (
        <AiFillGithub size={80} />
      )}

      <Spacer x={2} />
      <Button css={{ backgroundColor: "#030303" }} rounded onClick={onAuth}>
        {loading ? (
          <Loading type="points" color="currentColor" size="sm" />
        ) : (
          <> {displayName ? `Hei ${displayName}` : "Logg inn"}</>
        )}
      </Button>
    </Container>
  );
};

export default Github;
