import styled from "styled-components";
import PostContent from "./PostContent";
import Header from "../../components/Header";
import FamousPost from "./FamousPost";
import Like from "./Like";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getDoc} from "../../api/getDoc";
import {useRecoilValue} from "recoil";
import {authAtom} from "../../recoil/authAtom";
import {useGetPost} from "../../api/getPost";

export default function ParticularContent() {
    const navigate = useNavigate();
    const {id} = useParams();
    const getAuth = useRecoilValue(authAtom);
    const [famousDocuments, setFamousDocuments] = useState(['']);
    const [isLoading, setIsLoading] = useState(true);
    const {data : post, isLoading : isPostLoading } = useGetPost({id, getAuth});


    const famousPost = async () => {
        setIsLoading(true);
        try{
            const documents = await getDoc("likes");
            setFamousDocuments(documents);
        }catch(error){
            console.log("error on : ",error);
            navigate("/error");
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        famousPost();
    }, [id]);
    return (
        <Container>
            <Header/>
            <Content>
                {isPostLoading ? null :
                    <>
                        <Like isLiked={post.likeStatus} likes={post.likes} id={post.documentId} getPost = {useGetPost}/>
                        <PostContent data={post} isLoading = {isLoading}/>
                        <FamousPost famous = {famousDocuments}/>
                    </>
                }

            </Content>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 95vh;
`

const Content = styled.div`
    display: flex;
    gap: 5%;
    justify-content: center;
    height: 80%;
    overflow: scroll;
`