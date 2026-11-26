require('dotenv').config(); module.exports={port:Number(process.env.PORT||3000),maxArticles:Number.parseInt(process.env.MAX_ARTICLES||'50',10),nodeEnv:process.env.NODE_ENV||'development'};
