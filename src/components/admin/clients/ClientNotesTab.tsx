import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Pin,
  AlertTriangle,
  FileText,
} from "lucide-react";
import {
  useClientNotes,
  useDeleteClientNote,
  type ClientNote,
} from "@/hooks/useClientNotes";
import { format } from "date-fns";

interface ClientNotesTabProps {
  clientId: string;
}

export function ClientNotesTab({ clientId }: ClientNotesTabProps) {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [filterTag, setFilterTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notes = [], isLoading } = useClientNotes(clientId);
  const deleteNoteMutation = useDeleteClientNote();

  const tags = [
    "Sales Conversation",
    "Support Issue",
    "Payment Issue",
    "Follow Up Required",
    "General",
    "Positive Feedback",
    "Complaint",
  ];

  // Filter and sort notes
  const filteredNotes = notes
    .filter((note) => {
      if (searchQuery) {
        return (
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter((note) => {
      if (filterTag === "all") return true;
      if (filterTag === "important")
        return note.importance === "urgent" || note.importance === "high";
      return note.tags?.some(
        (t) => t.toLowerCase().replace(/ /g, "-") === filterTag,
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          new Date(a.created_at || 0).getTime() -
          new Date(b.created_at || 0).getTime()
        );
      }
      if (sortBy === "important") {
        const importanceOrder = { urgent: 0, high: 1, normal: 2 };
        return (
          (importanceOrder[a.importance as keyof typeof importanceOrder] || 2) -
          (importanceOrder[b.importance as keyof typeof importanceOrder] || 2)
        );
      }
      return 0;
    });

  const currentNote = notes.find((n) => n.id === selectedNote);

  const getImportanceColor = (importance: string | null) => {
    const colors: Record<string, string> = {
      urgent: "border-l-4 border-l-red-500",
      high: "border-l-4 border-l-yellow-500",
      normal: "",
    };
    return colors[importance || "normal"] || "";
  };

  const handleDelete = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNoteMutation.mutate({ id: noteId, clientId });
      if (selectedNote === noteId) {
        setSelectedNote(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground">
          Loading notes...
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      {/* Note List - Left Panel */}
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notes</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
          <div className="flex gap-2 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="important">Most Important</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notes</SelectItem>
                <SelectItem value="important">Important Only</SelectItem>
                {tags.map((tag) => (
                  <SelectItem
                    key={tag}
                    value={tag.toLowerCase().replace(/ /g, "-")}
                  >
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No notes found</p>
              <p className="text-sm">
                Add a note to track important information
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedNote === note.id ? "bg-muted border-primary" : ""
                } ${getImportanceColor(note.importance)}`}
                onClick={() => setSelectedNote(note.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-sm">
                    {note.title || note.content?.substring(0, 50) + "..."}
                  </p>
                  <div className="flex items-center gap-1">
                    {note.is_pinned && (
                      <Pin className="h-3 w-3 text-muted-foreground" />
                    )}
                    {note.importance === "urgent" && (
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                    )}
                    {note.importance === "high" && (
                      <AlertTriangle className="h-3 w-3 text-yellow-500" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {note.author_id?.substring(0, 2).toUpperCase() || "SY"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {note.created_at
                      ? format(new Date(note.created_at), "MMM d, yyyy")
                      : "Unknown date"}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {note.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Note Detail - Right Panel */}
      <Card className="md:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Note Details</CardTitle>
            {currentNote && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(currentNote.id)}
                  disabled={deleteNoteMutation.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {currentNote ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Title
                </label>
                <p className="text-lg font-semibold">{currentNote.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Content
                </label>
                <p className="text-base whitespace-pre-wrap">
                  {currentNote.content}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Author
                  </label>
                  <p className="text-base">
                    {currentNote.author_id || "System"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Date
                  </label>
                  <p className="text-base">
                    {currentNote.created_at
                      ? format(new Date(currentNote.created_at), "PPP")
                      : "Unknown"}
                  </p>
                </div>
              </div>
              {currentNote.updated_at &&
                currentNote.updated_at !== currentNote.created_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Edited
                    </label>
                    <p className="text-sm">
                      {format(new Date(currentNote.updated_at), "PPP 'at' p")}
                    </p>
                  </div>
                )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tags
                </label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {currentNote.tags?.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  )) || (
                    <span className="text-muted-foreground text-sm">
                      No tags
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Importance
                </label>
                <Badge
                  variant={
                    currentNote.importance === "urgent"
                      ? "destructive"
                      : currentNote.importance === "high"
                        ? "default"
                        : "outline"
                  }
                >
                  {currentNote.importance === "urgent" && "⚠️ "}
                  {currentNote.importance === "high" && "⚡ "}
                  {(currentNote.importance || "normal")
                    .charAt(0)
                    .toUpperCase() +
                    (currentNote.importance || "normal").slice(1)}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Select a note to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
