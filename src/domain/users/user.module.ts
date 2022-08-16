import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/users';
import { UserEntity } from 'src/database/entities';
import { UserService } from './user.service';

@Module({
  controllers: [ 
    UserController
  ],
  providers: [
    UserService
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ]
})
export class UserModule {}
