import * as _ from 'lodash';
import { DeferredPromise } from './deferred.promise';
import { update } from 'lodash';
export interface ITableInfo {
  tableName: string;
  primaryKey: string;
}
export let IndexDb: IDBFactory;
if (typeof window !== 'undefined') {
  IndexDb = window.indexedDB;
}
export class StateDBController {
  private db?: IDBDatabase;
  private openPromise: Promise<any> = Promise.resolve();
  constructor(public dbName: string, public tableSchema: ITableInfo[]) {
    void this.initDB();
  }
  initDB(): Promise<any> {
    let req: IDBOpenDBRequest;
    const self = this;
    this.openPromise = this.openPromise.then(() => {
      const deferred = new DeferredPromise<any>();
      if (typeof IndexDb === 'undefined' || !IndexDb.open)
        return Promise.resolve();
      req = IndexDb.open(self.dbName);
      req.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
        self.db = (ev.target as any)['result'];
        self.initSchema(ev);
      };
      req.onsuccess = (e: any) => {
        self.db = e.target.result;
        deferred.resolve(self.db);
      };
      req.onerror = (e: Event) => {
        deferred.reject(e);
      };
      return deferred.promise;
    });
    return this.openPromise;
  }
  initSchema(e: IDBVersionChangeEvent) {
    const db: IDBDatabase = (e.currentTarget as any)['result'];
    let storeArg: IDBObjectStoreParameters;
    let tInfo: ITableInfo;
    for (const it in this.tableSchema) {
      tInfo = this.tableSchema[it];
      storeArg = { keyPath: tInfo.primaryKey, autoIncrement: true };
      var tblLocal: IDBObjectStore;
      tblLocal = db.createObjectStore(tInfo.tableName, storeArg);
      tblLocal.createIndex(tInfo.primaryKey, 'keyPath');
    }
  }
  async reset(): Promise<any> {
    const self = this;
    const db: IDBDatabase = await this.openPromise;
    db.close();
    IndexDb.deleteDatabase(self.dbName);
    return self.initDB();
  }

  async transact<T>(tableInfo: ITableInfo): Promise<StateTableController<T>> {
    const db: IDBDatabase = await this.openPromise;
    return new StateTableController(tableInfo, db);
  }
}

export class StateTableController<T> {
  constructor(private tableInfo: ITableInfo, private db: IDBDatabase) {}
  CreateRow(data: T): Promise<T> {
    let trans: IDBTransaction;
    let objStore: IDBObjectStore;
    let addRequest: IDBRequest;
    const deferred = new DeferredPromise<T>();
    trans = this.db.transaction([this.tableInfo.tableName], 'readwrite');
    objStore = trans.objectStore(this.tableInfo.tableName);
    addRequest = objStore.add(data);
    addRequest.onsuccess = (ev: Event) => {
      deferred.resolve((ev.target as any)['result']);
    };
    return deferred.promise;
  }
  ReadAll(query?: string): Promise<T[]> {
    let trans: IDBTransaction;
    let objStore: IDBObjectStore;
    let getRequest: IDBRequest;
    const deferred = new DeferredPromise<T[]>();
    trans = this.db.transaction([this.tableInfo.tableName], 'readonly');
    objStore = trans.objectStore(this.tableInfo.tableName);
    getRequest = objStore['getAll'](query);
    getRequest.onsuccess = (ev: Event) => {
      const result: T[] = (ev.target as any)['result'];
      deferred.resolve(result);
    };
    getRequest.onerror = (error: Event) => {
      deferred.reject(error);
    };
    return deferred.promise;
  }
  ReadRow(key: string): Promise<T> {
    let trans: IDBTransaction;
    let objStore: IDBObjectStore;
    let getRequest: IDBRequest;
    const deferred = new DeferredPromise<T>();
    trans = this.db.transaction([this.tableInfo.tableName], 'readonly');
    objStore = trans.objectStore(this.tableInfo.tableName);
    getRequest = objStore.get(key);
    getRequest.onsuccess = (ev: Event) => {
      const result: T = (ev.target as any)['result'];
      deferred.resolve(result);
    };
    getRequest.onerror = (error: Event) => {
      deferred.reject(error);
    };
    return deferred.promise;
  }
  UpdateRow(updateData: T): Promise<T> {
    const self = this;
    let trans: IDBTransaction;
    let objStore: IDBObjectStore;
    let getRequest: IDBRequest;
    let index: IDBIndex;
    const deferred = new DeferredPromise<T>();

    trans = this.db.transaction([this.tableInfo.tableName], 'readwrite');
    objStore = trans.objectStore(this.tableInfo.tableName);
    index = objStore.index(this.tableInfo.primaryKey);

    getRequest = index.get((updateData as any)[this.tableInfo.primaryKey]);
    getRequest.onsuccess = (getEvent: Event) => {
      let data: T = (getEvent.target as any)['result'];
      let updateRequest: IDBRequest;
      data = _.assignIn(data, updateData);
      updateRequest = objStore.put(data);
      updateRequest.onsuccess = (updateEvent: Event) => {
        const result: T = (updateEvent.target as any)['result'];
        deferred.resolve(data);
      };
      updateRequest.onerror = (ev: Event) => {
        deferred.reject(ev);
      };
    };
    getRequest.onerror = (ev: Event) => {
      deferred.resolve(self.CreateRow(updateData));
    };
    return deferred.promise;
  }
  DeleteRow(key: string): Promise<T> {
    let trans: IDBTransaction;
    let objStore: IDBObjectStore;
    let getRequest: IDBRequest;
    let index: IDBIndex;
    const deferred = new DeferredPromise<T>();

    trans = this.db.transaction([this.tableInfo.tableName], 'readwrite');
    objStore = trans.objectStore(this.tableInfo.tableName);
    index = objStore.index(this.tableInfo.primaryKey);
    getRequest = index.get(key);
    getRequest.onsuccess = (getEvent: Event) => {
      const data: T = (getEvent.target as any)['result'];
      let deleteRequest: IDBRequest;
      deleteRequest = objStore.delete(key);
      deleteRequest.onsuccess = (updateEvent: Event) => {
        deferred.resolve(data);
      };
      deleteRequest.onerror = (ev: Event) => {
        deferred.reject(ev);
      };
    };
    getRequest.onerror = (ev: Event) => {
      deferred.reject(ev);
    };
    return deferred.promise;
  }
}
