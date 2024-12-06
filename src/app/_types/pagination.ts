export interface PaginationInfoType {
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	lastPage: number;
	limit: number;
	totalItems: number;
}