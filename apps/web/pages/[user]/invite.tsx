import { Button, Container, Modal, Spacer, Text } from "@nextui-org/react";
import Meta from "../../components/SEO/Meta";
import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";
import { REFERRAL_URL } from "../../constants";
import QRCode from "react-qr-code";
import { useFirebaseUser } from "../../libs/firebase/FirebaseAuthProvider";

const Invite = () => {
  const { user, referrals } = useFirebaseUser();
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);

  const unusedCode = useMemo(() => {
    if (!referrals) return null;

    return referrals.find((r) => !r.claimed);
  }, [referrals]);

  const handleGetCode = async () => {
    if (code) {
      setVisible(true);
      return;
    }

    if (unusedCode) {
      setCode(unusedCode.code);
      setVisible(true);
      return;
    }

    try {
      const idToken = await user?.getIdToken();
      const result = await fetch("/api/user/referral", {
        headers: {
          Authorization: `bearer ${idToken}`,
        },
      });
      const { code } = await result.json();
      setCode(code);
      setVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!visible) return;

    confetti();
  }, [visible]);

  const referralUrl = REFERRAL_URL + `?kode=${code}`;

  return (
    <>
      <Meta title="Inviter" noIndex />
      <Container css={{ height: "100vh" }} display="flex" alignItems="center">
        <Container
          css={{ textAlign: "center", flexDirection: "column" }}
          display="flex"
          justify="center"
        >
          <Text
            h2
            weight="light"
            size="$md"
            css={{
              lineHeight: 1,
              "@md": {
                fontSize: 46,
              },
            }}
          >
            Del med flere
          </Text>
          <Text
            h1
            weight="bold"
            size="$lg"
            css={{
              textTransform: "uppercase",
              letterSpacing: 6,
              "@md": {
                fontSize: 60,
              },
            }}
          >
            utviklere
          </Text>
          <Spacer y={2} />
          <Container display="flex" justify="center">
            <Button
              color="gradient"
              rounded
              onPress={handleGetCode}
              disabled={!user?.uid}
            >
              Få invitasjonskode
            </Button>
          </Container>
          <Spacer y={1} />
          <Text size="$xs">
            Du kan bare invitere én om gangen, så hver kode fungerer for bare én
            person
          </Text>
        </Container>
      </Container>
      <Modal open={visible} onClose={() => setVisible(false)} closeButton>
        <Modal.Body>
          <Spacer y={1} />
          <Container
            fluid
            display="flex"
            css={{ flexDirection: "column", padding: 0 }}
            alignItems="center"
          >
            <QRCode value={referralUrl} />
            <Spacer y={1} />
            <Text weight="medium">{referralUrl}</Text>
          </Container>
          <Spacer y={1} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Invite;
