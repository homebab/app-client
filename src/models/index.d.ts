import {ModelInit, MutableModel} from "@aws-amplify/datastore";


export declare class Item {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly expiredAt: string;
  readonly storage: string;
  readonly memo?: string;
  constructor(init: ModelInit<Item>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}