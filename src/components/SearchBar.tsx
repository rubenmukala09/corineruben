import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Remove previous highlights
    const highlights = document.querySelectorAll(".search-highlight");
    highlights.forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });

    // Search and highlight
    if (searchQuery.trim()) {
      const regex = new RegExp(
        `(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      );
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (
              node.parentElement?.tagName === "SCRIPT" ||
              node.parentElement?.tagName === "STYLE" ||
              node.parentElement?.classList.contains("search-bar")
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return regex.test(node.textContent || "")
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          },
        },
      );

      const nodesToReplace: { node: Node; parent: Node }[] = [];
      let currentNode;

      while ((currentNode = walker.nextNode())) {
        if (currentNode.parentNode) {
          nodesToReplace.push({
            node: currentNode,
            parent: currentNode.parentNode,
          });
        }
      }

      nodesToReplace.forEach(({ node, parent }) => {
        const text = node.textContent || "";
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        text.replace(regex, (match, p1, offset) => {
          if (offset > lastIndex) {
            fragment.appendChild(
              document.createTextNode(text.slice(lastIndex, offset)),
            );
          }

          const span = document.createElement("span");
          span.className = "search-highlight";
          span.style.backgroundColor = "rgba(124, 58, 237, 0.3)";
          span.style.padding = "2px 4px";
          span.style.borderRadius = "3px";
          span.style.transition = "all 0.3s ease";
          span.textContent = match;
          fragment.appendChild(span);

          lastIndex = offset + match.length;
          return match;
        });

        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        parent.replaceChild(fragment, node);
      });

      // Scroll to first result
      const firstHighlight = document.querySelector(".search-highlight");
      if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    setTimeout(() => setIsSearching(false), 300);
  };

  const clearSearch = () => {
    setSearchQuery("");
    const highlights = document.querySelectorAll(".search-highlight");
    highlights.forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="search-bar flex-1 max-w-[600px] mx-4"
    >
      <div className="relative group">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search InVision Network..."
          aria-label="Search InVision Network"
          className="w-full h-11 pl-4 pr-24 rounded-full border-2 border-border bg-background/80 backdrop-blur-sm
                     focus:border-primary focus:ring-2 focus:ring-primary/20 focus:scale-[1.02]
                     transition-all duration-300 text-sm"
        />
        {searchQuery && (
          <Button
            type="button"
            onClick={clearSearch}
            variant="ghost"
            size="icon"
            aria-label="Clear search"
            className="absolute right-12 top-1/2 -translate-y-1/2 h-11 w-11 md:h-7 md:w-7 rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          size="icon"
          aria-label="Search"
          disabled={isSearching}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 md:h-9 md:w-9 rounded-full
                     bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple
                     transition-all duration-300 hover:scale-105"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
