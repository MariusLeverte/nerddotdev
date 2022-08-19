import { groq } from "next-sanity";

export const userWithProjectsQuery = groq`*[_type == "user" && slug.current == $user][0] {
    ...,
    skills[]->{
      ..., 
      category[]->
    },
    "projects": *[references(^._id)] {
      ...,
      "role": developers[user._ref in *[_type == "user" && slug.current == $user]._id] {
        role->
      }[0].role
    }
  }`;

export const pageWithContent = groq`*[_type == "page" && _id == $page][0]`;

export const userById = groq`*[_type == "user" && _id == $user][0]`;

export const slugInUse = groq`*[slug.current == $slug][0] { _id }`;
