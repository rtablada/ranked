import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class Alerts extends Component {
  @service('alerts') alerts;

  @action
  removeAlert(alert) {
    this.alerts.remove(alert);
  }
}
