export interface Album {
  collectionId: number;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  artworkUrl60: string;
  releaseDate: string;
  trackCount: number;
  primaryGenreName: string;
  collectionPrice: number;
  collectionExplicitness: string;
  copyright: string;
  country: string;
  currency: string;
  artistId: number;
  artistViewUrl: string;
  collectionViewUrl: string;
  wrapperType: string;
  collectionType: string;
  amgArtistId: number;
  collectionCensoredName: string;
  }
  
  export interface ItunesResponse {
    resultCount: number;
    results: Album[];
  }

  export interface SearchParams {
    searchQuery?: string;
    limit?: number;
    isLoading?: boolean;
    sortBy?: string;
  }
  