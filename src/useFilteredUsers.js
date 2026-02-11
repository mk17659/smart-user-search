import { useMemo } from "react";

export function useFilteredUsers(users, search, role, status) {
  return useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchName = user.name.toLowerCase().includes(cleanSearch);

      const matchRole =
        role === "All" ? true : user.role === role;

      const matchStatus =
        status === "All"
          ? true
          : status === "Active"
          ? user.active
          : !user.active;

      return matchName && matchRole && matchStatus;
    });
  }, [users, search, role, status]);
}
