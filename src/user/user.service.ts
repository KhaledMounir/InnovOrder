import { Injectable, Res } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose"
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from "bcrypt"
import axios from "axios"
import { JwtService } from '@nestjs/jwt/dist';


@Injectable()
export class UserService {
 constructor(@InjectModel("User") private readonly userModel: Model<User>,
 private jwtService: JwtService) {}

 //La creation d'un utilisateur
 async createUser(user : User){
  try {
   user.password = await bcrypt.hash(user.password, 10);
   const newUser = new this.userModel(user);
   const result = await newUser.save();
   return result;
  } catch (error) {
   console.log(error)
  }
 }

 //l'authentification d'un utilisateur
 async loginUser(user : User, @Res() res){
  try {
   const findUser = await this.userModel.findOne({username : user.username})

   if(!findUser){
    res.status(404).send("user not found")
   }
   const isMatch =  await bcrypt.compare(user.password, findUser.password);

   if( !isMatch){
    return "wrong password"
   }

   const token = this.jwtService.sign({id: findUser._id});
   const {password, _id, username} = findUser

   return {token,_id, username}

  } catch (error) {
   console.log(error)
  }
  
 }

 // gte le produit par son code bar
 async getProduct(codeBar : String){
  let s;
   await axios.get('https://world.openfoodfacts.org/api/v0/product/' + codeBar)
    .then((response) =>  s = response.data)
   return s.product;
 }
}
