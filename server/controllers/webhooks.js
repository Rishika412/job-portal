import { Webhook } from "svix";
import User from "../models/User.js";

//clerk with db

export const clerkWebhooks=async(req,res)=>{
    try{
        //create svix with webhook scret
        const whook=newWebhook(process.env.CLERK_WEBHOOK_SECRET)


        //verify errors

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        //data from req body
        const {data,type}=req.body

        switch(type){
            case 'user.created':{

                const userData={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url,
                    resume:''
                }
                await User.create(userData)
                res.json({})
                break;

            }
            case 'user.updated':{
                const userData={
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url,
                }

                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
                
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                 res.json({})
                break;
                
            }
            default:
                break;

        }
        

    }catch(error){ 
        console.log(ErrorEvent.message)
        res.json({success:false,message:'Webhooks Error'})
    }
}