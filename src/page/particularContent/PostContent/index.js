import * as S from './style.ts'
import Rectangle from "../../../components/Button/Rectangle";
import CommentList from "./CommentList";
import {useNavigate, useParams} from "react-router-dom";
import InputText from "../../../components/InputText";
import {useRecoilValue} from "recoil";
import {authAtom} from "../../../recoil/authAtom";
import {images} from "../../../assets/iconImage";
import {useEffect, useState} from "react";
import make from "../../../until/postDoc";
import {useQueryClient} from "react-query";
import {useDeleteDocMutation} from "../../../api/deleteDoc";

function PostContent({data}) {
    const navigate = useNavigate();
    const getAuth = useRecoilValue(authAtom);
    const {id} = useParams();
    const [comment, setComment] = useState("");
    const [commentData, setCommentData] = useState([]);
    const queryClient = useQueryClient();
    const {mutate : deletePost} = useDeleteDocMutation(
        (res)=>{
            navigate('/');
            queryClient.invalidateQueries('documents');
        },
        (err)=>{
            console.log(err.response);
        }
    )
    const delPost = async () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            deletePost({id});
        }
    }
    const makeContent = (text) => {
        return make(text)
    };
    const createComent = async () => {
        if(comment === "") {
            alert("내용이없습니다.");
            return;
        }
        else if(!getAuth.access_Token){
            alert("로그인 후 사용해주세요.");
            return;
        }
        try{
            const response = await fetch(`/api/community/comment`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuth.access_Token,
                },
                credentials:'include',
                body: JSON.stringify({
                    documentId:parseInt(id, 10),
                    content:comment
                })
            })
            if(response.ok){
                setComment("");
                getComment();
            }
        }catch (error){
            console.log("error on : ",error);
        }
    }

    const getComment = async () => {
        try{
            const response = await fetch(`/api/community/comment/${id}`,{
                method:'GET',
            })
            const data = await response.json();
            if(response.ok){
                setCommentData(data);
            }
        }catch (error){
            console.log("error on : ",error);
        }
    }
    useEffect(() => {
        getComment();
    }, []);
    return (
        (data['category'] === "공지" ?
                    <S.Wrapper>
                        <S.Header>
                            <S.HeaderHead>
                                <S.category>공지</S.category>
                                {getAuth.isAdmin ?
                                    <S.ManagePost>
                                        <S.ManageBtn onClick={() => {
                                            navigate(`/patch/${id}`, {
                                                state: {
                                                    patchContent: data.content || "",
                                                    patchTitle: data.title,
                                                    patchCategory: data.category,
                                                    patchIcon: data.icon,
                                                    patchDocumentId:data.documentId
                                                }
                                            });
                                        }}>
                                            수정
                                        </S.ManageBtn>

                                        <S.ManageBtn onClick={delPost}>제거</S.ManageBtn>
                                    </S.ManagePost> : null
                                }
                            </S.HeaderHead>
                            {/*<S.titleWrap><S.titleImg src={images[data.icon]}/><S.title>{data["title"]}</S.title></S.titleWrap>*/}
                            {/*<S.postInfo>{data["date"].slice(0, 10)} - {data["authorName"]}</S.postInfo>*/}
                        </S.Header>
                        <S.contents>{makeContent(data["content"])}</S.contents>
                        <S.hr/>
                        <S.InputCommentBox>
                            {/*<S.CommentTitle>{(data["comments"]).length}개의 댓글</S.CommentTitle>*/}
                            <InputText type={"textarea"} placeholder={"댓글을 입력해주세요"} height={"90px"}/>
                            <S.BtnContainer><Rectangle name={"댓글 작성"} display={true}/></S.BtnContainer>
                        </S.InputCommentBox>
                        <CommentList data={data["comments"]}/>
                    </S.Wrapper>
                    :(
                    <S.Wrapper>
                    <S.Header>
                        <S.HeaderHead>
                            <S.category>{data["category"]}</S.category>
                            {getAuth.username === data["authorName"] ?
                                <S.ManagePost>
                                    <S.ManageBtn onClick={() => {
                                        navigate(`/patch/${id}`, {
                                            state: {
                                                patchContent: data.content || "",
                                                patchTitle: data.title,
                                                patchCategory: data.category,
                                                patchIcon: data.icon,
                                                patchDocumentId:data.documentId
                                            }
                                        });
                                    }}>
                                        수정
                                    </S.ManageBtn>

                                    <S.ManageBtn onClick={delPost}>제거</S.ManageBtn>
                                </S.ManagePost>
                                :  getAuth.isAdmin?
                                    <S.ManagePost>
                                        <S.ManageBtn onClick={delPost}>제거</S.ManageBtn>
                                    </S.ManagePost>
                                :
                                 null}
                        </S.HeaderHead>
                        <S.titleWrap><S.titleImg src={images[data.icon]}/><S.title>{data["title"]}</S.title></S.titleWrap>
                        <S.postInfo>{data["date"].slice(0, 10)} - {data["authorName"]}</S.postInfo>
                    </S.Header>
                    <S.contents>{makeContent(data["content"])}</S.contents>
                    <S.hr/>
                    <S.InputCommentBox>
                        <S.CommentTitle>{commentData.length}개의 댓글</S.CommentTitle>
                        <InputText value={comment} onchange={setComment} type={"textarea"} placeholder={"댓글을 입력해주세요"} height={"90px"}/>
                        <S.BtnContainer>
                            <Rectangle onClick={createComent} name={"댓글 작성"} display={true}/>
                        </S.BtnContainer>
                    </S.InputCommentBox>
                    <CommentList data={commentData} getComment = {getComment} />
                </S.Wrapper>))
    );
}

export default PostContent;