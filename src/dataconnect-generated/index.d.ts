import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateEntryData {
  entry_insert: Entry_Key;
}

export interface CreateEntryVariables {
  content: string;
}

export interface CreateReminderData {
  reminder_insert: Reminder_Key;
}

export interface CreateReminderVariables {
  time: string;
  isEnabled: boolean;
}

export interface CreateTagData {
  tag_insert: Tag_Key;
}

export interface CreateTagVariables {
  name: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteEntryData {
  entry_delete?: Entry_Key | null;
}

export interface DeleteEntryVariables {
  id: UUIDString;
}

export interface DeleteMyUserData {
  user_delete?: User_Key | null;
}

export interface DeleteReminderData {
  reminder_delete?: Reminder_Key | null;
}

export interface DeleteReminderVariables {
  id: UUIDString;
}

export interface DeleteTagData {
  tag_delete?: Tag_Key | null;
}

export interface DeleteTagVariables {
  id: UUIDString;
}

export interface EntryTag_Key {
  entryId: UUIDString;
  tagId: UUIDString;
  __typename?: 'EntryTag_Key';
}

export interface Entry_Key {
  id: UUIDString;
  __typename?: 'Entry_Key';
}

export interface GetEntryData {
  entry?: {
    content: string;
    isFavorite?: boolean | null;
  };
}

export interface GetEntryVariables {
  id: UUIDString;
}

export interface GetMyUserData {
  user?: {
    email: string;
    displayName?: string | null;
  };
}

export interface GetReminderData {
  reminder?: {
    time: string;
    isEnabled: boolean;
  };
}

export interface GetReminderVariables {
  id: UUIDString;
}

export interface GetTagData {
  tag?: {
    name: string;
  };
}

export interface GetTagVariables {
  id: UUIDString;
}

export interface LinkEntryToTagData {
  entryTag_insert: EntryTag_Key;
}

export interface LinkEntryToTagVariables {
  entryId: UUIDString;
  tagId: UUIDString;
}

export interface ListAllUsersData {
  users: ({
    displayName?: string | null;
  })[];
}

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

export interface ListMyEntriesData {
  entries: ({
    content: string;
    createdAt: TimestampString;
  })[];
}

export interface ListMyRemindersData {
  reminders: ({
    time: string;
    isEnabled: boolean;
  })[];
}

export interface ListMyTagsData {
  tags: ({
    name: string;
  })[];
}

export interface Reminder_Key {
  id: UUIDString;
  __typename?: 'Reminder_Key';
}

export interface RemoveEntryTagData {
  entryTag_delete?: EntryTag_Key | null;
}

export interface RemoveEntryTagVariables {
  entryId: UUIDString;
  tagId: UUIDString;
}

export interface Tag_Key {
  id: UUIDString;
  __typename?: 'Tag_Key';
}

export interface UpdateEntryData {
  entry_update?: Entry_Key | null;
}

export interface UpdateEntryVariables {
  id: UUIDString;
  isFavorite?: boolean | null;
}

export interface UpdateMyUserData {
  user_update?: User_Key | null;
}

export interface UpdateMyUserVariables {
  displayName?: string | null;
}

export interface UpdateReminderData {
  reminder_update?: Reminder_Key | null;
}

export interface UpdateReminderVariables {
  id: UUIDString;
  isEnabled: boolean;
}

export interface UpdateTagData {
  tag_update?: Tag_Key | null;
}

export interface UpdateTagVariables {
  id: UUIDString;
  name: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface UpdateMyUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
  operationName: string;
}
export const updateMyUserRef: UpdateMyUserRef;

export function updateMyUser(vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;
export function updateMyUser(dc: DataConnect, vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;

interface DeleteMyUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteMyUserData, undefined>;
  operationName: string;
}
export const deleteMyUserRef: DeleteMyUserRef;

export function deleteMyUser(): MutationPromise<DeleteMyUserData, undefined>;
export function deleteMyUser(dc: DataConnect): MutationPromise<DeleteMyUserData, undefined>;

interface GetMyUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyUserData, undefined>;
  operationName: string;
}
export const getMyUserRef: GetMyUserRef;

export function getMyUser(options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;
export function getMyUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface CreateEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEntryVariables): MutationRef<CreateEntryData, CreateEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEntryVariables): MutationRef<CreateEntryData, CreateEntryVariables>;
  operationName: string;
}
export const createEntryRef: CreateEntryRef;

export function createEntry(vars: CreateEntryVariables): MutationPromise<CreateEntryData, CreateEntryVariables>;
export function createEntry(dc: DataConnect, vars: CreateEntryVariables): MutationPromise<CreateEntryData, CreateEntryVariables>;

interface UpdateEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEntryVariables): MutationRef<UpdateEntryData, UpdateEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEntryVariables): MutationRef<UpdateEntryData, UpdateEntryVariables>;
  operationName: string;
}
export const updateEntryRef: UpdateEntryRef;

export function updateEntry(vars: UpdateEntryVariables): MutationPromise<UpdateEntryData, UpdateEntryVariables>;
export function updateEntry(dc: DataConnect, vars: UpdateEntryVariables): MutationPromise<UpdateEntryData, UpdateEntryVariables>;

interface DeleteEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEntryVariables): MutationRef<DeleteEntryData, DeleteEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteEntryVariables): MutationRef<DeleteEntryData, DeleteEntryVariables>;
  operationName: string;
}
export const deleteEntryRef: DeleteEntryRef;

export function deleteEntry(vars: DeleteEntryVariables): MutationPromise<DeleteEntryData, DeleteEntryVariables>;
export function deleteEntry(dc: DataConnect, vars: DeleteEntryVariables): MutationPromise<DeleteEntryData, DeleteEntryVariables>;

interface GetEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEntryVariables): QueryRef<GetEntryData, GetEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEntryVariables): QueryRef<GetEntryData, GetEntryVariables>;
  operationName: string;
}
export const getEntryRef: GetEntryRef;

export function getEntry(vars: GetEntryVariables, options?: ExecuteQueryOptions): QueryPromise<GetEntryData, GetEntryVariables>;
export function getEntry(dc: DataConnect, vars: GetEntryVariables, options?: ExecuteQueryOptions): QueryPromise<GetEntryData, GetEntryVariables>;

interface ListMyEntriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEntriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyEntriesData, undefined>;
  operationName: string;
}
export const listMyEntriesRef: ListMyEntriesRef;

export function listMyEntries(options?: ExecuteQueryOptions): QueryPromise<ListMyEntriesData, undefined>;
export function listMyEntries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEntriesData, undefined>;

interface CreateTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
  operationName: string;
}
export const createTagRef: CreateTagRef;

export function createTag(vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;
export function createTag(dc: DataConnect, vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface UpdateTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
  operationName: string;
}
export const updateTagRef: UpdateTagRef;

export function updateTag(vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;
export function updateTag(dc: DataConnect, vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;

interface DeleteTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
  operationName: string;
}
export const deleteTagRef: DeleteTagRef;

export function deleteTag(vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;
export function deleteTag(dc: DataConnect, vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;

interface GetTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
  operationName: string;
}
export const getTagRef: GetTagRef;

export function getTag(vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;
export function getTag(dc: DataConnect, vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;

interface ListMyTagsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyTagsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyTagsData, undefined>;
  operationName: string;
}
export const listMyTagsRef: ListMyTagsRef;

export function listMyTags(options?: ExecuteQueryOptions): QueryPromise<ListMyTagsData, undefined>;
export function listMyTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyTagsData, undefined>;

interface LinkEntryToTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LinkEntryToTagVariables): MutationRef<LinkEntryToTagData, LinkEntryToTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LinkEntryToTagVariables): MutationRef<LinkEntryToTagData, LinkEntryToTagVariables>;
  operationName: string;
}
export const linkEntryToTagRef: LinkEntryToTagRef;

export function linkEntryToTag(vars: LinkEntryToTagVariables): MutationPromise<LinkEntryToTagData, LinkEntryToTagVariables>;
export function linkEntryToTag(dc: DataConnect, vars: LinkEntryToTagVariables): MutationPromise<LinkEntryToTagData, LinkEntryToTagVariables>;

interface RemoveEntryTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveEntryTagVariables): MutationRef<RemoveEntryTagData, RemoveEntryTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveEntryTagVariables): MutationRef<RemoveEntryTagData, RemoveEntryTagVariables>;
  operationName: string;
}
export const removeEntryTagRef: RemoveEntryTagRef;

export function removeEntryTag(vars: RemoveEntryTagVariables): MutationPromise<RemoveEntryTagData, RemoveEntryTagVariables>;
export function removeEntryTag(dc: DataConnect, vars: RemoveEntryTagVariables): MutationPromise<RemoveEntryTagData, RemoveEntryTagVariables>;

interface ListEntryTagsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEntryTagsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListEntryTagsData, undefined>;
  operationName: string;
}
export const listEntryTagsRef: ListEntryTagsRef;

export function listEntryTags(options?: ExecuteQueryOptions): QueryPromise<ListEntryTagsData, undefined>;
export function listEntryTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListEntryTagsData, undefined>;

interface CreateReminderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
  operationName: string;
}
export const createReminderRef: CreateReminderRef;

export function createReminder(vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;
export function createReminder(dc: DataConnect, vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;

interface UpdateReminderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
  operationName: string;
}
export const updateReminderRef: UpdateReminderRef;

export function updateReminder(vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;
export function updateReminder(dc: DataConnect, vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;

interface DeleteReminderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReminderVariables): MutationRef<DeleteReminderData, DeleteReminderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteReminderVariables): MutationRef<DeleteReminderData, DeleteReminderVariables>;
  operationName: string;
}
export const deleteReminderRef: DeleteReminderRef;

export function deleteReminder(vars: DeleteReminderVariables): MutationPromise<DeleteReminderData, DeleteReminderVariables>;
export function deleteReminder(dc: DataConnect, vars: DeleteReminderVariables): MutationPromise<DeleteReminderData, DeleteReminderVariables>;

interface GetReminderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReminderVariables): QueryRef<GetReminderData, GetReminderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetReminderVariables): QueryRef<GetReminderData, GetReminderVariables>;
  operationName: string;
}
export const getReminderRef: GetReminderRef;

export function getReminder(vars: GetReminderVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderData, GetReminderVariables>;
export function getReminder(dc: DataConnect, vars: GetReminderVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderData, GetReminderVariables>;

interface ListMyRemindersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyRemindersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyRemindersData, undefined>;
  operationName: string;
}
export const listMyRemindersRef: ListMyRemindersRef;

export function listMyReminders(options?: ExecuteQueryOptions): QueryPromise<ListMyRemindersData, undefined>;
export function listMyReminders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyRemindersData, undefined>;

