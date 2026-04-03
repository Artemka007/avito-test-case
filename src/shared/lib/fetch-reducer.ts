export type FetchState = { loading: boolean; error: string | null };

export type FetchAction =
  | { type: 'fetch' }
  | { type: 'success' }
  | { type: 'error'; message: string };

export const fetchReducer = (
  _: FetchState,
  action: FetchAction,
): FetchState => {
  switch (action.type) {
    case 'fetch':
      return { loading: true, error: null };
    case 'success':
      return { loading: false, error: null };
    case 'error':
      return { loading: false, error: action.message };
  }
};

export const initialFetchState: FetchState = { loading: false, error: null };
