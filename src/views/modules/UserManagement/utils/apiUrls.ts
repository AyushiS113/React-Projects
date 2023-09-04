const baseUrl = "/v1/admin/user";

export const apiUrls = {
  list: `${baseUrl}`,
  create: `${baseUrl}/create`,
  update: (id: number): string => `${baseUrl}/${id}/update`,
  delete: (id: number): string => `${baseUrl}/${id}/delete`,
  details: (id: number): string => `${baseUrl}/${id}/details`,
  bulkUpdate: `${baseUrl}/bulk-update`,
  changeStatus: (id: number): string => `${baseUrl}/${id}/change-status`,
};
