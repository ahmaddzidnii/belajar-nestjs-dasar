import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api/users')
export class UserController {
  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<object> {
    return {
      message: `Hello ${name}`,
    };
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
    const { name } = req.cookies;
    return {
      message: `Hello ${name}`,
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
