import {
  Project,
  ProjectRole,
  Skill as SanitySkill,
  SkillCategory as SanitySkillCategory,
  User as SanityUser,
} from "./schema";

export type Skill = Omit<SanitySkill, "category"> & {
  category: SanitySkillCategory[];
};

export type User = Omit<SanityUser, "skills"> & {
  skills: Skill[];
};

export type UserProject = Project & {
  role: ProjectRole;
};

export type UserWithProjects = User & {
  projects: UserProject[];
};
