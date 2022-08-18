import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
} from "nestjs-telegraf";
import { Markup, Context } from "telegraf";
import { RobotPhraseList } from "../../lib/robot";

@Update()
export class RobotService {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      RobotPhraseList.startMessage(ctx.from.username), 
      Markup.keyboard([
        ['Регистрация', 'История заказов']
      ]).resize()
    );
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    console.log(ctx);
    await ctx.reply('Hey there');
  }
}