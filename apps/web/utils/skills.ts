import { Skill } from "../types/sanity";

type ReducedSkills = {
  name: string;
  skills: string[];
};

export const reduceSkills = (skills: Skill[]): ReducedSkills[] =>
  skills
    .reduce((categories: ReducedSkills[], item) => {
      const skillCategories = item.category || [];
      for (const cat of skillCategories) {
        if (!cat.name) continue;
        if (!item.name) continue;

        const addedCategory = categories.find((c) => c?.name === cat.name);

        if (addedCategory) {
          addedCategory.skills.push(item.name);
        } else {
          categories.push({
            name: cat.name,
            skills: [item.name],
          });
        }
      }

      return categories;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));

type ArraySkills = string[];

export const getArraySkills = (skills: Skill[]): ArraySkills =>
  skills.map((skill) => skill.name).filter((skill): skill is string => !!skill);
