import { useDataQuery } from "@/hooks/useDataQuery";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { PROJECTS_PAGE_SIZE } from "@common/consts";

const MemberKeyPlural = "members";

export enum MemberRole {
  ADMIN = "admin",
  MEMBER = "member",
  CONTRIBUTOR = "contributor"
}

interface IMembersData {
  remainingCount: number;
  count: number;
  members: IMemberData[];
}

interface IMemberData {
  username: string;
  role: MemberRole;
  lastActive: string;
}

// TODO: what to do with the error?
interface IUseMembersResult {
  error: Error | null;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  currentAmount: number;
  isPlaceholderData: boolean;
  members: IMemberData[];
  isSuccess: boolean;
  isLoading: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}

export const useMembers = (): IUseMembersResult => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const queryKey = useMemo(
    () => [MemberKeyPlural, currentPage, search],
    [currentPage, search]
  );

  const queryPath = useMemo(
    () =>
      search === ""
        ? `/${MemberKeyPlural}/${currentPage}`
        : `/${MemberKeyPlural}/${currentPage}?search=${search}`,
    [currentPage, search]
  );

  const { data, isSuccess, isLoading, error, isPlaceholderData } = useDataQuery(
    queryPath,
    {
      placeholderData: keepPreviousData,
      queryKey,
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient]);

  const memberData = data?.body as IMembersData;
  const remainingCount = memberData?.remainingCount ?? 0;
  const count = memberData?.count ?? 0;

  const totalCount =
    remainingCount + count + (currentPage - 1) * PROJECTS_PAGE_SIZE;

  const currentAmount = memberData?.count ?? 0;
  const members = memberData?.members ?? [];

  return {
    error,
    currentPage,
    setCurrentPage,
    totalCount,
    currentAmount,
    isPlaceholderData,
    members,
    isSuccess,
    isLoading,
    setSearch,
    search
  };
};
