import { openDB } from "idb";

import {
  CHAT_MESSAGE_STORE,
  CHAT_MESSAGE_STORE_INDEX,
  CONVERSATION_PAGE_SIZE,
  CONVERSATION_PREVIEW_CHARACTER_LIMIT,
  CONVERSATION_STORE,
  CONVERSATION_STORE_INDEX,
  INDEXED_DB_NAME,
  INDEXED_DB_VERSION,
} from "indexedDb/constants";
import { getChatMessageText } from "utils/helpers";
import { Conversation, NewConversation, Order } from "utils/types";

import { DBSchemaLatest } from "./versions";

export const getConversations = async (options: {
  order: Order;
  page: number;
}) => {
  const db = await openDB<DBSchemaLatest>(INDEXED_DB_NAME, INDEXED_DB_VERSION);
  const pageSize = CONVERSATION_PAGE_SIZE;

  const tx = db.transaction(
    [CONVERSATION_STORE, CHAT_MESSAGE_STORE],
    "readonly"
  );
  const conversationStore = tx.objectStore(CONVERSATION_STORE);
  const chatMessageStore = tx.objectStore(CHAT_MESSAGE_STORE);
  const conversationIndex = conversationStore.index(CONVERSATION_STORE_INDEX);
  const chatMessageIndex = chatMessageStore.index(CHAT_MESSAGE_STORE_INDEX);

  // Calculate the offset and limit based on the page number
  const offset = (options.page - 1) * pageSize;
  const limit = offset + pageSize;

  // Fetch conversations using a cursor
  const conversations = [];
  let conversationCursor = await conversationIndex.openCursor(
    null,
    options.order === Order.desc ? "prev" : "next"
  );
  let i = 0;
  while (conversationCursor && i < limit) {
    if (i >= offset) {
      const range = IDBKeyRange.bound(
        [conversationCursor.value.id, new Date(0).toISOString()],
        [conversationCursor.value.id, new Date().toISOString()]
      );
      const chatMessageCursor = await chatMessageIndex.openCursor(
        range,
        "next"
      );

      // Add a "preview" field to the conversation
      if (chatMessageCursor) {
        conversationCursor.value.preview = getChatMessageText(
          chatMessageCursor.value
        ).substring(0, CONVERSATION_PREVIEW_CHARACTER_LIMIT);
      } else {
        conversationCursor.value.preview = "";
      }

      conversations.push(conversationCursor.value);
    }

    conversationCursor = await conversationCursor.continue();
    i++;
  }

  return conversations;
};

export const findConversation = async (id: string) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CONVERSATION_STORE, "readonly");
  const store = tx.objectStore(CONVERSATION_STORE);

  return store.get(id);
};

export const touchConversation = async (conversationId: string) => {
  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CONVERSATION_STORE, "readwrite");
  const store = tx.objectStore(CONVERSATION_STORE);

  const conversation = await store.get(conversationId);
  if (!conversation) {
    throw new Error(`No conversation found with id: ${conversationId}`);
  }

  conversation.updatedAt = new Date().toISOString();

  await store.put(conversation);
  await tx.done;

  return conversation;
};

export const createConversation = async () => {
  const conversation = NewConversation();

  const db = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(CONVERSATION_STORE, "readwrite");
  const store = tx.objectStore(CONVERSATION_STORE);

  await store.put(conversation);
  await tx.done;

  return conversation;
};

export const deleteAllConversations = async () => {
  const db = await openDB<DBSchemaLatest>(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(
    [CONVERSATION_STORE, CHAT_MESSAGE_STORE],
    "readwrite"
  );
  const conversationStore = tx.objectStore(CONVERSATION_STORE);
  const chatMessageStore = tx.objectStore(CHAT_MESSAGE_STORE);

  await conversationStore.clear();
  await chatMessageStore.clear();
  await tx.done;
};

export const deleteConversation = async (conversation: Conversation) => {
  const db = await openDB<DBSchemaLatest>(INDEXED_DB_NAME, INDEXED_DB_VERSION);

  const tx = db.transaction(
    [CONVERSATION_STORE, CHAT_MESSAGE_STORE],
    "readwrite"
  );
  const conversationStore = tx.objectStore(CONVERSATION_STORE);
  const chatMessageStore = tx.objectStore(CHAT_MESSAGE_STORE);

  // Delete the conversation
  await conversationStore.delete(conversation.id);

  // Delete all chat messages belonging to the conversation
  const chatMessageIndex = chatMessageStore.index(CHAT_MESSAGE_STORE_INDEX);
  const range = IDBKeyRange.bound(
    [conversation.id, new Date(0).toISOString()],
    [conversation.id, new Date().toISOString()]
  );
  let chatMessageCursor = await chatMessageIndex.openCursor(range);

  while (chatMessageCursor) {
    await chatMessageStore.delete(chatMessageCursor.primaryKey);
    chatMessageCursor = await chatMessageCursor.continue();
  }

  await tx.done;
};
