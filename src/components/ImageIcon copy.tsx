import React, { useMemo } from "react";

const ImageIcon = ({ src, alt }: { src: string; alt: string }) => {
  const memoizedImage = useMemo(
    () => <img src={src} alt={alt} style={{ width: 50, height: 50 }} />,
    [src, alt]
  );

  return memoizedImage;
};

export default ImageIcon;
