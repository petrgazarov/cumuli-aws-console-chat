import { openDB } from "idb";

import {
  CHAT_MESSAGE_STORE,
  CHAT_MESSAGE_STORE_INDEX,
  INDEXED_DB_NAME,
  INDEXED_DB_VERSION,
} from "indexedDb/constants";
import { ChatMessage, Order, UserChatMessage } from "utils/types";

import { DBSchemaLatest } from "./versions";

export const getChatMessages = async (options: {
  conversationId: string;
  order: Order;
}) => {
  const db = await openDB<DBSchemaLatest>(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CHAT_MESSAGE_STORE, "readonly");
  const store = tx.objectStore(CHAT_MESSAGE_STORE);
  const index = store.index(CHAT_MESSAGE_STORE_INDEX);

  const range = IDBKeyRange.bound(
    [options.conversationId, new Date(0).toISOString()],
    [options.conversationId, new Date().toISOString()]
  );

  let cursor;
  if (options.order === Order.desc) {
    cursor = await index.openCursor(range, "prev");
  } else {
    cursor = await index.openCursor(range, "next");
  }

  const chatMessages = [];
  while (cursor) {
    chatMessages.push(cursor.value);
    cursor = await cursor.continue();
  }

  return chatMessages;
};

export const saveChatMessage = async (chatMessage: ChatMessage) => {
  const db = await openDB<DBSchemaLatest>(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CHAT_MESSAGE_STORE, "readwrite");
  const store = tx.objectStore(CHAT_MESSAGE_STORE);

  await store.put(chatMessage);
  await tx.done;

  return chatMessage;
};

export const replaceChatMessage = async (chatMessage: UserChatMessage) => {
  const db = await openDB<DBSchemaLatest>(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CHAT_MESSAGE_STORE, "readwrite");
  const store = tx.objectStore(CHAT_MESSAGE_STORE);

  // Get the old chat message
  const oldChatMessage = await store.get(chatMessage.id);

  if (!oldChatMessage) {
    throw new Error("Cannot replace a chat message that does not exist");
  }

  // Assert that the conversationId has not been changed
  if (oldChatMessage.conversationId !== chatMessage.conversationId) {
    throw new Error("Cannot change the conversationId of a chat message");
  }

  // Replace the chat message
  await store.put(chatMessage);

  // Get all chat messages in the same conversation that were created after the old chatMessage
  const index = store.index(CHAT_MESSAGE_STORE_INDEX);
  const range = IDBKeyRange.bound(
    [oldChatMessage.conversationId, oldChatMessage.createdAt],
    [oldChatMessage.conversationId, "\uffff"],
    true,
    true
  );
  let cursor = await index.openCursor(range);

  // Delete all chat messages in the same conversation that were created after the old chatMessage
  while (cursor) {
    await store.delete(cursor.primaryKey);
    cursor = await cursor.continue();
  }

  await tx.done;

  return chatMessage;
};
