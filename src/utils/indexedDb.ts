import { openDB } from "idb";

import { INDEXED_DB_NAME, INDEXED_DB_VERSION } from "utils/constants";

import { ChatConversation } from "./types";

export const getConversations = async (lastCreatedAt = null) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction("conversations", "readonly");
  const store = tx.objectStore("conversations");
  const index = store.index("createdAt");

  let cursor;
  if (lastCreatedAt) {
    cursor = await index.openCursor(
      IDBKeyRange.lowerBound(lastCreatedAt, true),
      "prev"
    );
  } else {
    cursor = await index.openCursor();
  }

  const conversations = [];
  let count = 0;

  while (cursor && count < 25) {
    conversations.push(cursor.value);
    cursor = await cursor.continue();
    count++;
  }

  return conversations;
};

export const saveConversation = async (conversation: ChatConversation) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction("conversations", "readwrite");
  const store = tx.objectStore("conversations");

  await store.put(conversation);

  return conversation;
};
