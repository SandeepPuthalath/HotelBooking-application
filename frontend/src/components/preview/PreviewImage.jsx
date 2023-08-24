import React from "react";

export default function PreviewImage({ file }) {
  const [preview, setPreview] = React.useState({});

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return <img src={preview} alt="preview" />;
}
