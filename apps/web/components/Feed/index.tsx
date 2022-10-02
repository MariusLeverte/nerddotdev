import { FeedPost } from "@components/Feed/FeedPost";
import { PortableText } from "@portabletext/react";
import { FeedShare } from "@types/sanity/response";
import { Text } from "ui";
import { OpenGraph } from "./OpenGraph";

interface Props {
  item: FeedShare;
}

const Feed = ({ item }: Props) => {
  return (
    <FeedPost
      user={item.user}
      createdAt={item._createdAt}
      updatedAt={item._updatedAt}
      id={item._id}
      category={item.category}
      skill={item.skills}
    >
      {item.content?.text && (
        <PortableText
          components={{
            block: {
              h2: ({ children }) => {
                return (
                  <Text as="h2" className="text-2xl lg:text-4xl mb-4">
                    {children}
                  </Text>
                );
              },
              normal: ({ children }) => (
                <Text className="mb-3">{children}</Text>
              ),
            },
          }}
          value={item.content.text}
        />
      )}
      {item.content?.url && item.opengraph ? (
        <OpenGraph url={item.content.url} data={item.opengraph} />
      ) : null}
    </FeedPost>
  );
};

export default Feed;
