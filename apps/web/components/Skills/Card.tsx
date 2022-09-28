import Link from "next/link";
import { Skill } from "../../types/schema";
import { isNotEmptyArray } from "../../utils/array";

interface Props {
  skill: Skill;
}

const Skill = ({ skill }: Props) => {
  return (
    <Link href={`/skills/${skill.slug?.current}`}>
      <a>
        <div>
          <div className="mb-2">
            <span className="text-xs font-semibold tracking-wide uppercase transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
              {skill?.category && isNotEmptyArray(skill.category)
                ? skill.category.map((c) => c.name).join(", ")
                : null}
            </span>
          </div>
          <div className="mb-2">
            <span className="inline-block text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400">
              {skill.name}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Skill;
