import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import * as S from './style.ts';
import Larrow from "../../assets/left_arrow.svg";
import Rarrow from "../../assets/right_arrow.svg";
import Speaker from '../../assets/speaker.svg';
import {useNavigation} from "react-router-dom";

const Report = ()=>{
    const navigate = useNavigation();
    const [page, setPage] = useState(1);
    const goReport = (url)=>{
        navigate(url);
    }
    const getReport = async ()=>{
        try{
            const response = await fetch('/admin/report', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }catch (error){
            console.log('on error getReport', error)
        }
    }
    useEffect(() => {
        getReport()
    }, []);
    return(
        <S.container>
            <Header />
            <h2>신고목록들</h2>

            <S.main>
                <S.speaker src={Speaker} alt={"speaker icon"} />
                {/* 9개 신고씩 보여주기 */}
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>
                <S.section onClick={()=>goReport(`/report/${1}`)}>
                    <S.reportText>신고제목</S.reportText>
                    <S.reportText>유저</S.reportText>
                </S.section>

                <S.pageNum>
                    <S.arrow src={Larrow} alt={"왼쪽"} onClick={()=>setPage(page+1)} />
                    <p> page </p>{/*page 중괄호 씌우기*/}
                    <S.arrow src={Rarrow} alt={"오른쪽"} onClick={()=>setPage(page-1)} />
                </S.pageNum>
            </S.main>
        </S.container>
    )
}

export default Report;