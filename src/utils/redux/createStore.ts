import rootReducer from '@reducers/index';
import { createStore as _createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

function createStore() {
  return _createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

export let localStore: ReturnType<typeof createStore> = createStore();

export function getOrCreateStore() {
  // Memoize store on client
  if (!localStore) {
    localStore = createStore();
  }
  return localStore;
}
