import { Text } from "ui";
import { AiFillStar } from "react-icons/ai";

export type Score = 1 | 2 | 3 | 4 | 5;
interface RatingCardProps {
  score: Score;
  review: string;
  user: string;
}

export const RatingCard = ({ score, review, user }: RatingCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-4 lg:mb-6">
        {[...new Array(score)].map(() => (
          <AiFillStar className="text-amber-300 text-2xl lg:text-[50px]" />
        ))}
      </div>
      <Text className="text-lg lg:text-2xl mb-4 lg:mb-6">{review}</Text>
      <Text weight="light" className="italic">
        - {user}
      </Text>
    </div>
  );
};
