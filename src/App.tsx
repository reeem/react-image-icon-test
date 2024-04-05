import React, { useState, useEffect } from "react";

function ImageCopyPasteDemo() {
  const [imageData, setImageData] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageAsBlob = async () => {
      const response = await fetch(
        "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_c1f4899e65cf4f53b2fd98e15733973a/default/light/2.0"
      );
      const imageBlob = await response.blob();
      const imageDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result.toString());
          } else {
            reject("Failed to read the blob as Data URL");
          }
        };
        reader.readAsDataURL(imageBlob);
      });

      setImageData([imageDataUrl]);
    };

    fetchImageAsBlob();
  }, []);

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    // e.preventDefault();
    const text = await navigator.clipboard.readText();
    setImageData((prev) => [...prev, text]);
  };

  return (
    <div>
      {imageData.map((dataUrl, index) => (
        <img
          key={index}
          src={dataUrl}
          alt="Pasted"
          style={{ width: "200px" }}
          onContextMenu={async (e) => {
            e.preventDefault();
            await navigator.clipboard.writeText(dataUrl);
          }}
        />
      ))}
      <div
        id="pasteArea"
        contentEditable="true"
        style={{ border: "1px solid black", width: "200px", height: "200px" }}
        onPaste={handlePaste}
      >
        Paste Here
      </div>
    </div>
  );
}

export default ImageCopyPasteDemo;
