// import _ from 'lodash';
import { observable } from 'mobx';
import { extend } from '../../utils/decorators';

// ui classes
import agreementOverview from './pages/agreementOverview.js';
import agreementsSummary from './pages/agreementsSummary.js';

@extend({
  agreementOverview,
  agreementsSummary
})
export default class PagesStores {
  @observable sampleObservable = false;

}
