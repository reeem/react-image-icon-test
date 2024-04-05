import React, { type FC } from "react";

interface IProps {
  src: string;
  alt: string;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const ImageIcon: FC<IProps> = ({ src, alt, onClick }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: 50, height: 50 }}
      onClick={onClick}
    />
  );
};

export default ImageIcon;
