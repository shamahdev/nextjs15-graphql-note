import { NoteList } from "@/modules/note/components/note-list";

export default function Home() {
  return (
    <main className="flex items-center justify-center p-8 flex-col">
      <div className="flex flex-col gap-8 w-full items-center">
        <h2 className="font-bold text-3xl font-mono">Notes</h2>
        <NoteList />
      </div>
    </main>
  );
}
