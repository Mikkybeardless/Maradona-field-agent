import { Spinner } from "./spinner";

interface DetailLoadingStateProps {
  message?: string;
}

export const DetailLoadingState = ({
  message = "Loading details...",
}: DetailLoadingStateProps) => {
  return (
    <div className="flex flex-col gap-3 justify-center my-[300px] items-center">
      <Spinner size="w-10 h-10 md:w-20 md:h-20" borderColor="border-orange" />
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
};
