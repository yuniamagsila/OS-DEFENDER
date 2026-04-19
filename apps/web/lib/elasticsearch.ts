// Stub — install '@elastic/elasticsearch' in production:
//   npm install @elastic/elasticsearch
// import { Client } from "@elastic/elasticsearch";
//
// export const esClient = new Client({
//   node: process.env.ELASTICSEARCH_URL ?? "http://localhost:9200",
//   auth: process.env.ELASTICSEARCH_API_KEY
//     ? { apiKey: process.env.ELASTICSEARCH_API_KEY }
//     : undefined,
// });

export interface SearchHit<T = Record<string, unknown>> {
  id: string;
  score: number;
  source: T;
}

export interface SearchResult<T = Record<string, unknown>> {
  hits: SearchHit<T>[];
  total: number;
  took: number;
}

/**
 * Stub full-text search across mentions.
 * Replace with real Elasticsearch query in production.
 */
export async function searchMentions(
  query: string,
  profileId: string,
  _from = 0,
  _size = 20,
): Promise<SearchResult> {
  console.warn(
    `[elasticsearch stub] search: query="${query}" profileId="${profileId}"`,
  );
  return { hits: [], total: 0, took: 0 };
}

/**
 * Stub index a single mention document.
 */
export async function indexMention(
  id: string,
  doc: Record<string, unknown>,
): Promise<void> {
  console.warn(`[elasticsearch stub] index mention id=${id}`, doc);
}
