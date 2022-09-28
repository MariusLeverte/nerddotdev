import { FeedShare } from "@types/sanity/response";
import TikTok from "./TikTok";

interface Props {
  item: FeedShare;
}

const Feed = ({ item }: Props) => {
  const { _type } = item;

  if (_type === "share") {
    const type = item.content?.type;
    if (type === "tiktok") {
      return <TikTok share={item} />;
    }
  }

  return null;
};

export default Feed;
