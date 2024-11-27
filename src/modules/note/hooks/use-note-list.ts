import { graphqlClient } from "@/lib/graphql/client";
import { Note } from "@/lib/graphql/resolvers";
import { useMutation, useQuery } from "@tanstack/react-query";
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

const MutationQuery = gql`
  mutation createNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      id
      title
      content
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

  const { data, refetch } = getNoteListQuery;
  const [showForm, setShowForm] = useState(false);

  const createNoteMutation = useMutation({
    mutationKey: ["create-note"],
    mutationFn: async (variables: Pick<Note, "title" | "content">) =>
      await graphqlClient.request<{ createNote: Note }>(
        MutationQuery,
        variables
      ),
    onSuccess: () => {
      refetch().then(() => setShowForm(false));
    },
    onError: (error) => {
      console.error(error);
      setShowForm(false);
    },
  });

  function saveNote(note: Pick<Note, "title" | "content">) {
    createNoteMutation.mutate(note);
  }

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
    showForm,
    setShowForm,
    saveNote,
  };
}
