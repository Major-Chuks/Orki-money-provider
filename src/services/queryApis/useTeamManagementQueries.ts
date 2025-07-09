// Generated file - DO NOT EDIT
// This file contains React Query hooks for teamManagement API

import { teamManagementApi } from "../apis/teamManagement";

import { useApiQuery, useApiMutation } from ".";



export const useListManagementTeamQuery = () =>
  useApiQuery(["get_listManagementTeam"], teamManagementApi.get_listManagementTeam);

export const useInviteTeamMemberMutation = () =>
  useApiMutation(teamManagementApi.post_inviteTeamMember);

export const useResendInviteMutation = () =>
  useApiMutation(teamManagementApi.patch_resendInvite);

export const useVerifyInviteTokenQuery = (params: { invite_token: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_verifyInviteToken", JSON.stringify(params)], () =>
    teamManagementApi.get_verifyInviteToken(params)
  );

export const useListRolesQuery = () =>
  useApiQuery(["get_listRoles"], teamManagementApi.get_listRoles);

export const useChangeRoleMutation = () =>
  useApiMutation(teamManagementApi.patch_changeRole);

export const useRemoveTeamMemberMutation = () =>
  useApiMutation(teamManagementApi.delete_removeTeamMember);

export const useDeactivateTeamMemberMutation = () =>
  useApiMutation(teamManagementApi.patch_deactivateTeamMember);

export const useActivateTeamMemberMutation = () =>
  useApiMutation(teamManagementApi.patch_activateTeamMember);
