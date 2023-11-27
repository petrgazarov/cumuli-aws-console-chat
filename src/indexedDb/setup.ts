import { IDBPDatabase, openDB } from "idb";

import {
  CHAT_MESSAGE_STORE,
  CHAT_MESSAGE_STORE_INDEX,
  CONVERSATION_STORE,
  CONVERSATION_STORE_INDEX,
  INDEXED_DB_NAME,
  INDEXED_DB_VERSION,
} from "indexedDb/constants";

import { DBSchema } from "./types";

export const setupDb = async () => {
  await openDB<DBSchema>(INDEXED_DB_NAME, INDEXED_DB_VERSION, {
    upgrade: (db: IDBPDatabase<DBSchema>) => {
      const conversationStore = db.createObjectStore(CONVERSATION_STORE, {
        keyPath: "id",
      });
      conversationStore.createIndex(CONVERSATION_STORE_INDEX, "createdAt", {
        unique: true,
      });

      const chatMessageStore = db.createObjectStore(CHAT_MESSAGE_STORE, {
        keyPath: "id",
      });
      chatMessageStore.createIndex(
        CHAT_MESSAGE_STORE_INDEX,
        ["conversationId", "createdAt"],
        {
          unique: true,
        }
      );
    },
  });
};
