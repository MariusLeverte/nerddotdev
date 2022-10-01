import { FeedShare } from "@types/sanity/response";
import { FiExternalLink } from "react-icons/fi";
import { Text } from "ui";

interface Props {
  url: string;
  data: FeedShare["opengraph"];
}

export const OpenGraph = ({ url, data }: Props) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="p-4 border rounded-sm flex gap-4 flex-col md:flex-row bg-white">
        <div className="w-2/3 order-2 md:order-1">
          <Text weight="bold" className="flex items-center gap-2">
            <FiExternalLink size={24} /> {data?.title}
          </Text>
          <Text className="opacity-60 mt-2">{data?.description}</Text>

          {/* <Text className="opacity-60 mt-4 text-sm">{url}</Text> */}
        </div>
        {data?.image && (
          <div
            className="flex-1 rounded-sm overflow-hidden bg-cover bg-center min-h-[150px] order-1 md:order-2"
            style={{ backgroundImage: `url(${data.image})` }}
          />
        )}
      </div>
    </a>
  );
};
