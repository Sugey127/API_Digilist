import axios from 'axios';
import { PAYPLAY_API, PAYPLAY_API_CLIENTE, PAYPLAY_APY_SECRET } from '../config/payment.js';

export const createOrden= async(req,res)=>{
    const orden ={
        intent:"CAPTURE",
        purchase_units:[
            {
                amount:{
                    currency_code:"MXN",
                    value:'300.50'
                },
                description:"LLanta buena"
            },
        ],
        application_context:{
            brand_name:"Digilist.refaccionaria@gmail.com",
            landing_page:"LOGIN",
            user_action:"PAY_NOW",
            return_url:"http://localhost:4000/pagos/capturarOrden",
            cancel_url:"http://localhost:4000/pagos/cancelarOrden"
        }
    };
   const response= await axios.post(`${PAYPLAY_API}/v2/checkout/orders`, orden,{
        auth:{
            username: PAYPLAY_API_CLIENTE,
            password: PAYPLAY_APY_SECRET
        },
    });

    console.log(response.data);

    res.send('creating orden');
}

export const captureOrden=(req,res)=>{
    res.send('capturing orden');
}

export const cancelOrden=(req,res)=>{
    res.send('cancel orden');
}