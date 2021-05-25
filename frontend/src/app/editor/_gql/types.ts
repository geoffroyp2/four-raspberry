export type PageQueryParams = {
  variables: {
    page?: number;
    amount?: number;
  };
};

export type PreviewQueryParams = {
  variables: {
    id: number;
  };
};
