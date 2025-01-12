/**
 * Supabase Schema for the urls table.
 */
export type UrlSchema = {
	id?: number;
	urlCode: string;
	originalUrl: string;
	shortUrl: string;
	createdAt?: Date;
};
