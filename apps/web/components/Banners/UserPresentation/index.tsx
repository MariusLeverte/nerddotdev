import { Grid, Image, Spacer, Text } from "@nextui-org/react";
import { User } from "../../../types/sanity";
import SocialButton from "./SocialButton";

interface UserPresentationProps {
  name: string;
  intro?: string;
  photoUrl: string;
  social?: User["social"];
}

const UserPresentation = ({
  name,
  intro,
  photoUrl,
  social,
}: UserPresentationProps) => {
  return (
    <Grid.Container
      gap={4}
      justify="center"
      alignItems="center"
      css={{ padding: 0 }}
      wrap="wrap-reverse"
    >
      <Grid xs={12} sm={5} direction="column">
        <Text h1 css={{ lineHeight: "$xs" }}>
          <Text
            span
            weight="bold"
            size="$lg"
            css={{
              "@md": {
                fontSize: "$xl",
              },
            }}
          >
            {name} {intro && "-"}
          </Text>{" "}
          {intro && (
            <>
              <br />
              <Text
                span
                weight="medium"
                size="$md"
                css={{
                  "@md": {
                    fontSize: "$lg",
                  },
                }}
              >
                {intro}
              </Text>
            </>
          )}
        </Text>
        <Spacer y={2} />
        <Grid.Container gap={1}>
          {social?.github && (
            <Grid>
              <SocialButton id={social.github} type="github" />
            </Grid>
          )}
          {social?.linkedin && (
            <Grid>
              <SocialButton id={social.linkedin} type="linkedin" />
            </Grid>
          )}
        </Grid.Container>
      </Grid>
      <Grid xs={12} sm={7}>
        <Image src={photoUrl} alt={name} />
      </Grid>
    </Grid.Container>
  );
};

export default UserPresentation;
