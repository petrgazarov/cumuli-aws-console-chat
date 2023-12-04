import {
  CHAT_MESSAGE_STORE,
  CHAT_MESSAGE_STORE_INDEX,
  CONVERSATION_STORE,
  CONVERSATION_STORE_INDEX,
} from "indexedDb/constants";
import { ChatMessage, Conversation } from "utils/types";

export type DBSchemaV1 = {
  [CHAT_MESSAGE_STORE]: {
    indexes: { [CHAT_MESSAGE_STORE_INDEX]: [string, string] };
    key: string;
    value: ChatMessage;
  };
  [CONVERSATION_STORE]: {
    indexes: { createdAtIndex: string };
    key: string;
    value: {
      createdAt: string;
      id: string;
    };
  };
};

export type DBSchemaV2 = {
  [CHAT_MESSAGE_STORE]: {
    indexes: { [CHAT_MESSAGE_STORE_INDEX]: [string, string] };
    key: string;
    value: ChatMessage;
  };
  [CONVERSATION_STORE]: {
    indexes: { [CONVERSATION_STORE_INDEX]: string };
    key: string;
    value: Conversation;
  };
};
