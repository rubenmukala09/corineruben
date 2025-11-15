import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Edit, Trash2, Pin, AlertTriangle } from "lucide-react";

interface ClientNotesTabProps {
  clientId: number;
}

export function ClientNotesTab({ clientId }: ClientNotesTabProps) {
  const [selectedNote, setSelectedNote] = useState<number | null>(1);
  const [sortBy, setSortBy] = useState("newest");
  const [filterTag, setFilterTag] = useState("all");

  const notes = [
    {
      id: 1,
      title: "Follow up required",
      content: "Client mentioned interest in upgrading to Premium plan during last call. Need to send proposal by end of week.",
      author: "Ruben Nkulu",
      authorAvatar: "",
      date: "2 days ago",
      lastEdited: "Yesterday by Corinne Miller",
      tags: ["Sales Conversation", "Follow Up Required"],
      importance: "high",
      pinned: true,
    },
    {
      id: 2,
      title: "Payment issue resolved",
      content: "Card declined initially, but client updated payment method. Invoice paid in full.",
      author: "Corinne Miller",
      authorAvatar: "",
      date: "1 week ago",
      lastEdited: null,
      tags: ["Payment Issue"],
      importance: "normal",
      pinned: false,
    },
    {
      id: 3,
      title: "Positive feedback on AI Receptionist",
      content: "Client called to say the AI Receptionist has been working perfectly. No complaints, very satisfied with the service.",
      author: "Ruben Nkulu",
      authorAvatar: "",
      date: "2 weeks ago",
      lastEdited: null,
      tags: ["Positive Feedback", "General"],
      importance: "normal",
      pinned: false,
    },
  ];

  const templates = [
    "Called, no answer - follow up tomorrow",
    "Email sent, awaiting response",
    "Issue resolved, client satisfied",
    "Payment reminder sent",
    "Scheduled follow-up call",
  ];

  const tags = [
    "Sales Conversation",
    "Support Issue",
    "Payment Issue",
    "Follow Up Required",
    "General",
    "Positive Feedback",
    "Complaint",
  ];

  const currentNote = notes.find(n => n.id === selectedNote);

  const getImportanceColor = (importance: string) => {
    const colors = {
      urgent: "border-l-4 border-l-red-500",
      high: "border-l-4 border-l-yellow-500",
      normal: "",
    };
    return colors[importance as keyof typeof colors];
  };

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
              <Input placeholder="Search notes..." className="pl-8" />
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
                <SelectItem value="author">By Author</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notes</SelectItem>
                <SelectItem value="mine">My Notes Only</SelectItem>
                <SelectItem value="important">Important Only</SelectItem>
                {tags.map(tag => (
                  <SelectItem key={tag} value={tag.toLowerCase().replace(/ /g, "-")}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                selectedNote === note.id ? "bg-muted border-primary" : ""
              } ${getImportanceColor(note.importance)}`}
              onClick={() => setSelectedNote(note.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-sm">{note.title || note.content.substring(0, 50) + "..."}</p>
                <div className="flex items-center gap-1">
                  {note.pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                  {note.importance === "urgent" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                  {note.importance === "high" && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={note.authorAvatar} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {note.author.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{note.author}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{note.date}</p>
              <div className="flex gap-1 flex-wrap">
                {note.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
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
                <Button variant="outline" size="sm">
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
                <label className="text-sm font-medium text-muted-foreground">Title</label>
                <p className="text-lg font-semibold">{currentNote.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Content</label>
                <p className="text-base whitespace-pre-wrap">{currentNote.content}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Author</label>
                  <p className="text-base">{currentNote.author}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="text-base">{currentNote.date}</p>
                </div>
              </div>
              {currentNote.lastEdited && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Edited</label>
                  <p className="text-sm">{currentNote.lastEdited}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tags</label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {currentNote.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Importance</label>
                <Badge variant={
                  currentNote.importance === "urgent" ? "destructive" :
                  currentNote.importance === "high" ? "default" :
                  "outline"
                }>
                  {currentNote.importance === "urgent" && "⚠️ "}
                  {currentNote.importance === "high" && "⚡ "}
                  {currentNote.importance.charAt(0).toUpperCase() + currentNote.importance.slice(1)}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Select a note to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
