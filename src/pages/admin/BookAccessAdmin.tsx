import BookAccessManager from "@/components/admin/BookAccessManager";

export default function BookAccessAdmin() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Book Access Manager</h1>
        <p className="text-[#9CA3AF]">
          Generate, reset, and manage Access IDs for the digital library.
        </p>
      </div>
      <BookAccessManager />
    </div>
  );
}
