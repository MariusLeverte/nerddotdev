import { Text } from "ui";

interface RefactoredBadgeProps {
  added: number;
  removed: number;
}
export const RefactoredBadge = ({ added, removed }: RefactoredBadgeProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Text className="text-red-300">+ {added}</Text>
      <Text className=" text-green-500">- {removed}</Text>
    </div>
  );
};
