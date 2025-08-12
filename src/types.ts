export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

export interface Book {
  id: number;
  title: string;
  authors: Author[];
  summaries: string[];
  translators: Author[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}
