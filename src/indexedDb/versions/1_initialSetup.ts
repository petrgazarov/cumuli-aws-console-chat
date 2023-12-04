import { IDBPDatabase, IDBPTransaction } from "idb";

import {
  CHAT_MESSAGE_STORE,
  CHAT_MESSAGE_STORE_INDEX,
  CONVERSATION_STORE,
} from "indexedDb/constants";

import { DBSchemaV1 } from "./schemas";

const migrate = (
  db: IDBPDatabase<DBSchemaV1>,
  _tx: IDBPTransaction<DBSchemaV1, (keyof DBSchemaV1)[], "versionchange">
) => {
  const conversationStore = db.createObjectStore(CONVERSATION_STORE, {
    keyPath: "id",
  });
  conversationStore.createIndex("createdAtIndex", "createdAt", {
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
};

export default migrate;
