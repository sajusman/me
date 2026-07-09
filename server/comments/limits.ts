/**
 * Comment limits shared by both server validation and the client UI.
 * Deliberately free of `server-only` and any runtime imports so it can be
 * bundled for the browser (e.g. the composer's character counter).
 */
export const MAX_BODY_LENGTH = 2000;
export const MIN_BODY_LENGTH = 1;
