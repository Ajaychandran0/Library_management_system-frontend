const cloudinaryImageUpload = (image, uploadPreset) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", uploadPreset);
  data.append("cloud_name", `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`);

  return new Promise((resolve, reject) => {
    fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
      method: "post",
      body: data,
    })
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export default cloudinaryImageUpload;
