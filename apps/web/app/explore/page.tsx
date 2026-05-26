"use client";

import { useState } from "react";
import Link from "next/link";
import { trpc } from "~/trpc/client";
import { Search, FileText, Loader2, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Logo } from "~/components/brand/logo";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading } = trpc.public.exploreForms.useQuery({
    page,
    limit: 12,
    search: query || undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(search);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border px-6 lg:px-10 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="text-sm bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90"
          >
            Begin
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-border px-6 lg:px-10 py-20">
        <div className="max-w-5xl mx-auto">
          <span className="ef-eyebrow">§ The library</span>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-tight">
            Forms in the open.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            A small library of public forms made by people on EdinForm.
            Borrow an idea, fill one out, or read them as quiet inspiration.
          </p>

          <form onSubmit={handleSearch} className="mt-10 max-w-lg flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the library…"
                className="w-full pl-10 pr-4 py-3 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-5 h-5 animate-spin text-foreground" />
          </div>
        ) : data?.data.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-md">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Nothing in the library yet{query ? ` for "${query}"` : ""}.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between mb-8 border-b border-border pb-4">
              <p className="ef-eyebrow">
                {data?.total ?? 0} entries {query && `matching "${query}"`}
              </p>
              <p className="ef-eyebrow">Page {page}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {data?.data.map((form, i) => (
                <Link
                  href={"/forms/" + form.slug}
                  key={form.id}
                  className="group bg-background p-7 ef-card-hover flex flex-col"
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="ef-eyebrow">
                      No. {String(i + 1 + (page - 1) * 12).padStart(3, "0")}
                    </span>
                    <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-[color:var(--color-sandstone)] transition-colors mb-3 leading-tight">
                    {form.title}
                  </h3>
                  {form.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                      {form.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {form.createdAt &&
                        formatDistanceToNow(new Date(form.createdAt)) + " ago"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-foreground font-medium">
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {data && data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-md border border-border text-sm disabled:opacity-40 hover:border-foreground transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  {page} / {data.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(data.totalPages, p + 1))
                  }
                  disabled={page === data.totalPages}
                  className="px-4 py-2 rounded-md border border-border text-sm disabled:opacity-40 hover:border-foreground transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="border-t border-border px-6 lg:px-10 py-8 text-center text-xs text-muted-foreground">
        © 2026 EdinForm
      </footer>
    </div>
  );
}
