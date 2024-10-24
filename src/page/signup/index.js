import React, { useEffect, useRef, useState } from 'react'
import * as S from './style.ts'
import Logo from '../../assets/Logo.svg'
import axios from "axios";

import { Link, useNavigate } from 'react-router-dom';

function Signup(){
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const [repw, setRePw] = useState();
    const [age, setAge] = useState();
    const idRef = useRef();
    const pwRef = useRef();
    const ageRef = useRef();

    useEffect(()=>{
        idRef.current.focus();
    }, [])

    const navigate = useNavigate();
    const goSignup = async ()=>{
        if(id === ""){
            alert("아이디가 비어있습니다.");
            idRef.current.focus();
        }
        else if(pw===""){
            alert("비밀번호가 비어있습니다.");
            pwRef.current.focus();
        }
        else if(age === ""){
            alert("나이가 비어있습니다.");
            ageRef.container.focus();
        }
        else if(pw !== repw){
            alert("비밀번호가 일치하지 않습니다.");
        }
        else{
            try{
                const response = await axios.post('http://10.150.151.149:8080/user/register', {
                    name: id,
                    password: pw,
                    age: age,
                    profile: null
                }, {
                    headers:{
                        'Content-Type':'application/json'
                    },
                })
                if(response.status === 200){
                    console.log("회원가입성공");
                    navigate('/login');
                }
            }catch(error){
                console.log("error on ", error);
            }
        }
    }
    return(
        <S.container>
            <img src={Logo} alt='LogoImg' />
            <h2>반가워요!</h2>
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
                <S.dataIn>
                    <S.Label>비밀번호</S.Label>
                    <S.Input
                        ref={pwRef}
                        type='password'
                        placeholder='비밀번호를 입력해주세요'
                        value={pw}
                        onChange={(e)=>setPw(e.target.value)}
                    />
                </S.dataIn>
                <S.dataIn>
                    <S.Label>비밀번호확인</S.Label>
                    <S.Input
                        type='password'
                        placeholder='비밀번호를 입력해주세요'
                        value={repw}
                        onChange={(e)=>setRePw(e.target.value)}
                    />
                </S.dataIn>
                <S.dataIn>
                    <S.Label>나이</S.Label>
                    <S.Input
                        ref={ageRef}
                        type='email'
                        placeholder='나이를 입력해주세요'
                        value={age}
                        onChange={(e)=>setAge(e.target.value)}
                    />
                </S.dataIn>
                
                
                <S.nativeLogin>
                    <p>이미 회원이신가요?</p>
                    <Link to={'/login'}>로그인</Link>
                </S.nativeLogin>
                
             
             
              <S.Signup
                isBlack={false}
                onClick={goSignup}
                >
                    회원가입
                </S.Signup>
            </S.form>
        </S.container>
    )
}
export default Signup;