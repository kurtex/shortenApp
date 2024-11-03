/**
 * Supabase Schema
 */
export type UrlSchema = {
	id?: number;
	urlCode: string;
	originalUrl: string;
	shortUrl: string;
	isAuthenticated?: boolean;
	createdAt?: Date;
};
