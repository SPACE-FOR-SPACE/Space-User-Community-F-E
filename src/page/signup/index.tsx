import React, { useEffect, useRef, useState } from 'react'
import * as S from './style'
import Logo from '../../assets/Logo.svg'
import { useNavigate } from 'react-router-dom';
import {useRecoilValue} from "recoil";
import {authAtom} from "../../recoil/authAtom";
import BackArrow from "../../assets/back_Arrow.svg";
import {SignupAPI, SendEmailAPI } from "../../api/signup";

function Signup(){
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [repw, setRePw] = useState('');
    const [age, setAge] = useState('0');
    const [email, setEmail] = useState('');
    const idRef = useRef<HTMLInputElement | null>(null);
    const auth = useRecoilValue(authAtom);
    const [isOn, setIsOn] = useState<boolean>(false);
    const [valueNumber, setValueNumber] = useState('');
    useEffect(()=>{
        if(auth.access_Token !== '') navigate('/');
        idRef.current?.focus();
    }, [])

    const navigate = useNavigate();
    const goSignup = async ()  =>{
        if(id === "" || pw === "" || repw === "" || age === "" || email === "") alert("데이터가 부족합니다.");
        else if(pw !== repw) alert("비밀번호가 일치하지 않습니다.");
        else if(parseInt(age, 10) >= 80 || parseInt(age, 10) <= 3) alert("나이가 정상적으로 입력되지 않습니다.");
        else{
            const res = await SignupAPI({ id, pw, age, email });
            if(res && res.status === 200) navigate('/login');
        }
    }
    const postEmail = async ()=>{
        const res = await SendEmailAPI({email});
        if(res && res.status === 200) alert('이메일발송중...');
    }
    const check = () => {
        if(pw.length >= 4) setIsOn(false);
        else setIsOn(true);
    }
    return(
        <S.container>
            <S.backArrow src={BackArrow} alt="Back Arrow" onClick={()=>navigate(-1)}/>
            <S.Logo src={Logo} alt='LogoImg' />
            <h3>회원가입</h3>
            <S.form>
                <S.dataIn>
                    <S.Label>아이디</S.Label>
                    <S.Input 
                        ref={idRef}
                        type='text' 
                        placeholder='아이디를 입력해주세요'
                        value={id}
                        onChange={(e)=>setId(e.target.value)}
                    />
                </S.dataIn>
                <S.email>
                        <S.Label>이메일</S.Label>
                        <S.Input
                            type='email'
                            placeholder='이메일을 입력해주세요'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <S.btn onClick={postEmail}>이메일발송</S.btn>
                </S.email>

                 <S.dataIn>
                    <S.Label>인증번호</S.Label>
                        <S.Input
                            type='text'
                            placeholder='이메일로 보내진 인증번호를 입력해주세요'
                            value={valueNumber}
                            onChange={(e)=>setValueNumber(e.target.value)}
                        />
                </S.dataIn>
                <S.pwBox>
                    <S.pw>
                        <S.Label>비밀번호</S.Label>
                        <S.Input
                            type='password'
                            placeholder='비밀번호를 입력해주세요'
                            value={pw}
                            onClick={()=>check()}
                            onChange={(e)=>{
                                setPw(e.target.value);
                                check();
                            }}
                        />
                        <S.chpw $isOn={isOn}>비밀번호 4자리 이상이 되지않았습니다.</S.chpw>
                    </S.pw>
                    <S.pw>
                        <S.Label>비밀번호확인</S.Label>
                        <S.Input
                            type='password'
                            placeholder='비밀번호를 입력해주세요'
                            value={repw}
                            onChange={(e)=>setRePw(e.target.value)}
                        />
                    </S.pw>
                </S.pwBox>
                <S.dataIn>
                    <S.Label>나이</S.Label>
                    <S.age
                        type='range'
                        placeholder='나이를 입력해주세요'
                        value={age}
                        onChange={(e)=>setAge(e.target.value)}
                    />
                    <p>{age}</p>
                </S.dataIn>
                <S.navi>
                    <p>이미 회원이신가요?</p>
                    <S.btnText to={'/login'}>로그인</S.btnText>
                </S.navi>


            </S.form>

            <S.Signup
                onClick={goSignup}
            >
                회원가입
            </S.Signup>
        </S.container>
    )
}
export default Signup;