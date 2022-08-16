import { Controller, Get, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';


@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res()res: Response): any /*FIX type */ {
    throw new HttpException('Damn :(', HttpStatus.BAD_REQUEST); /*remove */
  }
}
