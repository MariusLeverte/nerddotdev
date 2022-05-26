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
