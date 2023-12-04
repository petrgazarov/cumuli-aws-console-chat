import { IDBPDatabase, IDBPTransaction } from "idb";

import {
  CONVERSATION_STORE,
  CONVERSATION_STORE_INDEX,
} from "indexedDb/constants";

import { DBSchemaV2 } from "./schemas";

const migrate = (
  _db: IDBPDatabase<DBSchemaV2>,
  tx: IDBPTransaction<DBSchemaV2, (keyof DBSchemaV2)[], "versionchange">
) => {
  const conversationStore = tx.objectStore(CONVERSATION_STORE);

  conversationStore.deleteIndex("createdAtIndex");

  conversationStore.createIndex(CONVERSATION_STORE_INDEX, "updatedAt", {
    unique: true,
  });

  conversationStore.openCursor().then(function cursorIterate(cursor) {
    if (!cursor) {
      return;
    }
    const value = cursor.value;
    value.updatedAt = value.createdAt;
    cursor.update(value);
    cursor.continue().then(cursorIterate);
  });
};

export default migrate;
