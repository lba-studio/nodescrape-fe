import React from "react";
import { CircularProgress } from "@material-ui/core";
import RobotIcon from "../assets/robot-solid.svg";

function ImageContainer(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasErrored, setHasErrored] = React.useState(false);
  if (hasErrored) {
    return <>Placeholder</>;
  }
  return (
    <>
      {isLoading && <CircularProgress />}
      <img
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={(e) => {
          setHasErrored(true);
          setIsLoading(false);
        }}
        alt=""
        {...props}
      />
    </>
  );
}

export default ImageContainer;
