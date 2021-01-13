/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateItemInput = {
  id?: string | null,
  name: string,
  category: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  expiredAt: string,
  storage: string,
  memo: string,
  _version?: number | null,
};

export type ModelItemConditionInput = {
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  expiredAt?: ModelStringInput | null,
  storage?: ModelStringInput | null,
  memo?: ModelStringInput | null,
  and?: Array< ModelItemConditionInput | null > | null,
  or?: Array< ModelItemConditionInput | null > | null,
  not?: ModelItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateItemInput = {
  id: string,
  name?: string | null,
  category?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  expiredAt?: string | null,
  storage?: string | null,
  memo?: string | null,
  _version?: number | null,
};

export type DeleteItemInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelItemFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  expiredAt?: ModelStringInput | null,
  storage?: ModelStringInput | null,
  memo?: ModelStringInput | null,
  and?: Array< ModelItemFilterInput | null > | null,
  or?: Array< ModelItemFilterInput | null > | null,
  not?: ModelItemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateItemMutationVariables = {
  input: CreateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type CreateItemMutation = {
  createItem:  {
    __typename: "Item",
    id: string,
    name: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    expiredAt: string,
    storage: string,
    memo: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type UpdateItemMutationVariables = {
  input: UpdateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type UpdateItemMutation = {
  updateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    expiredAt: string,
    storage: string,
    memo: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type DeleteItemMutationVariables = {
  input: DeleteItemInput,
  condition?: ModelItemConditionInput | null,
};

export type DeleteItemMutation = {
  deleteItem:  {
    __typename: "Item",
    id: string,
    name: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    expiredAt: string,
    storage: string,
    memo: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type SyncItemsQueryVariables = {
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncItemsQuery = {
  syncItems:  {
    __typename: "ModelItemConnection",
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      category: string,
      createdAt: string,
      updatedAt: string,
      expiredAt: string,
      storage: string,
      memo: string,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetItemQueryVariables = {
  id: string,
};

export type GetItemQuery = {
  getItem:  {
    __typename: "Item",
    id: string,
    name: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    expiredAt: string,
    storage: string,
    memo: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type ListItemsQueryVariables = {
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsQuery = {
  listItems:  {
    __typename: "ModelItemConnection",
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      category: string,
      createdAt: string,
      updatedAt: string,
      expiredAt: string,
      storage: string,
      memo: string,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type OnCreateItemSubscriptionVariables = {
  owner: string,
};

export type OnCreateItemSubscription = {
  onCreateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    expiredAt: string,
    storage: string,
    memo: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnUpdateItemSubscriptionVariables = {
  owner: string,
};

export type OnUpdateItemSubscription = {
  onUpdateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    expiredAt: string,
    storage: string,
    memo: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnDeleteItemSubscriptionVariables = {
  owner: string,
};

export type OnDeleteItemSubscription = {
  onDeleteItem:  {
    __typename: "Item",
    id: string,
    name: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    expiredAt: string,
    storage: string,
    memo: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};
