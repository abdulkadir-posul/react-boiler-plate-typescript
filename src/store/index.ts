import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers as user } from './user';
import { reducers as loader } from './loader';

const rootReducer = combineReducers({
  loader,
  user
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (
    process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const exportedFunction = function configureStore(preloadedStage?: any ) {
    const middlewareEnhancer = applyMiddleware(thunk);
    const composedEnhancers = composeEnhancers(middlewareEnhancer);

    return createStore(rootReducer, preloadedStage, composedEnhancers);
}

export default exportedFunction;
