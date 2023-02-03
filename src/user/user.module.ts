import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import {MongooseModule} from "@nestjs/mongoose"
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forFeature([{name:"User", schema: UserSchema}]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret : "light",
    signOptions : {
     expiresIn : "3d",
    },
   }),

],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
