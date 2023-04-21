import axios from 'axios';
import { PAYPLAY_API, PAYPLAY_API_CLIENTE, PAYPLAY_APY_SECRET } from '../config/payment.js';

export const createOrden = async (req, res) => {
    try {
        const orden = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "MXN",
                        value: '300.50'
                    },
                    description: "LLanta buena"
                },
            ],
            application_context: {
                brand_name: "Digilist.refaccionaria@gmail.com",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: "http://localhost:4000/pagos/capturarOrden",
                cancel_url: "http://localhost:4000/pagos/cancelarOrden"
            }
        };

        // format the body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        // Generate an access token
        const {
            data: { access_token },
        } = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: PAYPLAY_API_CLIENTE,
                    password: PAYPLAY_APY_SECRET,
                },
            }
        );

        console.log(access_token);

        //    const response= await axios.post(`${PAYPLAY_API}/v2/checkout/orders`, orden,{
        //         auth:{
        //             username: PAYPLAY_API_CLIENTE,
        //             password: PAYPLAY_APY_SECRET
        //         },
        //     });

        const response = await axios.post(`${PAYPLAY_API}/v2/checkout/orders`,
            orden,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        console.log(response.data);

        return res.json(response.data);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const captureOrden = async (req, res) => {
    const { token } = req.query;

    try {
      const response = await axios.post(
        `${PAYPLAY_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPLAY_API_CLIENTE,
            password: PAYPLAY_APY_SECRET,
          },
        }
      );
  
      console.log(response.data);
  
     res.redirect("/payed.html");

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server error" });
    }
}

export const cancelOrden = (req, res) => {
    res.redirect("/");
}