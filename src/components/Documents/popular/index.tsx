import React from "react";
import * as S from './style'
import {Doc} from '../../../types/index';

function Popular(props: {data:Doc}){
    return(
        <S.content>
            <S.title to={`/post/${props.data.id}`}>{props.data.title}</S.title>
            <S.writer to={`/user/${props.data.userId}`}>{props.data.userId}</S.writer>
        </S.content>
    )
}
export default Popular;