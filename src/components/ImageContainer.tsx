import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import clsx from "clsx";

interface ImageContainerProps {
  forceFit?: boolean;
}

const useStyles = makeStyles({
  forceFit: {
    minWidth: 0,
    width: "100%",
    minHeight: 0,
    height: "100%",
  },
});

function ImageContainer(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > &
    ImageContainerProps
) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasErrored, setHasErrored] = React.useState(false);
  const classes = useStyles();
  const { forceFit = true, className, ...restOfProps } = props;
  if (hasErrored) {
    return <BlockIcon />;
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
        {...restOfProps}
        className={clsx({
          [classes.forceFit]: forceFit,
        })}
      />
    </>
  );
}

export default ImageContainer;
