# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyUser*](#getmyuser)
  - [*ListAllUsers*](#listallusers)
  - [*GetEntry*](#getentry)
  - [*ListMyEntries*](#listmyentries)
  - [*GetTag*](#gettag)
  - [*ListMyTags*](#listmytags)
  - [*ListEntryTags*](#listentrytags)
  - [*GetReminder*](#getreminder)
  - [*ListMyReminders*](#listmyreminders)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateMyUser*](#updatemyuser)
  - [*DeleteMyUser*](#deletemyuser)
  - [*CreateEntry*](#createentry)
  - [*UpdateEntry*](#updateentry)
  - [*DeleteEntry*](#deleteentry)
  - [*CreateTag*](#createtag)
  - [*UpdateTag*](#updatetag)
  - [*DeleteTag*](#deletetag)
  - [*LinkEntryToTag*](#linkentrytotag)
  - [*RemoveEntryTag*](#removeentrytag)
  - [*CreateReminder*](#createreminder)
  - [*UpdateReminder*](#updatereminder)
  - [*DeleteReminder*](#deletereminder)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyUser
You can execute the `GetMyUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyUser(options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;

interface GetMyUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserData, undefined>;
}
export const getMyUserRef: GetMyUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;

interface GetMyUserRef {
  ...
  (dc: DataConnect): QueryRef<GetMyUserData, undefined>;
}
export const getMyUserRef: GetMyUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyUserRef:
```typescript
const name = getMyUserRef.operationName;
console.log(name);
```

### Variables
The `GetMyUser` query has no variables.
### Return Type
Recall that executing the `GetMyUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyUserData {
  user?: {
    email: string;
    displayName?: string | null;
  };
}
```
### Using `GetMyUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyUser } from '@dataconnect/generated';


// Call the `getMyUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getMyUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetMyUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyUserRef } from '@dataconnect/generated';


// Call the `getMyUserRef()` function to get a reference to the query.
const ref = getMyUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListAllUsers
You can execute the `ListAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllUsersRef:
```typescript
const name = listAllUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAllUsers` query has no variables.
### Return Type
Recall that executing the `ListAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllUsersData {
  users: ({
    displayName?: string | null;
  })[];
}
```
### Using `ListAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllUsers } from '@dataconnect/generated';


// Call the `listAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllUsersRef } from '@dataconnect/generated';


// Call the `listAllUsersRef()` function to get a reference to the query.
const ref = listAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetEntry
You can execute the `GetEntry` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEntry(vars: GetEntryVariables, options?: ExecuteQueryOptions): QueryPromise<GetEntryData, GetEntryVariables>;

interface GetEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEntryVariables): QueryRef<GetEntryData, GetEntryVariables>;
}
export const getEntryRef: GetEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEntry(dc: DataConnect, vars: GetEntryVariables, options?: ExecuteQueryOptions): QueryPromise<GetEntryData, GetEntryVariables>;

interface GetEntryRef {
  ...
  (dc: DataConnect, vars: GetEntryVariables): QueryRef<GetEntryData, GetEntryVariables>;
}
export const getEntryRef: GetEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEntryRef:
```typescript
const name = getEntryRef.operationName;
console.log(name);
```

### Variables
The `GetEntry` query requires an argument of type `GetEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEntryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetEntry` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEntryData {
  entry?: {
    content: string;
    isFavorite?: boolean | null;
  };
}
```
### Using `GetEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEntry, GetEntryVariables } from '@dataconnect/generated';

// The `GetEntry` query requires an argument of type `GetEntryVariables`:
const getEntryVars: GetEntryVariables = {
  id: ..., 
};

// Call the `getEntry()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEntry(getEntryVars);
// Variables can be defined inline as well.
const { data } = await getEntry({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEntry(dataConnect, getEntryVars);

console.log(data.entry);

// Or, you can use the `Promise` API.
getEntry(getEntryVars).then((response) => {
  const data = response.data;
  console.log(data.entry);
});
```

### Using `GetEntry`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEntryRef, GetEntryVariables } from '@dataconnect/generated';

// The `GetEntry` query requires an argument of type `GetEntryVariables`:
const getEntryVars: GetEntryVariables = {
  id: ..., 
};

// Call the `getEntryRef()` function to get a reference to the query.
const ref = getEntryRef(getEntryVars);
// Variables can be defined inline as well.
const ref = getEntryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEntryRef(dataConnect, getEntryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.entry);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.entry);
});
```

## ListMyEntries
You can execute the `ListMyEntries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyEntries(options?: ExecuteQueryOptions): QueryPromise<ListMyEntriesData, undefined>;

interface ListMyEntriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEntriesData, undefined>;
}
export const listMyEntriesRef: ListMyEntriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyEntries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEntriesData, undefined>;

interface ListMyEntriesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyEntriesData, undefined>;
}
export const listMyEntriesRef: ListMyEntriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyEntriesRef:
```typescript
const name = listMyEntriesRef.operationName;
console.log(name);
```

### Variables
The `ListMyEntries` query has no variables.
### Return Type
Recall that executing the `ListMyEntries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyEntriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyEntriesData {
  entries: ({
    content: string;
    createdAt: TimestampString;
  })[];
}
```
### Using `ListMyEntries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyEntries } from '@dataconnect/generated';


// Call the `listMyEntries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyEntries();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyEntries(dataConnect);

console.log(data.entries);

// Or, you can use the `Promise` API.
listMyEntries().then((response) => {
  const data = response.data;
  console.log(data.entries);
});
```

### Using `ListMyEntries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyEntriesRef } from '@dataconnect/generated';


// Call the `listMyEntriesRef()` function to get a reference to the query.
const ref = listMyEntriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyEntriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.entries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.entries);
});
```

## GetTag
You can execute the `GetTag` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTag(vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;

interface GetTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
}
export const getTagRef: GetTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTag(dc: DataConnect, vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;

interface GetTagRef {
  ...
  (dc: DataConnect, vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
}
export const getTagRef: GetTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTagRef:
```typescript
const name = getTagRef.operationName;
console.log(name);
```

### Variables
The `GetTag` query requires an argument of type `GetTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTagVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTag` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTagData {
  tag?: {
    name: string;
  };
}
```
### Using `GetTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTag, GetTagVariables } from '@dataconnect/generated';

// The `GetTag` query requires an argument of type `GetTagVariables`:
const getTagVars: GetTagVariables = {
  id: ..., 
};

// Call the `getTag()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTag(getTagVars);
// Variables can be defined inline as well.
const { data } = await getTag({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTag(dataConnect, getTagVars);

console.log(data.tag);

// Or, you can use the `Promise` API.
getTag(getTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag);
});
```

### Using `GetTag`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTagRef, GetTagVariables } from '@dataconnect/generated';

// The `GetTag` query requires an argument of type `GetTagVariables`:
const getTagVars: GetTagVariables = {
  id: ..., 
};

// Call the `getTagRef()` function to get a reference to the query.
const ref = getTagRef(getTagVars);
// Variables can be defined inline as well.
const ref = getTagRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTagRef(dataConnect, getTagVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tag);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tag);
});
```

## ListMyTags
You can execute the `ListMyTags` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyTags(options?: ExecuteQueryOptions): QueryPromise<ListMyTagsData, undefined>;

interface ListMyTagsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyTagsData, undefined>;
}
export const listMyTagsRef: ListMyTagsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyTagsData, undefined>;

interface ListMyTagsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyTagsData, undefined>;
}
export const listMyTagsRef: ListMyTagsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyTagsRef:
```typescript
const name = listMyTagsRef.operationName;
console.log(name);
```

### Variables
The `ListMyTags` query has no variables.
### Return Type
Recall that executing the `ListMyTags` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyTagsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyTagsData {
  tags: ({
    name: string;
  })[];
}
```
### Using `ListMyTags`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyTags } from '@dataconnect/generated';


// Call the `listMyTags()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyTags();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyTags(dataConnect);

console.log(data.tags);

// Or, you can use the `Promise` API.
listMyTags().then((response) => {
  const data = response.data;
  console.log(data.tags);
});
```

### Using `ListMyTags`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyTagsRef } from '@dataconnect/generated';


// Call the `listMyTagsRef()` function to get a reference to the query.
const ref = listMyTagsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyTagsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tags);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tags);
});
```

## ListEntryTags
You can execute the `ListEntryTags` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEntryTags(options?: ExecuteQueryOptions): QueryPromise<ListEntryTagsData, undefined>;

interface ListEntryTagsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEntryTagsData, undefined>;
}
export const listEntryTagsRef: ListEntryTagsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEntryTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListEntryTagsData, undefined>;

interface ListEntryTagsRef {
  ...
  (dc: DataConnect): QueryRef<ListEntryTagsData, undefined>;
}
export const listEntryTagsRef: ListEntryTagsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEntryTagsRef:
```typescript
const name = listEntryTagsRef.operationName;
console.log(name);
```

### Variables
The `ListEntryTags` query has no variables.
### Return Type
Recall that executing the `ListEntryTags` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEntryTagsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEntryTagsData {
  entryTags: ({
    entry: {
      content: string;
    };
    tag: {
      name: string;
    };
  })[];
}
```
### Using `ListEntryTags`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEntryTags } from '@dataconnect/generated';


// Call the `listEntryTags()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEntryTags();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEntryTags(dataConnect);

console.log(data.entryTags);

// Or, you can use the `Promise` API.
listEntryTags().then((response) => {
  const data = response.data;
  console.log(data.entryTags);
});
```

### Using `ListEntryTags`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEntryTagsRef } from '@dataconnect/generated';


// Call the `listEntryTagsRef()` function to get a reference to the query.
const ref = listEntryTagsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEntryTagsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.entryTags);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.entryTags);
});
```

## GetReminder
You can execute the `GetReminder` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getReminder(vars: GetReminderVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderData, GetReminderVariables>;

interface GetReminderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReminderVariables): QueryRef<GetReminderData, GetReminderVariables>;
}
export const getReminderRef: GetReminderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getReminder(dc: DataConnect, vars: GetReminderVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderData, GetReminderVariables>;

interface GetReminderRef {
  ...
  (dc: DataConnect, vars: GetReminderVariables): QueryRef<GetReminderData, GetReminderVariables>;
}
export const getReminderRef: GetReminderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getReminderRef:
```typescript
const name = getReminderRef.operationName;
console.log(name);
```

### Variables
The `GetReminder` query requires an argument of type `GetReminderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetReminderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetReminder` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetReminderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetReminderData {
  reminder?: {
    time: string;
    isEnabled: boolean;
  };
}
```
### Using `GetReminder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getReminder, GetReminderVariables } from '@dataconnect/generated';

// The `GetReminder` query requires an argument of type `GetReminderVariables`:
const getReminderVars: GetReminderVariables = {
  id: ..., 
};

// Call the `getReminder()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getReminder(getReminderVars);
// Variables can be defined inline as well.
const { data } = await getReminder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getReminder(dataConnect, getReminderVars);

console.log(data.reminder);

// Or, you can use the `Promise` API.
getReminder(getReminderVars).then((response) => {
  const data = response.data;
  console.log(data.reminder);
});
```

### Using `GetReminder`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getReminderRef, GetReminderVariables } from '@dataconnect/generated';

// The `GetReminder` query requires an argument of type `GetReminderVariables`:
const getReminderVars: GetReminderVariables = {
  id: ..., 
};

// Call the `getReminderRef()` function to get a reference to the query.
const ref = getReminderRef(getReminderVars);
// Variables can be defined inline as well.
const ref = getReminderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getReminderRef(dataConnect, getReminderVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reminder);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder);
});
```

## ListMyReminders
You can execute the `ListMyReminders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyReminders(options?: ExecuteQueryOptions): QueryPromise<ListMyRemindersData, undefined>;

interface ListMyRemindersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyRemindersData, undefined>;
}
export const listMyRemindersRef: ListMyRemindersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyReminders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyRemindersData, undefined>;

interface ListMyRemindersRef {
  ...
  (dc: DataConnect): QueryRef<ListMyRemindersData, undefined>;
}
export const listMyRemindersRef: ListMyRemindersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyRemindersRef:
```typescript
const name = listMyRemindersRef.operationName;
console.log(name);
```

### Variables
The `ListMyReminders` query has no variables.
### Return Type
Recall that executing the `ListMyReminders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyRemindersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyRemindersData {
  reminders: ({
    time: string;
    isEnabled: boolean;
  })[];
}
```
### Using `ListMyReminders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyReminders } from '@dataconnect/generated';


// Call the `listMyReminders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyReminders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyReminders(dataConnect);

console.log(data.reminders);

// Or, you can use the `Promise` API.
listMyReminders().then((response) => {
  const data = response.data;
  console.log(data.reminders);
});
```

### Using `ListMyReminders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyRemindersRef } from '@dataconnect/generated';


// Call the `listMyRemindersRef()` function to get a reference to the query.
const ref = listMyRemindersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyRemindersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reminders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reminders);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateMyUser
You can execute the `UpdateMyUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyUser(vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;

interface UpdateMyUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
}
export const updateMyUserRef: UpdateMyUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyUser(dc: DataConnect, vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;

interface UpdateMyUserRef {
  ...
  (dc: DataConnect, vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
}
export const updateMyUserRef: UpdateMyUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyUserRef:
```typescript
const name = updateMyUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyUser` mutation has an optional argument of type `UpdateMyUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyUserVariables {
  displayName?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateMyUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyUser, UpdateMyUserVariables } from '@dataconnect/generated';

// The `UpdateMyUser` mutation has an optional argument of type `UpdateMyUserVariables`:
const updateMyUserVars: UpdateMyUserVariables = {
  displayName: ..., // optional
};

// Call the `updateMyUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyUser(updateMyUserVars);
// Variables can be defined inline as well.
const { data } = await updateMyUser({ displayName: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyUserVariables` argument.
const { data } = await updateMyUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyUser(dataConnect, updateMyUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateMyUser(updateMyUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateMyUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyUserRef, UpdateMyUserVariables } from '@dataconnect/generated';

// The `UpdateMyUser` mutation has an optional argument of type `UpdateMyUserVariables`:
const updateMyUserVars: UpdateMyUserVariables = {
  displayName: ..., // optional
};

// Call the `updateMyUserRef()` function to get a reference to the mutation.
const ref = updateMyUserRef(updateMyUserVars);
// Variables can be defined inline as well.
const ref = updateMyUserRef({ displayName: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyUserVariables` argument.
const ref = updateMyUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyUserRef(dataConnect, updateMyUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteMyUser
You can execute the `DeleteMyUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMyUser(): MutationPromise<DeleteMyUserData, undefined>;

interface DeleteMyUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyUserData, undefined>;
}
export const deleteMyUserRef: DeleteMyUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyUser(dc: DataConnect): MutationPromise<DeleteMyUserData, undefined>;

interface DeleteMyUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteMyUserData, undefined>;
}
export const deleteMyUserRef: DeleteMyUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyUserRef:
```typescript
const name = deleteMyUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteMyUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteMyUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyUser } from '@dataconnect/generated';


// Call the `deleteMyUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteMyUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteMyUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyUserRef } from '@dataconnect/generated';


// Call the `deleteMyUserRef()` function to get a reference to the mutation.
const ref = deleteMyUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateEntry
You can execute the `CreateEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEntry(vars: CreateEntryVariables): MutationPromise<CreateEntryData, CreateEntryVariables>;

interface CreateEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEntryVariables): MutationRef<CreateEntryData, CreateEntryVariables>;
}
export const createEntryRef: CreateEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEntry(dc: DataConnect, vars: CreateEntryVariables): MutationPromise<CreateEntryData, CreateEntryVariables>;

interface CreateEntryRef {
  ...
  (dc: DataConnect, vars: CreateEntryVariables): MutationRef<CreateEntryData, CreateEntryVariables>;
}
export const createEntryRef: CreateEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEntryRef:
```typescript
const name = createEntryRef.operationName;
console.log(name);
```

### Variables
The `CreateEntry` mutation requires an argument of type `CreateEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEntryVariables {
  content: string;
}
```
### Return Type
Recall that executing the `CreateEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEntryData {
  entry_insert: Entry_Key;
}
```
### Using `CreateEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEntry, CreateEntryVariables } from '@dataconnect/generated';

// The `CreateEntry` mutation requires an argument of type `CreateEntryVariables`:
const createEntryVars: CreateEntryVariables = {
  content: ..., 
};

// Call the `createEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEntry(createEntryVars);
// Variables can be defined inline as well.
const { data } = await createEntry({ content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEntry(dataConnect, createEntryVars);

console.log(data.entry_insert);

// Or, you can use the `Promise` API.
createEntry(createEntryVars).then((response) => {
  const data = response.data;
  console.log(data.entry_insert);
});
```

### Using `CreateEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEntryRef, CreateEntryVariables } from '@dataconnect/generated';

// The `CreateEntry` mutation requires an argument of type `CreateEntryVariables`:
const createEntryVars: CreateEntryVariables = {
  content: ..., 
};

// Call the `createEntryRef()` function to get a reference to the mutation.
const ref = createEntryRef(createEntryVars);
// Variables can be defined inline as well.
const ref = createEntryRef({ content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEntryRef(dataConnect, createEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.entry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.entry_insert);
});
```

## UpdateEntry
You can execute the `UpdateEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEntry(vars: UpdateEntryVariables): MutationPromise<UpdateEntryData, UpdateEntryVariables>;

interface UpdateEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEntryVariables): MutationRef<UpdateEntryData, UpdateEntryVariables>;
}
export const updateEntryRef: UpdateEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEntry(dc: DataConnect, vars: UpdateEntryVariables): MutationPromise<UpdateEntryData, UpdateEntryVariables>;

interface UpdateEntryRef {
  ...
  (dc: DataConnect, vars: UpdateEntryVariables): MutationRef<UpdateEntryData, UpdateEntryVariables>;
}
export const updateEntryRef: UpdateEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEntryRef:
```typescript
const name = updateEntryRef.operationName;
console.log(name);
```

### Variables
The `UpdateEntry` mutation requires an argument of type `UpdateEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEntryVariables {
  id: UUIDString;
  isFavorite?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEntryData {
  entry_update?: Entry_Key | null;
}
```
### Using `UpdateEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEntry, UpdateEntryVariables } from '@dataconnect/generated';

// The `UpdateEntry` mutation requires an argument of type `UpdateEntryVariables`:
const updateEntryVars: UpdateEntryVariables = {
  id: ..., 
  isFavorite: ..., // optional
};

// Call the `updateEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEntry(updateEntryVars);
// Variables can be defined inline as well.
const { data } = await updateEntry({ id: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEntry(dataConnect, updateEntryVars);

console.log(data.entry_update);

// Or, you can use the `Promise` API.
updateEntry(updateEntryVars).then((response) => {
  const data = response.data;
  console.log(data.entry_update);
});
```

### Using `UpdateEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEntryRef, UpdateEntryVariables } from '@dataconnect/generated';

// The `UpdateEntry` mutation requires an argument of type `UpdateEntryVariables`:
const updateEntryVars: UpdateEntryVariables = {
  id: ..., 
  isFavorite: ..., // optional
};

// Call the `updateEntryRef()` function to get a reference to the mutation.
const ref = updateEntryRef(updateEntryVars);
// Variables can be defined inline as well.
const ref = updateEntryRef({ id: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEntryRef(dataConnect, updateEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.entry_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.entry_update);
});
```

## DeleteEntry
You can execute the `DeleteEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteEntry(vars: DeleteEntryVariables): MutationPromise<DeleteEntryData, DeleteEntryVariables>;

interface DeleteEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEntryVariables): MutationRef<DeleteEntryData, DeleteEntryVariables>;
}
export const deleteEntryRef: DeleteEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteEntry(dc: DataConnect, vars: DeleteEntryVariables): MutationPromise<DeleteEntryData, DeleteEntryVariables>;

interface DeleteEntryRef {
  ...
  (dc: DataConnect, vars: DeleteEntryVariables): MutationRef<DeleteEntryData, DeleteEntryVariables>;
}
export const deleteEntryRef: DeleteEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteEntryRef:
```typescript
const name = deleteEntryRef.operationName;
console.log(name);
```

### Variables
The `DeleteEntry` mutation requires an argument of type `DeleteEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteEntryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteEntryData {
  entry_delete?: Entry_Key | null;
}
```
### Using `DeleteEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteEntry, DeleteEntryVariables } from '@dataconnect/generated';

// The `DeleteEntry` mutation requires an argument of type `DeleteEntryVariables`:
const deleteEntryVars: DeleteEntryVariables = {
  id: ..., 
};

// Call the `deleteEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteEntry(deleteEntryVars);
// Variables can be defined inline as well.
const { data } = await deleteEntry({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteEntry(dataConnect, deleteEntryVars);

console.log(data.entry_delete);

// Or, you can use the `Promise` API.
deleteEntry(deleteEntryVars).then((response) => {
  const data = response.data;
  console.log(data.entry_delete);
});
```

### Using `DeleteEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteEntryRef, DeleteEntryVariables } from '@dataconnect/generated';

// The `DeleteEntry` mutation requires an argument of type `DeleteEntryVariables`:
const deleteEntryVars: DeleteEntryVariables = {
  id: ..., 
};

// Call the `deleteEntryRef()` function to get a reference to the mutation.
const ref = deleteEntryRef(deleteEntryVars);
// Variables can be defined inline as well.
const ref = deleteEntryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteEntryRef(dataConnect, deleteEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.entry_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.entry_delete);
});
```

## CreateTag
You can execute the `CreateTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTag(vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface CreateTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
}
export const createTagRef: CreateTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTag(dc: DataConnect, vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface CreateTagRef {
  ...
  (dc: DataConnect, vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
}
export const createTagRef: CreateTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTagRef:
```typescript
const name = createTagRef.operationName;
console.log(name);
```

### Variables
The `CreateTag` mutation requires an argument of type `CreateTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTagVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTagData {
  tag_insert: Tag_Key;
}
```
### Using `CreateTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTag, CreateTagVariables } from '@dataconnect/generated';

// The `CreateTag` mutation requires an argument of type `CreateTagVariables`:
const createTagVars: CreateTagVariables = {
  name: ..., 
};

// Call the `createTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTag(createTagVars);
// Variables can be defined inline as well.
const { data } = await createTag({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTag(dataConnect, createTagVars);

console.log(data.tag_insert);

// Or, you can use the `Promise` API.
createTag(createTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag_insert);
});
```

### Using `CreateTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTagRef, CreateTagVariables } from '@dataconnect/generated';

// The `CreateTag` mutation requires an argument of type `CreateTagVariables`:
const createTagVars: CreateTagVariables = {
  name: ..., 
};

// Call the `createTagRef()` function to get a reference to the mutation.
const ref = createTagRef(createTagVars);
// Variables can be defined inline as well.
const ref = createTagRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTagRef(dataConnect, createTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tag_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tag_insert);
});
```

## UpdateTag
You can execute the `UpdateTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTag(vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;

interface UpdateTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
}
export const updateTagRef: UpdateTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTag(dc: DataConnect, vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;

interface UpdateTagRef {
  ...
  (dc: DataConnect, vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
}
export const updateTagRef: UpdateTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTagRef:
```typescript
const name = updateTagRef.operationName;
console.log(name);
```

### Variables
The `UpdateTag` mutation requires an argument of type `UpdateTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTagVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTagData {
  tag_update?: Tag_Key | null;
}
```
### Using `UpdateTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTag, UpdateTagVariables } from '@dataconnect/generated';

// The `UpdateTag` mutation requires an argument of type `UpdateTagVariables`:
const updateTagVars: UpdateTagVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTag(updateTagVars);
// Variables can be defined inline as well.
const { data } = await updateTag({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTag(dataConnect, updateTagVars);

console.log(data.tag_update);

// Or, you can use the `Promise` API.
updateTag(updateTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag_update);
});
```

### Using `UpdateTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTagRef, UpdateTagVariables } from '@dataconnect/generated';

// The `UpdateTag` mutation requires an argument of type `UpdateTagVariables`:
const updateTagVars: UpdateTagVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateTagRef()` function to get a reference to the mutation.
const ref = updateTagRef(updateTagVars);
// Variables can be defined inline as well.
const ref = updateTagRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTagRef(dataConnect, updateTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tag_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tag_update);
});
```

## DeleteTag
You can execute the `DeleteTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTag(vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;

interface DeleteTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
}
export const deleteTagRef: DeleteTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTag(dc: DataConnect, vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;

interface DeleteTagRef {
  ...
  (dc: DataConnect, vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
}
export const deleteTagRef: DeleteTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTagRef:
```typescript
const name = deleteTagRef.operationName;
console.log(name);
```

### Variables
The `DeleteTag` mutation requires an argument of type `DeleteTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTagVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTagData {
  tag_delete?: Tag_Key | null;
}
```
### Using `DeleteTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTag, DeleteTagVariables } from '@dataconnect/generated';

// The `DeleteTag` mutation requires an argument of type `DeleteTagVariables`:
const deleteTagVars: DeleteTagVariables = {
  id: ..., 
};

// Call the `deleteTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTag(deleteTagVars);
// Variables can be defined inline as well.
const { data } = await deleteTag({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTag(dataConnect, deleteTagVars);

console.log(data.tag_delete);

// Or, you can use the `Promise` API.
deleteTag(deleteTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag_delete);
});
```

### Using `DeleteTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTagRef, DeleteTagVariables } from '@dataconnect/generated';

// The `DeleteTag` mutation requires an argument of type `DeleteTagVariables`:
const deleteTagVars: DeleteTagVariables = {
  id: ..., 
};

// Call the `deleteTagRef()` function to get a reference to the mutation.
const ref = deleteTagRef(deleteTagVars);
// Variables can be defined inline as well.
const ref = deleteTagRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTagRef(dataConnect, deleteTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tag_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tag_delete);
});
```

## LinkEntryToTag
You can execute the `LinkEntryToTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
linkEntryToTag(vars: LinkEntryToTagVariables): MutationPromise<LinkEntryToTagData, LinkEntryToTagVariables>;

interface LinkEntryToTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LinkEntryToTagVariables): MutationRef<LinkEntryToTagData, LinkEntryToTagVariables>;
}
export const linkEntryToTagRef: LinkEntryToTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
linkEntryToTag(dc: DataConnect, vars: LinkEntryToTagVariables): MutationPromise<LinkEntryToTagData, LinkEntryToTagVariables>;

interface LinkEntryToTagRef {
  ...
  (dc: DataConnect, vars: LinkEntryToTagVariables): MutationRef<LinkEntryToTagData, LinkEntryToTagVariables>;
}
export const linkEntryToTagRef: LinkEntryToTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the linkEntryToTagRef:
```typescript
const name = linkEntryToTagRef.operationName;
console.log(name);
```

### Variables
The `LinkEntryToTag` mutation requires an argument of type `LinkEntryToTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LinkEntryToTagVariables {
  entryId: UUIDString;
  tagId: UUIDString;
}
```
### Return Type
Recall that executing the `LinkEntryToTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LinkEntryToTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LinkEntryToTagData {
  entryTag_insert: EntryTag_Key;
}
```
### Using `LinkEntryToTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, linkEntryToTag, LinkEntryToTagVariables } from '@dataconnect/generated';

// The `LinkEntryToTag` mutation requires an argument of type `LinkEntryToTagVariables`:
const linkEntryToTagVars: LinkEntryToTagVariables = {
  entryId: ..., 
  tagId: ..., 
};

// Call the `linkEntryToTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await linkEntryToTag(linkEntryToTagVars);
// Variables can be defined inline as well.
const { data } = await linkEntryToTag({ entryId: ..., tagId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await linkEntryToTag(dataConnect, linkEntryToTagVars);

console.log(data.entryTag_insert);

// Or, you can use the `Promise` API.
linkEntryToTag(linkEntryToTagVars).then((response) => {
  const data = response.data;
  console.log(data.entryTag_insert);
});
```

### Using `LinkEntryToTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, linkEntryToTagRef, LinkEntryToTagVariables } from '@dataconnect/generated';

// The `LinkEntryToTag` mutation requires an argument of type `LinkEntryToTagVariables`:
const linkEntryToTagVars: LinkEntryToTagVariables = {
  entryId: ..., 
  tagId: ..., 
};

// Call the `linkEntryToTagRef()` function to get a reference to the mutation.
const ref = linkEntryToTagRef(linkEntryToTagVars);
// Variables can be defined inline as well.
const ref = linkEntryToTagRef({ entryId: ..., tagId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = linkEntryToTagRef(dataConnect, linkEntryToTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.entryTag_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.entryTag_insert);
});
```

## RemoveEntryTag
You can execute the `RemoveEntryTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeEntryTag(vars: RemoveEntryTagVariables): MutationPromise<RemoveEntryTagData, RemoveEntryTagVariables>;

interface RemoveEntryTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveEntryTagVariables): MutationRef<RemoveEntryTagData, RemoveEntryTagVariables>;
}
export const removeEntryTagRef: RemoveEntryTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeEntryTag(dc: DataConnect, vars: RemoveEntryTagVariables): MutationPromise<RemoveEntryTagData, RemoveEntryTagVariables>;

interface RemoveEntryTagRef {
  ...
  (dc: DataConnect, vars: RemoveEntryTagVariables): MutationRef<RemoveEntryTagData, RemoveEntryTagVariables>;
}
export const removeEntryTagRef: RemoveEntryTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeEntryTagRef:
```typescript
const name = removeEntryTagRef.operationName;
console.log(name);
```

### Variables
The `RemoveEntryTag` mutation requires an argument of type `RemoveEntryTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveEntryTagVariables {
  entryId: UUIDString;
  tagId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveEntryTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveEntryTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveEntryTagData {
  entryTag_delete?: EntryTag_Key | null;
}
```
### Using `RemoveEntryTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeEntryTag, RemoveEntryTagVariables } from '@dataconnect/generated';

// The `RemoveEntryTag` mutation requires an argument of type `RemoveEntryTagVariables`:
const removeEntryTagVars: RemoveEntryTagVariables = {
  entryId: ..., 
  tagId: ..., 
};

// Call the `removeEntryTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeEntryTag(removeEntryTagVars);
// Variables can be defined inline as well.
const { data } = await removeEntryTag({ entryId: ..., tagId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeEntryTag(dataConnect, removeEntryTagVars);

console.log(data.entryTag_delete);

// Or, you can use the `Promise` API.
removeEntryTag(removeEntryTagVars).then((response) => {
  const data = response.data;
  console.log(data.entryTag_delete);
});
```

### Using `RemoveEntryTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeEntryTagRef, RemoveEntryTagVariables } from '@dataconnect/generated';

// The `RemoveEntryTag` mutation requires an argument of type `RemoveEntryTagVariables`:
const removeEntryTagVars: RemoveEntryTagVariables = {
  entryId: ..., 
  tagId: ..., 
};

// Call the `removeEntryTagRef()` function to get a reference to the mutation.
const ref = removeEntryTagRef(removeEntryTagVars);
// Variables can be defined inline as well.
const ref = removeEntryTagRef({ entryId: ..., tagId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeEntryTagRef(dataConnect, removeEntryTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.entryTag_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.entryTag_delete);
});
```

## CreateReminder
You can execute the `CreateReminder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createReminder(vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;

interface CreateReminderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
}
export const createReminderRef: CreateReminderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createReminder(dc: DataConnect, vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;

interface CreateReminderRef {
  ...
  (dc: DataConnect, vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
}
export const createReminderRef: CreateReminderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createReminderRef:
```typescript
const name = createReminderRef.operationName;
console.log(name);
```

### Variables
The `CreateReminder` mutation requires an argument of type `CreateReminderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateReminderVariables {
  time: string;
  isEnabled: boolean;
}
```
### Return Type
Recall that executing the `CreateReminder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateReminderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateReminderData {
  reminder_insert: Reminder_Key;
}
```
### Using `CreateReminder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createReminder, CreateReminderVariables } from '@dataconnect/generated';

// The `CreateReminder` mutation requires an argument of type `CreateReminderVariables`:
const createReminderVars: CreateReminderVariables = {
  time: ..., 
  isEnabled: ..., 
};

// Call the `createReminder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createReminder(createReminderVars);
// Variables can be defined inline as well.
const { data } = await createReminder({ time: ..., isEnabled: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createReminder(dataConnect, createReminderVars);

console.log(data.reminder_insert);

// Or, you can use the `Promise` API.
createReminder(createReminderVars).then((response) => {
  const data = response.data;
  console.log(data.reminder_insert);
});
```

### Using `CreateReminder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createReminderRef, CreateReminderVariables } from '@dataconnect/generated';

// The `CreateReminder` mutation requires an argument of type `CreateReminderVariables`:
const createReminderVars: CreateReminderVariables = {
  time: ..., 
  isEnabled: ..., 
};

// Call the `createReminderRef()` function to get a reference to the mutation.
const ref = createReminderRef(createReminderVars);
// Variables can be defined inline as well.
const ref = createReminderRef({ time: ..., isEnabled: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createReminderRef(dataConnect, createReminderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reminder_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder_insert);
});
```

## UpdateReminder
You can execute the `UpdateReminder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateReminder(vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;

interface UpdateReminderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
}
export const updateReminderRef: UpdateReminderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateReminder(dc: DataConnect, vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;

interface UpdateReminderRef {
  ...
  (dc: DataConnect, vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
}
export const updateReminderRef: UpdateReminderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateReminderRef:
```typescript
const name = updateReminderRef.operationName;
console.log(name);
```

### Variables
The `UpdateReminder` mutation requires an argument of type `UpdateReminderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateReminderVariables {
  id: UUIDString;
  isEnabled: boolean;
}
```
### Return Type
Recall that executing the `UpdateReminder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateReminderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateReminderData {
  reminder_update?: Reminder_Key | null;
}
```
### Using `UpdateReminder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateReminder, UpdateReminderVariables } from '@dataconnect/generated';

// The `UpdateReminder` mutation requires an argument of type `UpdateReminderVariables`:
const updateReminderVars: UpdateReminderVariables = {
  id: ..., 
  isEnabled: ..., 
};

// Call the `updateReminder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateReminder(updateReminderVars);
// Variables can be defined inline as well.
const { data } = await updateReminder({ id: ..., isEnabled: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateReminder(dataConnect, updateReminderVars);

console.log(data.reminder_update);

// Or, you can use the `Promise` API.
updateReminder(updateReminderVars).then((response) => {
  const data = response.data;
  console.log(data.reminder_update);
});
```

### Using `UpdateReminder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateReminderRef, UpdateReminderVariables } from '@dataconnect/generated';

// The `UpdateReminder` mutation requires an argument of type `UpdateReminderVariables`:
const updateReminderVars: UpdateReminderVariables = {
  id: ..., 
  isEnabled: ..., 
};

// Call the `updateReminderRef()` function to get a reference to the mutation.
const ref = updateReminderRef(updateReminderVars);
// Variables can be defined inline as well.
const ref = updateReminderRef({ id: ..., isEnabled: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateReminderRef(dataConnect, updateReminderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reminder_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder_update);
});
```

## DeleteReminder
You can execute the `DeleteReminder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteReminder(vars: DeleteReminderVariables): MutationPromise<DeleteReminderData, DeleteReminderVariables>;

interface DeleteReminderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReminderVariables): MutationRef<DeleteReminderData, DeleteReminderVariables>;
}
export const deleteReminderRef: DeleteReminderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteReminder(dc: DataConnect, vars: DeleteReminderVariables): MutationPromise<DeleteReminderData, DeleteReminderVariables>;

interface DeleteReminderRef {
  ...
  (dc: DataConnect, vars: DeleteReminderVariables): MutationRef<DeleteReminderData, DeleteReminderVariables>;
}
export const deleteReminderRef: DeleteReminderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteReminderRef:
```typescript
const name = deleteReminderRef.operationName;
console.log(name);
```

### Variables
The `DeleteReminder` mutation requires an argument of type `DeleteReminderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteReminderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteReminder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteReminderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteReminderData {
  reminder_delete?: Reminder_Key | null;
}
```
### Using `DeleteReminder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteReminder, DeleteReminderVariables } from '@dataconnect/generated';

// The `DeleteReminder` mutation requires an argument of type `DeleteReminderVariables`:
const deleteReminderVars: DeleteReminderVariables = {
  id: ..., 
};

// Call the `deleteReminder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteReminder(deleteReminderVars);
// Variables can be defined inline as well.
const { data } = await deleteReminder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteReminder(dataConnect, deleteReminderVars);

console.log(data.reminder_delete);

// Or, you can use the `Promise` API.
deleteReminder(deleteReminderVars).then((response) => {
  const data = response.data;
  console.log(data.reminder_delete);
});
```

### Using `DeleteReminder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteReminderRef, DeleteReminderVariables } from '@dataconnect/generated';

// The `DeleteReminder` mutation requires an argument of type `DeleteReminderVariables`:
const deleteReminderVars: DeleteReminderVariables = {
  id: ..., 
};

// Call the `deleteReminderRef()` function to get a reference to the mutation.
const ref = deleteReminderRef(deleteReminderVars);
// Variables can be defined inline as well.
const ref = deleteReminderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteReminderRef(dataConnect, deleteReminderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reminder_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder_delete);
});
```

