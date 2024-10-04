import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Container, PostForm } from "../components";

function EditPost(){
    const [posts , setPosts] = useState(null);
    const {slug} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post);
                }
            })
        }
        else{
            navigate('/');
        }
    },[slug, navigate])

    return posts?(
        <div className="py-8">
            <Container>
                <PostForm post = {posts} />
            </Container>
        </div>
    ):null
}

export default EditPost