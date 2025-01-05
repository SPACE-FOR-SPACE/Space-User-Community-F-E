import {useQuery} from "react-query";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { authAtom } from '../recoil/authAtom';

const getPost = async ({id, getAuth} : {id:number, getAuth:any})=>{
    try{
        const res = await axios.get(`/api/community/doc/${id}`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization': getAuth.access_Token ? getAuth.access_Token : 'Bearer null'
            },
            withCredentials:true
        });
        return res.data;
    }catch(error){
        console.log("error on : ", error);
    }
};

export const useGetPost = ({id} : {id:number})=>{
    const getAuth = useRecoilValue(authAtom);
    return useQuery(
        ['post', id],
        ()=>getPost({id, getAuth}), {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            retry: 3,
            onError: (error) => console.error("React Query Error:", error),
        }
    )
}