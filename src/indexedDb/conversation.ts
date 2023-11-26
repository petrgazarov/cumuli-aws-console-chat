import { openDB } from "idb";

import {
  CONVERSATION_STORE,
  INDEXED_DB_NAME,
  INDEXED_DB_VERSION,
} from "indexedDb/constants";
import { Conversation, NewConversation, Order } from "utils/types";

export const getConversations = async (options: { order: Order }) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CONVERSATION_STORE, "readonly");
  const store = tx.objectStore(CONVERSATION_STORE);
  const index = store.index("createdAtIndex");

  const conversations = await index.getAll(null);

  return options.order === Order.desc
    ? conversations.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : conversations.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
};

export const saveConversation = async (conversation: Conversation) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CONVERSATION_STORE, "readwrite");
  const store = tx.objectStore(CONVERSATION_STORE);

  await store.put(conversation);
  await tx.done;

  return conversation;
};

export const findConversation = async (id: string) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CONVERSATION_STORE, "readonly");
  const store = tx.objectStore(CONVERSATION_STORE);

  return store.get(id);
};

export const createConversation = async () => {
  const conversation = NewConversation();
  await saveConversation(conversation);

  return conversation;
};
