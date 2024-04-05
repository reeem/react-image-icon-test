import React, { useState, useCallback } from "react";
import ImageIcon from "./components/ImageIcon";

const CounterWithIncreasingImageIcons = () => {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  // const addImage = () => {
  //   const newImage = {
  //     src: "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_c1f4899e65cf4f53b2fd98e15733973a/default/light/2.0",
  //     alt: `Image ${images.length}`,
  //   };
  //   setImages([...images, newImage]);
  // };

  const addImage = useCallback((src: string) => {
    setImages((prev) => [...prev, { src, alt: `Image ${prev.length}` }]);
  }, []);

  const handleImageClick = async (src: string) => {
    try {
      await navigator.clipboard.writeText(src);
      alert("Image URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy image URL:", err);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          addImage(
            "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_c1f4899e65cf4f53b2fd98e15733973a/default/light/2.0"
          )
        }
      >
        이미지 생성
      </button>

      <p>이미지를 클릭하면, 클립보드에 복사됩니다.</p>
      <div
        onPaste={(e) => {
          e.preventDefault();
          // 클립보드에서 이미지 URL을 읽고 addImage 함수를 호출하여 이미지를 추가
          console.log(e.clipboardData);
          const text = e.clipboardData.getData("text");
          console.log(text, "text");
          addImage(text);
        }}
      >
        {images.map((img, index) => (
          <ImageIcon
            key={index}
            src={img.src}
            alt={img.alt}
            onClick={() => handleImageClick(img.src)}
          />
        ))}
      </div>
    </div>
  );
};

export default CounterWithIncreasingImageIcons;
