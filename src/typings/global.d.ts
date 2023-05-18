// * FileType
declare namespace File {
	type ImageMimeType =
		| "image/apng"
		| "image/bmp"
		| "image/gif"
		| "image/jpeg"
		| "image/pjpeg"
		| "image/png"
		| "image/svg+xml"
		| "image/tiff"
		| "image/webp"
		| "image/x-icon";

	type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}
