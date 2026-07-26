import { CreateUserData, UpdateMyUserData, UpdateMyUserVariables, DeleteMyUserData, GetMyUserData, ListAllUsersData, CreateEntryData, CreateEntryVariables, UpdateEntryData, UpdateEntryVariables, DeleteEntryData, DeleteEntryVariables, GetEntryData, GetEntryVariables, ListMyEntriesData, CreateTagData, CreateTagVariables, UpdateTagData, UpdateTagVariables, DeleteTagData, DeleteTagVariables, GetTagData, GetTagVariables, ListMyTagsData, LinkEntryToTagData, LinkEntryToTagVariables, RemoveEntryTagData, RemoveEntryTagVariables, ListEntryTagsData, CreateReminderData, CreateReminderVariables, UpdateReminderData, UpdateReminderVariables, DeleteReminderData, DeleteReminderVariables, GetReminderData, GetReminderVariables, ListMyRemindersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useUpdateMyUser(options?: useDataConnectMutationOptions<UpdateMyUserData, FirebaseError, UpdateMyUserVariables | void>): UseDataConnectMutationResult<UpdateMyUserData, UpdateMyUserVariables>;
export function useUpdateMyUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyUserData, FirebaseError, UpdateMyUserVariables | void>): UseDataConnectMutationResult<UpdateMyUserData, UpdateMyUserVariables>;

export function useDeleteMyUser(options?: useDataConnectMutationOptions<DeleteMyUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteMyUserData, undefined>;
export function useDeleteMyUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMyUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteMyUserData, undefined>;

export function useGetMyUser(options?: useDataConnectQueryOptions<GetMyUserData>): UseDataConnectQueryResult<GetMyUserData, undefined>;
export function useGetMyUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyUserData>): UseDataConnectQueryResult<GetMyUserData, undefined>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;

export function useCreateEntry(options?: useDataConnectMutationOptions<CreateEntryData, FirebaseError, CreateEntryVariables>): UseDataConnectMutationResult<CreateEntryData, CreateEntryVariables>;
export function useCreateEntry(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEntryData, FirebaseError, CreateEntryVariables>): UseDataConnectMutationResult<CreateEntryData, CreateEntryVariables>;

export function useUpdateEntry(options?: useDataConnectMutationOptions<UpdateEntryData, FirebaseError, UpdateEntryVariables>): UseDataConnectMutationResult<UpdateEntryData, UpdateEntryVariables>;
export function useUpdateEntry(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEntryData, FirebaseError, UpdateEntryVariables>): UseDataConnectMutationResult<UpdateEntryData, UpdateEntryVariables>;

export function useDeleteEntry(options?: useDataConnectMutationOptions<DeleteEntryData, FirebaseError, DeleteEntryVariables>): UseDataConnectMutationResult<DeleteEntryData, DeleteEntryVariables>;
export function useDeleteEntry(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteEntryData, FirebaseError, DeleteEntryVariables>): UseDataConnectMutationResult<DeleteEntryData, DeleteEntryVariables>;

export function useGetEntry(vars: GetEntryVariables, options?: useDataConnectQueryOptions<GetEntryData>): UseDataConnectQueryResult<GetEntryData, GetEntryVariables>;
export function useGetEntry(dc: DataConnect, vars: GetEntryVariables, options?: useDataConnectQueryOptions<GetEntryData>): UseDataConnectQueryResult<GetEntryData, GetEntryVariables>;

export function useListMyEntries(options?: useDataConnectQueryOptions<ListMyEntriesData>): UseDataConnectQueryResult<ListMyEntriesData, undefined>;
export function useListMyEntries(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyEntriesData>): UseDataConnectQueryResult<ListMyEntriesData, undefined>;

export function useCreateTag(options?: useDataConnectMutationOptions<CreateTagData, FirebaseError, CreateTagVariables>): UseDataConnectMutationResult<CreateTagData, CreateTagVariables>;
export function useCreateTag(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTagData, FirebaseError, CreateTagVariables>): UseDataConnectMutationResult<CreateTagData, CreateTagVariables>;

export function useUpdateTag(options?: useDataConnectMutationOptions<UpdateTagData, FirebaseError, UpdateTagVariables>): UseDataConnectMutationResult<UpdateTagData, UpdateTagVariables>;
export function useUpdateTag(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTagData, FirebaseError, UpdateTagVariables>): UseDataConnectMutationResult<UpdateTagData, UpdateTagVariables>;

export function useDeleteTag(options?: useDataConnectMutationOptions<DeleteTagData, FirebaseError, DeleteTagVariables>): UseDataConnectMutationResult<DeleteTagData, DeleteTagVariables>;
export function useDeleteTag(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTagData, FirebaseError, DeleteTagVariables>): UseDataConnectMutationResult<DeleteTagData, DeleteTagVariables>;

export function useGetTag(vars: GetTagVariables, options?: useDataConnectQueryOptions<GetTagData>): UseDataConnectQueryResult<GetTagData, GetTagVariables>;
export function useGetTag(dc: DataConnect, vars: GetTagVariables, options?: useDataConnectQueryOptions<GetTagData>): UseDataConnectQueryResult<GetTagData, GetTagVariables>;

export function useListMyTags(options?: useDataConnectQueryOptions<ListMyTagsData>): UseDataConnectQueryResult<ListMyTagsData, undefined>;
export function useListMyTags(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyTagsData>): UseDataConnectQueryResult<ListMyTagsData, undefined>;

export function useLinkEntryToTag(options?: useDataConnectMutationOptions<LinkEntryToTagData, FirebaseError, LinkEntryToTagVariables>): UseDataConnectMutationResult<LinkEntryToTagData, LinkEntryToTagVariables>;
export function useLinkEntryToTag(dc: DataConnect, options?: useDataConnectMutationOptions<LinkEntryToTagData, FirebaseError, LinkEntryToTagVariables>): UseDataConnectMutationResult<LinkEntryToTagData, LinkEntryToTagVariables>;

export function useRemoveEntryTag(options?: useDataConnectMutationOptions<RemoveEntryTagData, FirebaseError, RemoveEntryTagVariables>): UseDataConnectMutationResult<RemoveEntryTagData, RemoveEntryTagVariables>;
export function useRemoveEntryTag(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveEntryTagData, FirebaseError, RemoveEntryTagVariables>): UseDataConnectMutationResult<RemoveEntryTagData, RemoveEntryTagVariables>;

export function useListEntryTags(options?: useDataConnectQueryOptions<ListEntryTagsData>): UseDataConnectQueryResult<ListEntryTagsData, undefined>;
export function useListEntryTags(dc: DataConnect, options?: useDataConnectQueryOptions<ListEntryTagsData>): UseDataConnectQueryResult<ListEntryTagsData, undefined>;

export function useCreateReminder(options?: useDataConnectMutationOptions<CreateReminderData, FirebaseError, CreateReminderVariables>): UseDataConnectMutationResult<CreateReminderData, CreateReminderVariables>;
export function useCreateReminder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateReminderData, FirebaseError, CreateReminderVariables>): UseDataConnectMutationResult<CreateReminderData, CreateReminderVariables>;

export function useUpdateReminder(options?: useDataConnectMutationOptions<UpdateReminderData, FirebaseError, UpdateReminderVariables>): UseDataConnectMutationResult<UpdateReminderData, UpdateReminderVariables>;
export function useUpdateReminder(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateReminderData, FirebaseError, UpdateReminderVariables>): UseDataConnectMutationResult<UpdateReminderData, UpdateReminderVariables>;

export function useDeleteReminder(options?: useDataConnectMutationOptions<DeleteReminderData, FirebaseError, DeleteReminderVariables>): UseDataConnectMutationResult<DeleteReminderData, DeleteReminderVariables>;
export function useDeleteReminder(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteReminderData, FirebaseError, DeleteReminderVariables>): UseDataConnectMutationResult<DeleteReminderData, DeleteReminderVariables>;

export function useGetReminder(vars: GetReminderVariables, options?: useDataConnectQueryOptions<GetReminderData>): UseDataConnectQueryResult<GetReminderData, GetReminderVariables>;
export function useGetReminder(dc: DataConnect, vars: GetReminderVariables, options?: useDataConnectQueryOptions<GetReminderData>): UseDataConnectQueryResult<GetReminderData, GetReminderVariables>;

export function useListMyReminders(options?: useDataConnectQueryOptions<ListMyRemindersData>): UseDataConnectQueryResult<ListMyRemindersData, undefined>;
export function useListMyReminders(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyRemindersData>): UseDataConnectQueryResult<ListMyRemindersData, undefined>;
