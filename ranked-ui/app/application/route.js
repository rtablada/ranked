import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service('fauna') fauna;

  model() {
    this.fauna.setupSession();
  }
}
