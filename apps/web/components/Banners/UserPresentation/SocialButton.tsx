import { RiGithubLine, RiLinkedinFill } from "react-icons/ri";
import styles from "./SocialButton.module.css";

type IconType = "github" | "linkedin";

const getIcon = (icon: IconType) => {
  switch (icon) {
    case "github":
      return <RiGithubLine fill="white" />;
    case "linkedin":
      return <RiLinkedinFill fill="white" />;
    default:
      break;
  }
  return null;
};

const getHref = (id: string, type: IconType): string => {
  switch (type) {
    case "github":
      return "https://github.com/" + id;
    case "linkedin":
      return "https://www.linkedin.com/in/" + id;
    default:
      break;
  }

  return "";
};

interface SocialButtonProps {
  id: string;
  type: IconType;
}

const SocialButton = ({ id, type }: SocialButtonProps) => {
  return (
    <a
      href={getHref(id, type)}
      className={styles["social-button"]}
      target="_blank"
      rel="noopener noreferrer"
    >
      {getIcon(type)}
    </a>
  );
};

export default SocialButton;
