import initialSetup from "./1_initialSetup";
import addConversationUpdatedAt from "./2_addConversationUpdatedAt";

export const migrations = { addConversationUpdatedAt, initialSetup };

export { DBSchemaV2 as DBSchemaLatest } from "./schemas";
