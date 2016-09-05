import store from './store';
import { dispatch } from './dispatcher';
// connect component to store or provide it access to store data without making it observable
import { connect, provide } from './connect';
import { dehydrate, rehydrate, hotRehydrate } from './hydrate';
import { fetchData, fetchDataOnLocationMatch } from './fetch';
import ContextProvider from './ContextProvider';
import Context from './Context';


export {
  store,
  dispatch,
  connect,
  provide,
  dehydrate,
  rehydrate,
  hotRehydrate,
  fetchData,
  fetchDataOnLocationMatch,
  ContextProvider,
  Context,
};
