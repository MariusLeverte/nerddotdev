import { Share, Skill, SkillCategory, User } from "@types/schema";

export type FeedUser = Pick<User, "name" | "photo" | "slug">;

export type FeedShare = Share & {
  user: FeedUser;
  skills: Skill[];
  category: SkillCategory[];
};

export type SkillFeed = Skill & {
  shares: FeedShare[];
  users: Pick<User, "slug" | "name" | "photo">[];
};
