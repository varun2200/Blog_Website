import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, PostCard } from "../components";

function AllPosts(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{},[])
    service.listPost([]).then((posts) =>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    if(posts.length === 0){
        return(
            <div >
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 className="text-2xl font-bold hover:text-gray-500">There are no posts yet.</h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
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

export default AllPosts