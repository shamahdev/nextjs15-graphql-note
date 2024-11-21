import { createClient } from "@/lib/supabase/client";

const supabaseClient = createClient();

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export type filterListArgs = {
  limit: number;
  offset: number;
  search?: string;
};

type Resolvers = {
  Query: {
    notes: (_: unknown, args: filterListArgs) => Promise<Note[]>;
    note: (_: unknown, args: { id: string }) => Promise<Note | null>;
  };
  Mutation: {
    createNote: (
      _: unknown,
      args: { title: string; content: string }
    ) => Promise<Note>;
    updateNote: (
      _: unknown,
      args: { id: string; title?: string; content?: string }
    ) => Promise<Note>;
    deleteNote: (_: unknown, args: { id: string }) => Promise<boolean>;
  };
};

export const resolvers: Resolvers = {
  Query: {
    notes: async (_parent, args) => {
      const { limit, offset, search } = args;

      let query = supabaseClient
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      if (offset) {
        query = query.range(offset, offset + (limit || 10) - 1);
      }

      if (search) {
        query = query.textSearch("title_content", search, {
          type: "websearch",
        });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase Fetch Error:", error);
        throw new Error(error.message);
      }

      return data;
    },
    note: async (_, args) => {
      const { id } = args;
      const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  },
  Mutation: {
    createNote: async (_, args) => {
      const { title, content } = args;
      const { data, error } = await supabaseClient
        .from("notes")
        .insert([{ title, content }])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

    updateNote: async (_, args) => {
      const { id, title, content } = args;
      const updates: Partial<Note> = {};
      if (title !== undefined) updates.title = title;
      if (content !== undefined) updates.content = content;

      const { data, error } = await supabaseClient
        .from("notes")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

    deleteNote: async (_, args) => {
      const { id } = args;
      const { error } = await supabaseClient
        .from("notes")
        .delete()
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return true;
    },
  },
};
