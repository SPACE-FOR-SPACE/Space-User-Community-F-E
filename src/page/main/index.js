import {useEffect, useState} from "react";
import * as S from './style.ts';
import Header from "../../components/Header";
import LongDocument from "../../components/Documents/Long";
import Popular from "../../components/Documents/popular/index.js";
import { Link } from "react-router-dom";
import {authAtom} from "../../recoil/atom/authAtom.js";
import {useRecoilValue} from "recoil";

function Main(){
    const auth = useRecoilValue(authAtom);
    const [data, setData] = useState([]);
    const getDocument = async ()=>{
        try{
            const response = await fetch(`http://10.150.151.149:8080`, {
                method:'GET',
            })
            if(response.ok){
                setData();
            }
        }catch (error){
            console.log("Document error :" , error);
        }
    };
    useEffect(()=>{
        getDocument();
    }, []);
    return(
        <S.container>
            <Header isLogin={auth.isLogin} userName={auth.username}/>
            <S.main>
                <S.section2>
                    <h3>인기 문서</h3>
                    <Popular />
                </S.section2>
                <S.section1>
                    <LongDocument data = {data}  />
                    
                    <Link to={'/more'}>더보기</Link>
                </S.section1>
            </S.main>
        </S.container>
    )
}
export default Main;