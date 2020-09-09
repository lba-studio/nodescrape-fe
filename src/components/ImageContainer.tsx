import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import clsx from "clsx";

const useStyles = makeStyles({
  forceFit: {
    minWidth: 0,
    width: "100%",
    minHeight: 0,
    height: "100%",
  },
});

const useVariantStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "64px",
    maxHeight: "64px",
    margin: theme.spacing(1),
  },
  small: {
    maxWidth: "128px",
    maxHeight: "128px",
    margin: theme.spacing(1),
  },
}));

interface ImageContainerProps {
  forceFit?: boolean;
  variant?: keyof ReturnType<typeof useVariantStyles>;
}

function ImageContainer(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > &
    ImageContainerProps
) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasErrored, setHasErrored] = React.useState(false);
  const classes = { ...useStyles(), ...useVariantStyles() };
  const { forceFit = true, className, variant, ...restOfProps } = props;
  const variantClass = variant ? classes[variant] : undefined;
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
        className={clsx(
          {
            [classes.forceFit]: forceFit,
          },
          variantClass,
          className
        )}
      />
    </>
  );
}

export default ImageContainer;
