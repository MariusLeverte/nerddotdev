import { Container, Grid, Text } from "ui";
import { SkillUser } from "../../types/sanity";
import { UsersListCard } from "../Cards/UsersListCard";
import { SkillMenu } from "../Menu/SkillMenu";

interface Props {
  title: string;
  users: SkillUser[];
  children: React.ReactNode;
}

const SkillLayout = ({ title, children, users }: Props) => {
  return (
    <Container width="xl" className="my-20 lg:px-4" padding={false}>
      <Grid>
        <Grid.Column className="col-span-full lg:col-span-3 space-y-4 order-1 sticky top-10 h-0">
          <Text weight="bold" className="text-xl lg:text-2xl">
            {title}
          </Text>
          <SkillMenu />
        </Grid.Column>
        <Grid.Column className="col-span-full lg:col-span-6 space-y-4 overflow-scroll order-3 lg:order-2">
          {children}
        </Grid.Column>
        <Grid.Column className="col-span-full lg:col-span-3 order-2 lg:order-3 sticky top-10 h-0">
          <div className="space-y-4">
            <div className="hidden lg:flex space-between items-center">
              <Text
                className="ml-4 text-slate-400 uppercase text-sm flex-1"
                weight="light"
              >
                Medlemmer
              </Text>
              <span className="bg-slate-400 px-2 self-start rounded-lg">
                <Text className="text-xs text-white">{users.length}</Text>
              </span>
            </div>
            <UsersListCard users={users} />
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default SkillLayout;
