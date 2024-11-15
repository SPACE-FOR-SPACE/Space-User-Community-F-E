import styled from "styled-components";

export const Wrapper = styled.div`
    border-radius: 30px;
    border: 3px solid #DFDFDF;
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Content = styled.div`
    width: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`

export const MainUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`

export const ModifyBtn = styled.div<{color ?: boolean, align ?: string, size ?: string}>`
    color: ${(props)=>props.color?"#301C86":"#AAA"};
    font-size: ${(props)=> props.size || "12px"};
    cursor: pointer;
    text-align: ${(props)=>props.align};
`

export const UserImageContainer = styled.div`
    width: 80px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`

export const UserImage = styled.img`
    background: black;
    border-radius: 100px;
    overflow: clip;
    aspect-ratio: 1 / 1;
    object-fit: cover;
`;

export const FileBtn = styled.input`
    display: none;
`

export const UserInfo = styled.div`
    color: #AAA;
    line-height: 30px;
    font-size: 16px;
`

export const UsernameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 5px;
`

export const InputBox = styled.input<{ isModify?: boolean } >`
    padding: ${(props) => props.isModify ? "5px" : "6px"};
    font-size: 20px;
    color: #000;
    box-sizing: border-box;
    border-radius: 5px;
    border: ${(props) => props.isModify? "1px solid #C2C2C2" : "none"};
    background: none;
    outline: none;
    text-align: center;
    width: 100%;
`

export const TextAreaBox = styled.div<{ isModify?: boolean } >`
    padding: ${(props) => props.isModify ? "5px" : "6px"};
    font-size: 13px;
    color: #000;
    box-sizing: border-box;
    border-radius: 5px;
    border: ${(props) => props.isModify? "1px solid #C2C2C2" : "none"};
    background: none;
    width: 100%;
    flex-shrink: 1;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

export const TextArea = styled.textarea<{ isModify?: boolean } >`
    flex-grow: 1;
    flex-shrink: 1;
    resize: none;
    border: none;
    outline: none;
`