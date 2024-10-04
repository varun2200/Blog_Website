import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/conf";
import { useState, useEffect } from "react";
function PostCard({
    $id,
    title,
    featuredImage
}){
    // return(
    //     <Link to = {`/post/${$id}`}>
    //         <div className="w-full bg-gray-100 rounded-xl p-4">
    //             <div className="w-full justify-center mb-4">
    //                 <img src={service.FilePreview(featuredImage)} alt={title} />
    //             </div>
    //             <h2
    //             className="text-xl font-bold"
    //             >{title}</h2>
    //         </div>
    //     </Link>
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            if (featuredImage) {
                try {
                    const src = await service.FilePreview(featuredImage);
                    setImageSrc(src);
                } catch (error) {
                    console.error("Error fetching image:", error);
                    setImageSrc('path/to/placeholder/image.png'); // Fallback image
                }
            } else {
                setImageSrc('path/to/placeholder/image.png'); // Fallback image if no ID
            }
        };

        fetchImage();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={imageSrc} alt={title} />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard