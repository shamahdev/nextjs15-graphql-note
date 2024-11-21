import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Note } from "@/lib/graphql/resolvers";
import { cn } from "@/lib/utils";
import React from "react";

type NoteCardProps = React.HTMLAttributes<HTMLDivElement> & Note;

const NoteCard = React.forwardRef<HTMLDivElement, NoteCardProps>(
  ({ className, id, title, content, created_at, ...props }, ref) => {
    const createdAt = new Date(created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <Card
        id={`note-card-${id}`}
        ref={ref}
        className={cn(
          "group-hover/blog_card:shadow-lg group-hover/blog_card:border-neutral-50 transition-[box-shadow,border-color] w-full min-h-[200px]",
          className
        )}
        {...props}
      >
        <CardHeader>
          <CardDescription>{createdAt}</CardDescription>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">{content}</p>
        </CardContent>
      </Card>
    );
  }
);

NoteCard.displayName = "NoteCard";

export { NoteCard };
