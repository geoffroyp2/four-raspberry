export type PageQueryParams = {
  variables: {
    page?: number;
    amount?: number;
    name?: string;
  };
};

export type IdQueryParams = {
  variables: {
    id: number;
  };
};
