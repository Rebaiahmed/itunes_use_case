export interface Album {
    collectionId: number;
    artistName: string;
    collectionName: string;
    artworkUrl100: string;
    releaseDate: string;
    trackCount: number;
    primaryGenreName: string;
  }
  
  export interface ItunesResponse {
    resultCount: number;
    results: Album[];
  }

  export interface SearchParams {
    searchQuery?: string;
    offset?: number;
    limit?: number;
    isLoading?: boolean;
    sortBy?: string;
  }
  