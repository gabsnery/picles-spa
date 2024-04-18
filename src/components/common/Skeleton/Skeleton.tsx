import SkeletonLib, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export const Skeleton = (props: SkeletonProps) => {
  return <SkeletonLib {...props} />;
};
