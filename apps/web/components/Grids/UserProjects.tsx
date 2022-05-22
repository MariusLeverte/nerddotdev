import { Grid } from "@nextui-org/react";
import { urlFor } from "../../libs/sanity/sanity";
import { UserProject as UserProjectType } from "../../types/sanity";
import UserProjectCard from "../Cards/UserProjectCard";

/**
 * [1-2---]
 * [3---4-]
 * [5-6-7-]
 * [8-9---]
 * Our grid template is using 7 columns
 */

const cols = 7;
const getColWidth = (index: number) => {
  if (index % cols === 2 || index % cols === 3) return 7; // Long column
  if (index % cols === 5 || index % cols === 6 || index % cols === 0) return 4; // Last row in our template with xs columns
  return 5; // Short column
};

interface UserProjectsProps {
  projects: UserProjectType[];
}

const UserProjects = ({ projects }: UserProjectsProps) => {
  return (
    <Grid.Container gap={1} css={{ padding: 0 }}>
      {projects.map((project, index) => {
        const imageUrl =
          project.photo?.photoImage &&
          urlFor(project.photo.photoImage).width(200).url();

        return (
          <Grid key={project._id} xs={12} sm={getColWidth(index + 1)}>
            <UserProjectCard
              name={project.name}
              role={project.role?.name}
              previewColor={project.previewColor}
              photoUrl={imageUrl}
              about={project.about}
            />
          </Grid>
        );
      })}
    </Grid.Container>
  );
};

export default UserProjects;
