import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private service: UserService) {}
  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/set-cookie')
  async setCookie(@Query('name') name: string, @Res() res: Response) {
    res.cookie('username', name, { httpOnly: true });
    res.json({
      message: `success`,
    });
  }
  @Get('/get-cookie')
  async getCookie(@Req() req: Request) {
    const { username } = req.cookies;
    return {
      message: `Hello ${username}`,
    };
  }
  @Get('/:id')
  userById(@Param('id') id: string, @Query('name') name: string): object {
    return {
      id: id,
      query: name,
    };
  }
}
