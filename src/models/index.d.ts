import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Item {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly storage: string;
  readonly memo: string;
  readonly expiredAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Item>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}