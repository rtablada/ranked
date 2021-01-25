import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AlertService extends Service {
  @tracked alerts = [];

  alert(message, status = 'info') {
    const alert = {
      message,
      status,
    };

    this.alerts = [...this.alerts, alert];

    window.setTimeout(() => {
      this.remove(alert);
    }, 3200);
  }

  remove(alert) {
    this.alerts = this.alerts.filter((a) => a != alert);
  }
}
