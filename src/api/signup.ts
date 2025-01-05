import axios from "axios";

export const SignupAPI = async ({id, pw, age, email}:{id:string, pw:string, age:string, email:string})=>{
    try{
        const res = await axios.post('/api/user/register', {
            email: email,
            username: id,
            password: pw,
            age: age
        }, {
            headers:{
                'Content-Type':'application/json',
            }});
        return res;
    }catch(error){
        console.log("error on ", error);
    }
}

export const SendEmailAPI = async ({email }: {email : string} ) =>{
    try{
        const res = await axios.post('/api/user/sendEmail', {
            email: email
        }, {
            headers:{
                'Content-Type':'application/json',
            }
        }, )
        return res;
    }catch(error){
        console.log("error on postEmail", error);
    }
}