export const isAdmin = (userId?: string | null) => {
  if (!userId) return false;

  const adminIds = process.env.NEXT_PUBLIC_ADMIN_USER_IDS?.split(",") ?? [];
  return adminIds.includes(userId);
};
