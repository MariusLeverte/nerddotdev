import Link from "next/link";
import { useRouter } from "next/router";
import {
  RiBubbleChartLine,
  RiHomeSmile2Line,
  RiShareForward2Line,
} from "react-icons/ri";
import { Card, Text } from "ui";
import clsx from "clsx";

const styles = {
  item: "flex items-center space-x-4",
  text: "text-lg",
};

export const SkillMenu = () => {
  const { query, pathname, route } = useRouter();

  const baseStyle = "p-4 opacity-60";
  const activeStyle = "bg-zinc-100 border-l-2 border-primary opacity-100";

  return (
    <Card>
      <nav>
        <ul className="-mx-4">
          <li
            className={clsx(
              baseStyle,
              pathname === "/skills/[skill]" && activeStyle
            )}
          >
            <Link
              href={{
                pathname: "/skills/[skill]",
                query: { skill: query.skill },
              }}
            >
              <a className={styles.item}>
                <RiHomeSmile2Line size={24} />{" "}
                <Text className={styles.text}>Oversikt</Text>
              </a>
            </Link>
          </li>
          <li
            className={clsx(
              baseStyle,
              pathname === "/skills/[skill]/posts" && activeStyle
            )}
          >
            <Link
              href={{
                pathname: "/skills/[skill]/posts",
                query: { skill: query.skill },
              }}
            >
              <a className={styles.item}>
                <RiBubbleChartLine size={24} />{" "}
                <Text className={styles.text}>Innlegg</Text>
              </a>
            </Link>
          </li>
          <li
            className={clsx(
              baseStyle,
              pathname === "/skills/[skill]/shares" && activeStyle
            )}
          >
            <Link
              href={{
                pathname: "/skills/[skill]/shares",
                query: { skill: query.skill },
              }}
            >
              <a className={styles.item}>
                <RiShareForward2Line size={24} />{" "}
                <Text className={styles.text}>Delt</Text>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </Card>
  );
};
