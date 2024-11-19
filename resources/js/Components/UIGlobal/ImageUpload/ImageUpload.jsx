import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [folder, setFolder] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image || !title || !folder) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("folder", folder);

        try {
            const uploadResponse = await axios.post(
                "/api/image-upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (error) {
            console.error(error);
            alert(
                "Error uploading image. Please check the console for details."
            );
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <input type="file" onChange={handleImageChange} />
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter folder name"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default ImageUpload;
