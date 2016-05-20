import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import storage from '../middlewares/storage';

const enhancer = compose(
  applyMiddleware(createSagaMiddleware()),
  storage(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
