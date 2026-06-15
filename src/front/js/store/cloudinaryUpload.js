const uploadToCloudinary = async (file, folder = "trippy") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch(process.env.BACKEND_URL + "/api/upload-image", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error al subir la imagen");
    }

    const data = await response.json();
    return data.url;
};

export default uploadToCloudinary;
