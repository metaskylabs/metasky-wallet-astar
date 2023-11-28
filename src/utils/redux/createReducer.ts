interface Action {
  type: string;
  payload: unknown;
}

type Handlers<State> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [type: string]: (state: State, payload: any) => State;
};

export default function createReducer<T>(
  initialState: T,
  handlers: Handlers<T>,
) {
  return function reducer(state: T = initialState, action: Action): T {
    if (handlers.hasOwnProperty(action.type)) {
      const newState = handlers[action.type](state, action.payload);
      return newState;
    } else {
      return state;
    }
  };
}
