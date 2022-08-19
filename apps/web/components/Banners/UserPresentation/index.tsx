import Image from "next/image";
import { Grid, Text } from "ui";
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
    <Grid className="items-center">
      <Grid.Column className="col-span-6 order-2">
        <Text as="h1" className="space-y-2">
          <Text as="span" weight="bold" className="text-4xl lg:text-6xl">
            {name} {intro && "-"}
          </Text>{" "}
          {intro && (
            <Text
              as="span"
              weight="medium"
              className="text-2xl lg:text-4xl block"
            >
              {intro}
            </Text>
          )}
        </Text>
        <div className="space-x-1 mt-8">
          {social?.github && <SocialButton id={social.github} type="github" />}
          {social?.linkedin && (
            <SocialButton id={social.linkedin} type="linkedin" />
          )}
        </div>
      </Grid.Column>
      <Grid.Column className="col-span-6 order-1 lg:order-2">
        <Image
          src={photoUrl}
          alt={name}
          width={460}
          height={460}
          className="rounded-xl"
        />
      </Grid.Column>
    </Grid>
  );
};

export default UserPresentation;
