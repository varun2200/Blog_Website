import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, PostCard } from "../components";
import authservice from "../appwrite/auth";
import { useSelector } from "react-redux";

function Home(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        service.listPost().then((posts)=>{
            if(posts){
                setPosts(posts.documents);
            }
        })
    },[])
    if(posts.length === 0){
    const authStatus = useSelector((state) => state.auth.status);
        return(
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            {!authStatus && <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>}
                            {authStatus && <h1 className="text-2xl font-bold hover:text-gray-500">There are no posts yet.</h1>}
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap" >
                    {posts.map((post)=>(
                        <div key = {post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home