"use client";

import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Skeleton } from "@/common/components/ui/skeleton";
import { NoteCard } from "@/modules/note/components/note-card";
import { NoteForm } from "@/modules/note/components/note-form";
import { useNoteList } from "@/modules/note/hooks/use-note-list";
import { PlusIcon } from "lucide-react";

export function NoteList() {
  const {
    data,
    isLoading,
    hasMore,
    handleLoadMore,
    handleSearch,
    showForm,
    setShowForm,
    saveNote,
  } = useNoteList();

  function renderNotes() {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-[200px] rounded-full" />
      ));
    }
    if (!data?.notes || data.notes.length === 0) {
      return (
        <span className="font-mono text-neutral-400">Data not found.</span>
      );
    }

    return data?.notes.map(({ ...props }) => (
      <NoteCard key={props.id} {...props} />
    ));
  }

  return (
    <div className="w-full max-w-screen-lg flex flex-col gap-8">
      <div className="w-full flex gap-2">
        <Input
          type="search"
          placeholder="Search Note"
          onChange={handleSearch}
        />
        <Button onClick={() => setShowForm((prev) => !prev)}>
          <PlusIcon />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border-neutral-100 gap-4">
        {showForm ? <NoteForm onSave={saveNote} /> : null}
        {renderNotes()}
      </div>
      {hasMore && (
        <Button
          onClick={handleLoadMore}
          className="w-fit self-center font-mono"
          variant="outline"
        >
          Load More Notes
        </Button>
      )}
    </div>
  );
}
