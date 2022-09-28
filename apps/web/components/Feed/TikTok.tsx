import { FeedCard } from "@components/Cards/FeedCard";
import { Modal } from "@nextui-org/react";
import { FeedShare } from "@types/sanity/response";
import Image from "next/image";
import { useMemo } from "react";
import { useState } from "react";
import useSWR from "swr";
import { Text } from "ui";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  share: FeedShare;
}

export const TikTok = ({ share }: Props) => {
  const [visible, setVisible] = useState(false);

  const videoId = useMemo(() => {
    if (!share.content?.url) return;

    const split = share.content.url.split("/video/");
    return split[1];
  }, [share.content?.url]);

  const { data } = useSWR(
    `https://www.tiktok.com/oembed?url=${share.content?.url}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  console.log({ data, videoId, share });

  return (
    <>
      <FeedCard
        user={share.user}
        createdAt={share._createdAt}
        updatedAt={share._updatedAt}
      >
        {data && (
          <>
            <button onClick={() => setVisible(true)}>
              <div className="flex items-center justify-center rounded-lg bg-slate-900">
                <div className="w-1/2 flex">
                  <Image
                    src={data.thumbnail_url}
                    alt={data.title}
                    width={data.thumbnail_width}
                    height={data.thumbnail_height}
                  />
                </div>
              </div>
            </button>
            <Text>{data.title}</Text>
          </>
        )}
      </FeedCard>
      <Modal
        open={visible}
        onClose={() => setVisible(false)}
        scroll
        closeButton
      >
        <iframe
          style={{
            width: "100%",
            height: 739,
            display: "block",
            visibility: "unset",
          }}
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
        />
      </Modal>
    </>
  );
};

export default TikTok;
