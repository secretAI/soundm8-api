import { Request } from 'express';

export interface TelegrafRequest extends Request{
  update: Update;
  botInfo: BotInfo;
  telegram: unknown;
  state: unknown;
  match: unknown;
};

/* botinfo */
interface BotInfo {
  is_bot: boolean;
  first_name: string;
  username: string;
  can_join_groups: boolean;
  can_read_all_group_messages: boolean;
  supports_inline_queries: boolean;
}

/* update */
interface Update {
  update_id: number;
  message: Message;
}

interface Message {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
}

interface Chat {
  id: number;
  first_name: string;
  username: string;
  type: string;
}

interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  language_code: string;
}
