import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post) return;
    
        try {
            // Delete post and image asynchronously
            const status = await service.deletePost(post.$id);
            if (status) {
                await service.deleteFile(post.featuredImage);
                
                // Clean up local state
                setPost(null);
    
                // Navigate away after deletion
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting the post or file:", error);
        }
    };
    

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.FilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}