import 'dotenv/config';

export const config = {
  port:          process.env.PORT          || 4000,
  nodeEnv:       process.env.NODE_ENV      || 'development',
  emailUser:     process.env.EMAIL_USER    || '',
  emailPass:     process.env.EMAIL_PASS    || '',
  emailTo:       process.env.EMAIL_TO      || 'priyanautiyal978@gmail.com',
  frontendUrl:   process.env.FRONTEND_URL  || 'http://localhost:5173',
};
