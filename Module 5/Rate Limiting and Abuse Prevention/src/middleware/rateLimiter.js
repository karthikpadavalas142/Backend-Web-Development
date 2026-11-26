const rateLimit=require('express-rate-limit');
// Use rate-limit-redis and a shared Redis store in multi-instance deployments; per-process memory counters are independent, so a load balancer can multiply a client's effective allowance.
module.exports=rateLimit({windowMs:15*60*1000,max:5,standardHeaders:true,legacyHeaders:false,skipSuccessfulRequests:true,handler:(req,res)=>{res.setHeader('Retry-After','900');res.status(429).json({error:{code:'RATE_LIMITED',message:'Too many attempts. Try again later.'}});}});
