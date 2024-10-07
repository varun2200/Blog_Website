import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import service from "../appwrite/conf";
import { useEffect } from "react";
import { Container, PostCard } from "../components";

function MyPosts(){
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            service.listPost().then((response) => {
                if (response) {
                    const userPosts = response.documents.filter(
                        (post) => post.userId === userData.$id
                    );
                    setPosts(userPosts);
                }
            });
        }
    }, [userData]);

    if (posts.length === 0) {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="text-2xl font-bold hover:text-gray-500 text-center">
                    {"You haven't written any posts yet."}
                </h1>
            </div>
        );
    }
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap" >
                    {posts.map((post)=>(
                        <div key = {post.$id} className="p-2 w-1/4">
                            <PostCard  {... post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default MyPosts;