import {React,useState} from'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const   CARD_OPTIONS={
    iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}



export default function PaymentForm(){
   const [success,setSuccess]= useState(false)
   const[message,setMessage]= useState('')
   const stripe= useStripe()
   const elements= useElements()
   

   const handleSubmit= async(e)=> {
       e.preventDefault()
       //console.log("test");
       const {error, paymentMethod}= await stripe.createPaymentMethod({
           type: "card",
           card: elements.getElement(CardElement)
       })
       //console.log(error, paymentMethod);
   if (!error){
       try {
           const {id}= paymentMethod
           const response= await axios.post ("https://payment-service.vercel.app/api/payments",{
            amount:2000
           })
           //console.log(response);
           if(response.status==200){
               console.log("Successful Payment")
               setSuccess(true)
               setMessage("Successful payment")
           }

       }catch(error){
        console.log("Error ", error)
       }
   }
   else {
    console.log(error.message)
   }
}
   //<!-- ha-calll el send Notifcation function hena --> makan el h2
   return (
        <>
            {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                <div className='FormRow'>
                    <CardElement options={CARD_OPTIONS}/>
                </div>
                </fieldset> 
                <button>Pay</button>
                {message}
        </form> 

        : 
        <div>
            <h2>
            sss
            </h2>
        </div>  
        }
        </>
    )
}