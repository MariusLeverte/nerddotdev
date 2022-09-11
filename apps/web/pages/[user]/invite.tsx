import Meta from "../../components/SEO/Meta";
import { useMemo, useState } from "react";
// import { REFERRAL_URL } from "../../constants";
import { useFirebaseUser } from "../../libs/firebase/FirebaseAuthProvider";
import { Button, Container, Text } from "ui";
import Star from "../../components/Lottie/Star";
import UserInviteCodeCard from "../../components/Cards/UserInviteCodeCard";
import { REFERRAL_URL } from "../../constants";
import QRCode from "react-qr-code";
import { MobileOnlyView } from "react-device-detect";

const Invite = () => {
  const { user, referrals } = useFirebaseUser();
  const [code, setCode] = useState("");

  const unusedCode = useMemo(() => {
    if (!referrals) return null;

    return referrals.find((r) => !r.claimed);
  }, [referrals]);

  const handleGetCode = async () => {
    if (code) {
      return;
    }

    if (unusedCode) {
      setCode(unusedCode.code);
      return;
    }

    try {
      const idToken = await user?.getIdToken();
      const result = await fetch("/api/user/invite", {
        headers: {
          Authorization: `bearer ${idToken}`,
        },
      });
      const { code } = await result.json();
      setCode(code);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Del Nerd.dev kode",
          url: referralUrl,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    }
  };

  const claimedInvites = referrals?.filter((referral) => referral.claimed);
  const generatedCode =
    code || referrals?.find((referral) => !referral.claimed)?.code;

  const referralUrl = REFERRAL_URL + `?code=${generatedCode}`;

  return (
    <>
      <Meta title="Inviter" noIndex />
      <Container className="min-h-full flex mt-20 mb-10" width="md">
        <Container padding={false}>
          <div className="text-center">
            <Text as="h1" weight="bold" className="text-2xl lg:text-4xl">
              Del med flere{" "}
              <Text as="span" weight="light">
                utviklere
              </Text>
            </Text>
            <Text as="h2" className="text-md lg:text-xl mt-6" weight="light">
              Start med å generere unik kode
            </Text>
            <Text className="text-sm" weight="light">
              Du kan bare invitere én om gangen, så hver kode fungerer for bare
              én person
            </Text>
          </div>
          <Container
            className="flex items-center flex-col mt-10"
            padding={false}
          >
            <Button
              onClick={handleGetCode}
              disabled={Boolean(generatedCode) || !user}
              color={generatedCode ? "success" : "secondary"}
              animated
            >
              <div className="flex">
                Få invitasjonskode{" "}
                <Star
                  className="w-6"
                  play={Boolean(generatedCode)}
                  loop={false}
                />
              </div>
            </Button>
            <Container width="xs" className="mt-6" padding={false}>
              {generatedCode && (
                <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg my-8">
                  <div className="flex justify-center">
                    <QRCode value={referralUrl} size={320} />
                  </div>

                  <div className="py-5 text-center">
                    <Text weight="bold" className="text-2xl">
                      {generatedCode}
                    </Text>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {referralUrl}
                    </span>
                    <MobileOnlyView>
                      <div>
                        <Button onClick={handleShare}>Del</Button>
                      </div>
                    </MobileOnlyView>
                  </div>
                </div>
              )}
              <ul className="divide-y divide-slate-200 w-full">
                {claimedInvites?.map((referral) => (
                  <li key={referral.code}>
                    <UserInviteCodeCard
                      code={referral.code}
                      user={referral.user}
                    />
                  </li>
                ))}
              </ul>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Invite;
