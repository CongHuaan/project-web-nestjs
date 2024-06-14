import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('signin')
  @Render('signin.ejs') 
  SignInPage() {
    return {};
  }

  @Get('signup')
  @Render('signup.ejs') 
  SignUpPage() {
    return {};
  }

  @Get('home')
  @Render('index.ejs') 
  HomePage() {
    return {message: 'Hello World!'};
  }
}
