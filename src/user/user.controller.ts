import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
 constructor(private readonly userService : UserService){}
 
 //La creation d'un utilisateur
 @Post()
 createUser(@Body() user : User){
  return this.userService.createUser(user);
 }

 //l'authentification d'un utilisateur
 @Post("login")
 loginUser(@Body() user:User){
  return this.userService.loginUser(user)
 }

 // gte le produit par son code bar
 @Get("/product/:codeBar")
 async getProduct(@Param("codeBar") codeBar : string, @Req() req){
  const authHeader = req.headers.token;
  if (authHeader) {
   return this.userService.getProduct(codeBar)
   };
  return "You are not authenticated!";
 }
}