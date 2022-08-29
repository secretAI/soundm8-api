import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteCodeController } from "src/controllers/invite-codes/invite-code.controller";
import { InviteCodeEntity } from 'src/domain/invite-codes';
import { InviteCodeService } from "src/domain/invite-codes/invite-code.service";
import { UserModule } from 'src/domain/users';

describe('AppController', () => {
  let controller: InviteCodeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ InviteCodeController ],
      providers: [ InviteCodeService ],
      imports: [
        // TypeOrmModule.forFeature([
        //   InviteCodeEntity
        // ]),
        // forwardRef(() => UserModule)
      ]
    }).compile();

    controller = app.get<InviteCodeController>(InviteCodeController);
  });

  describe('Invite Code Controller Test', () => {
    it('Should generate new Invite Code', async () => {
      const code = await controller.create();
      expect(code.body).toHaveLength(18);
      expect(code.user).toBeNull();
    });
  });
});
