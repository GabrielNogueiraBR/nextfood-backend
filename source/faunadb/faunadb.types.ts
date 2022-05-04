export type FaunadbBaseFields = {
  ref?: any;
  ts?: number;
};

export type FaunadbRecordBaseFields<T> = FaunadbBaseFields & {
  data: T;
};
