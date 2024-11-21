import { graphqlClient } from "@/lib/graphql/client";
import { Note } from "@/lib/graphql/resolvers";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { ChangeEvent, useState } from "react";

const Query = gql`
  query getNoteList($limit: Int, $offset: Int, $search: String) {
    notes(limit: $limit, offset: $offset, search: $search) {
      id
      title
      content
      created_at
    }
  }
`;

const LIMIT_STEP = 6;

export function useNoteList() {
  const [filter, setFilter] = useState({
    limit: LIMIT_STEP,
    offset: 0,
    search: "",
  });

  const getNoteListQuery = useQuery({
    queryKey: ["get-note-list", filter],
    queryFn: async () =>
      await graphqlClient.request<{ notes: Note[] }>(Query, filter),
  });

  const { data } = getNoteListQuery;
  const hasMore = data?.notes?.length === filter.limit;

  function handleLoadMore() {
    setFilter((prev) => ({
      ...prev,
      limit: prev.limit + LIMIT_STEP,
    }));
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const timeoutId = setTimeout(() => {
      setFilter({
        limit: LIMIT_STEP,
        offset: 0,
        search: e.target.value,
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }

  return {
    ...getNoteListQuery,
    filter,
    hasMore,
    handleLoadMore,
    handleSearch,
  };
}
