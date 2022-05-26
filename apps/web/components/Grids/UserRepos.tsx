import { Grid } from "@nextui-org/react";
import { User } from "../../types/schema";
import UserRepoCard from "../Cards/UserRepoCard";

interface UserReposProps {
  repos: User["repos"];
}

const UserRepos = ({ repos }: UserReposProps) => {
  return (
    <Grid.Container gap={1} css={{ padding: 0 }} justify="center">
      {repos?.map((repo) => {
        return (
          <Grid key={repo._key} xs={12} sm={4}>
            <UserRepoCard
              name={repo.name}
              description={repo.description}
              language={repo.language}
              homepage={repo.homepage}
              html_url={repo.html_url}
            />
          </Grid>
        );
      })}
    </Grid.Container>
  );
};

export default UserRepos;
