import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { InviteCodeEntity, UserEntity } from '../../database/entities';
import { UserService } from './user.service';
import { InviteCodeService } from '../invite-codes/invite-code.service';

@Module({
  controllers: [ 
    UserController
  ],
  providers: [
    UserService,
    InviteCodeService
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      InviteCodeEntity
    ])
  ]
})
export class UserModule {}
