import { BACKEND_API, handleApiCall } from ".";

export const teamManagementApi = {
  get_listManagementTeam: async () => {
    const url = "/team-management/index";
    return handleApiCall(() => BACKEND_API.get(url), "get_listManagementTeam");
  },

  post_inviteTeamMember: async (payload: {
    role_id: number;
    email: string;
  }) => {
    const url = "/team-management/invite-user";
    return handleApiCall(
      () => BACKEND_API.post(url, payload),
      "post_inviteTeamMember"
    );
  },

  patch_resendInvite: async ({ id }: { id: string }) => {
    const url = `/team-management/${id}/resend-invite`;
    return handleApiCall(() => BACKEND_API.patch(url), "patch_resendInvite");
  },

  get_verifyInviteToken: async ({ invite_token }: { invite_token: string }) => {
    const url = `/team-management/verify-invite-token?invite_token=${invite_token}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_verifyInviteToken");
  },

  get_listRoles: async () => {
    const url = "/team-management/roles";
    return handleApiCall(() => BACKEND_API.get(url), "get_listRoles");
  },

  patch_changeRole: async ({
    id,
    role_id,
  }: {
    id: string;
    role_id: number;
  }) => {
    const url = `/team-management/${id}/change-role`;
    return handleApiCall(
      () => BACKEND_API.patch(url, { role_id }),
      "patch_changeRole"
    );
  },

  delete_removeTeamMember: async ({ id }: { id: string }) => {
    const url = `/team-management/${id}/delete`;
    return handleApiCall(
      () => BACKEND_API.delete(url),
      "delete_removeTeamMember"
    );
  },

  patch_deactivateTeamMember: async ({ id }: { id: string }) => {
    const url = `/team-management/${id}/deactivate`;
    return handleApiCall(
      () => BACKEND_API.patch(url),
      "patch_deactivateTeamMember"
    );
  },

  patch_activateTeamMember: async ({ id }: { id: string }) => {
    const url = `/team-management/${id}/activate`;
    return handleApiCall(
      () => BACKEND_API.patch(url),
      "patch_activateTeamMember"
    );
  },
};
