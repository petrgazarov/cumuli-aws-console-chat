import { IDBPDatabase, openDB } from "idb";

import {
  CHAT_MESSAGE_STORE,
  CONVERSATION_STORE,
  INDEXED_DB_NAME,
  INDEXED_DB_VERSION,
} from "indexedDb/constants";

export const setupDb = async () => {
  await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION, {
    upgrade: (db: IDBPDatabase<unknown>) => {
      const conversationStore = db.createObjectStore(CONVERSATION_STORE, {
        keyPath: "id",
      });
      conversationStore.createIndex("createdAtIndex", "createdAt", {
        unique: false,
      });

      const chatMessageStore = db.createObjectStore(CHAT_MESSAGE_STORE, {
        keyPath: "id",
      });
      chatMessageStore.createIndex("conversationIdIndex", "conversationId", {
        unique: false,
      });
      chatMessageStore.createIndex("createdAtIndex", "createdAt", {
        unique: false,
      });
    },
  });
};
