import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../controllers/users';
import { UserService } from './user.service';
import { UserEntity } from './entity';
import { InviteCodeModule } from '../invite-codes';

@Module({
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
    forwardRef(() => InviteCodeModule)
  ]
})
export class UserModule {}
