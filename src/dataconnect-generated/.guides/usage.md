# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useUpdateMyUser, useDeleteMyUser, useGetMyUser, useListAllUsers, useCreateEntry, useUpdateEntry, useDeleteEntry, useGetEntry, useListMyEntries } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser();

const { data, isPending, isSuccess, isError, error } = useUpdateMyUser(updateMyUserVars);

const { data, isPending, isSuccess, isError, error } = useDeleteMyUser();

const { data, isPending, isSuccess, isError, error } = useGetMyUser();

const { data, isPending, isSuccess, isError, error } = useListAllUsers();

const { data, isPending, isSuccess, isError, error } = useCreateEntry(createEntryVars);

const { data, isPending, isSuccess, isError, error } = useUpdateEntry(updateEntryVars);

const { data, isPending, isSuccess, isError, error } = useDeleteEntry(deleteEntryVars);

const { data, isPending, isSuccess, isError, error } = useGetEntry(getEntryVars);

const { data, isPending, isSuccess, isError, error } = useListMyEntries();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateMyUser, deleteMyUser, getMyUser, listAllUsers, createEntry, updateEntry, deleteEntry, getEntry, listMyEntries } from '@dataconnect/generated';


// Operation CreateUser: 
const { data } = await CreateUser(dataConnect);

// Operation UpdateMyUser:  For variables, look at type UpdateMyUserVars in ../index.d.ts
const { data } = await UpdateMyUser(dataConnect, updateMyUserVars);

// Operation DeleteMyUser: 
const { data } = await DeleteMyUser(dataConnect);

// Operation GetMyUser: 
const { data } = await GetMyUser(dataConnect);

// Operation ListAllUsers: 
const { data } = await ListAllUsers(dataConnect);

// Operation CreateEntry:  For variables, look at type CreateEntryVars in ../index.d.ts
const { data } = await CreateEntry(dataConnect, createEntryVars);

// Operation UpdateEntry:  For variables, look at type UpdateEntryVars in ../index.d.ts
const { data } = await UpdateEntry(dataConnect, updateEntryVars);

// Operation DeleteEntry:  For variables, look at type DeleteEntryVars in ../index.d.ts
const { data } = await DeleteEntry(dataConnect, deleteEntryVars);

// Operation GetEntry:  For variables, look at type GetEntryVars in ../index.d.ts
const { data } = await GetEntry(dataConnect, getEntryVars);

// Operation ListMyEntries: 
const { data } = await ListMyEntries(dataConnect);


```