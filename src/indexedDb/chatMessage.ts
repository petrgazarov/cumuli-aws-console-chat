import { openDB } from "idb";

import {
  CHAT_MESSAGE_STORE,
  INDEXED_DB_NAME,
  INDEXED_DB_VERSION,
} from "indexedDb/constants";
import { ChatMessage, NewChatMessage, Order } from "utils/types";

export const getChatMessages = async (options: {
  conversationId: string;
  order: Order;
}) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CHAT_MESSAGE_STORE, "readonly");
  const store = tx.objectStore(CHAT_MESSAGE_STORE);
  const index = store.index("conversationIdIndex");

  const range = IDBKeyRange.only(options.conversationId);
  let cursor = await index.openCursor(range);

  const chatMessages = [];
  while (cursor) {
    chatMessages.push(cursor.value);
    cursor = await cursor.continue();
  }

  return options.order === Order.desc
    ? chatMessages.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : chatMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
};

export const saveChatMessage = async (chatMessage: ChatMessage) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CHAT_MESSAGE_STORE, "readwrite");
  const store = tx.objectStore(CHAT_MESSAGE_STORE);

  await store.put(chatMessage);
  await tx.done;

  return chatMessage;
};

export const createChatMessage = async ({
  content,
  role,
  conversationId,
}: Omit<ChatMessage, "id" | "createdAt">) => {
  const chatMessage = NewChatMessage({ content, role, conversationId });
  await saveChatMessage(chatMessage);

  return chatMessage;
};
