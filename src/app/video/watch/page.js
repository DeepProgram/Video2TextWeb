"use client";
import { useSearchParams } from "next/navigation";
import GlobalMainComponent from "@/components/Global/GlobalMainComponent";

const HomeWatch = () => {
  const searchParams = useSearchParams();
  const watchVideoID = searchParams.get("v");
  return (
    <>
      {(watchVideoID === null || watchVideoID === "") && <div>Error Page</div>}
      {watchVideoID !== null && watchVideoID !== "" && (
        <GlobalMainComponent href={`/video/watch?v=${watchVideoID}`} />
      )}
    </>
  );
};

export default HomeWatch;
