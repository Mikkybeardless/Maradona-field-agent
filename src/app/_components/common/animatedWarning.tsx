import Image from "next/image";
import warningImage from "@/app/_assets/icons/alert-circle.svg"; // Adjust the path as necessary

export const AnimatedCirclesImage = () => {
  return (
    <div className="relative inline-block">
      <Image
        src={warningImage}
        alt="rounded image"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />

      {/* Circle 1 */}
      <span className="absolute top-1/2 left-1/2 w-[170px] h-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-600 opacity-0 animate-fadeInOut animation-delay-0" />

      {/* Circle 2 */}
      <span className="absolute top-1/2 left-1/2 w-[190px] h-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-600 opacity-0 animate-fadeInOut animation-delay-500" />
    </div>
  );
};
