import { IDBPDatabase, IDBPTransaction, openDB } from "idb";

import { INDEXED_DB_NAME, INDEXED_DB_VERSION } from "indexedDb/constants";

import { DBSchemaLatest, migrations } from "./versions";
import { DBSchemaV1, DBSchemaV2 } from "./versions/schemas";

export const setupDb = async () => {
  await openDB<DBSchemaLatest>(INDEXED_DB_NAME, INDEXED_DB_VERSION, {
    upgrade: (
      db: any,
      oldVersion: number,
      _newVersion: number | null,
      tx: any
    ) => {
      if (oldVersion < 1) {
        upgradeDB[1](db, tx);
      }
      if (oldVersion < 2) {
        upgradeDB[2](db, tx);
      }
    },
  });
};

const upgradeDB = {
  1: (
    db: IDBPDatabase<DBSchemaV1>,
    tx: IDBPTransaction<DBSchemaV1, (keyof DBSchemaV1)[], "versionchange">
  ) => {
    migrations.initialSetup(db, tx);
  },
  2: (
    db: IDBPDatabase<DBSchemaV2>,
    tx: IDBPTransaction<DBSchemaV2, (keyof DBSchemaV2)[], "versionchange">
  ) => {
    migrations.addConversationUpdatedAt(db, tx);
  },
};
