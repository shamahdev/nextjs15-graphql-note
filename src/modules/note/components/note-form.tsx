import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Note } from "@/lib/graphql/resolvers";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useState } from "react";

type NoteFormProps = React.HTMLAttributes<HTMLDivElement> & {
  onSave: (note: Pick<Note, "title" | "content">) => void;
};

const NoteForm = React.forwardRef<HTMLDivElement, NoteFormProps>(
  ({ className, onSave, ...props }, ref) => {
    const createdAt = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [newNote, setNewNote] = useState({
      title: "",
      content: "",
    });

    function handleChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      const { name, value } = event.target;
      setNewNote((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
      onSave(newNote);
      setIsLoading(true);
    }

    const isSaveDisabled = isLoading || !newNote.title || !newNote.content;

    return (
      <Card
        ref={ref}
        className={cn(
          "border-neutral-400 transition-[box-shadow,border-color] w-full min-h-[200px]",
          className
        )}
        {...props}
      >
        <CardHeader>
          <CardDescription>{createdAt}</CardDescription>
          <CardTitle>
            <input
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleChange}
              placeholder="New Note"
              className="w-full text-2xl font-semibold leading-none tracking-tight"
              disabled={isLoading}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <textarea
            name="content"
            value={newNote.content}
            onChange={handleChange}
            placeholder="Write your note"
            className="w-full text-sm font-medium"
            disabled={isLoading}
          />
          <Button
            variant="secondary"
            className="w-fit"
            onClick={handleSubmit}
            disabled={isSaveDisabled}
          >
            Save Note
          </Button>
        </CardContent>
      </Card>
    );
  }
);

NoteForm.displayName = "NoteForm";

export { NoteForm };
