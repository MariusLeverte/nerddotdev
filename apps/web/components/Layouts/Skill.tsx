import { Container, Grid, Text } from "ui";
import { SkillUser } from "../../types/sanity";
import { SkillMenu } from "../Menu/SkillMenu";

interface Props {
  title: string;
  users: SkillUser[];
  children: React.ReactNode;
}

const SkillLayout = ({ title, children, users }: Props) => {
  return (
    <Container width="xl" className="my-20 lg:px-4">
      <Grid>
        <Grid.Column className="col-span-full lg:col-span-3 space-y-4">
          <Text weight="bold" className="text-xl lg:text-2xl">
            {title}
          </Text>
          <SkillMenu />
        </Grid.Column>
        <Grid.Column className="col-span-full lg:col-span-9 space-y-4">
          {children}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default SkillLayout;
