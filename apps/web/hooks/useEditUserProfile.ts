import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import { Repo, UserWithProjects } from "../types/sanity";
import { Skill, User } from "../types/schema";

type AtomValues = {
  intro: string | undefined;
  github: string | undefined;
  linkedin: string | undefined;
  skills: Skill[] | undefined;
  about: User["about"] | undefined;
  repos: Repo[] | undefined;
};

const introAtom = atom<AtomValues["intro"]>("");
const socialGithubAtom = atom<AtomValues["github"]>("");
const socialLinkedinAtom = atom<AtomValues["linkedin"]>("");
const skillsAtom = atom<AtomValues["skills"]>(undefined);
const aboutAtom = atom<AtomValues["about"]>(undefined);
const reposAtom = atom<AtomValues["repos"]>(undefined);

const useEditUserProfile = (user?: UserWithProjects) => {
  const [intro, setIntro] = useAtom(introAtom);
  const [github, setGithub] = useAtom(socialGithubAtom);
  const [linkedin, setLinkedin] = useAtom(socialLinkedinAtom);
  const [skills, setSkills] = useAtom(skillsAtom);
  const [about, setAbout] = useAtom(aboutAtom);
  const [repos, setRepos] = useAtom(reposAtom);

  useEffect(() => {
    if (!user) return;
    setIntro(user.intro);
    setGithub(user.social?.github);
    setLinkedin(user.social?.linkedin);
    setSkills(user.skills);
    setAbout(user.about);
    setRepos(user.repos);
  }, [user, setIntro, setGithub, setLinkedin, setSkills, setAbout, setRepos]);

  const setValue = useCallback(
    <T extends keyof AtomValues>(key: T, value: AtomValues[T]) => {
      switch (key) {
        case "intro":
          return setIntro(value);
        case "github":
          return setGithub(value);
        case "linkedin":
          return setLinkedin(value);
        case "skills":
          return setSkills(value);
        case "about":
          return setAbout(value);
        case "repos":
          return setRepos(value);
        default:
          break;
      }
    },
    [setAbout, setGithub, setIntro, setLinkedin, setRepos, setSkills]
  );

  const merged = useMemo(() => {
    if (!user) return null;

    const newUserObject = JSON.parse(JSON.stringify(user)) as UserWithProjects;

    newUserObject.intro = intro;
    newUserObject.social = {
      ...user.social,
      github: github,
      linkedin: linkedin,
    };
    newUserObject.skills = skills;
    newUserObject.about = about;
    newUserObject.repos = repos;

    return newUserObject;
  }, [about, github, intro, linkedin, repos, skills, user]);

  return {
    intro,
    github,
    linkedin,
    skills,
    about,
    repos,
    merged: merged,
    setValue,
  };
};

export default useEditUserProfile;
