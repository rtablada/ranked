import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { query } from 'faunadb';

const { Create, Collection } = query;

export default class SignupController extends Controller {
  @tracked email;
  @tracked password;

  @service('fauna') fauna;
  @service('alerts') alerts;
  @service('router') router;

  @action
  async attemptSignup(ev) {
    ev.preventDefault();

    if (!this.email || !this.password) {
      this.alerts.alert('Please enter an email and password', 'error');
      return;
    }

    try {
      await this.fauna.db.query(
        Create(Collection('users'), {
          credentials: { password: this.password },
          data: { email: this.email },
        })
      );

      this.alerts.alert('You have signed up! Login to continue!', 'success');

      this.router.transitionTo('login');
    } catch (e) {
      if (e.message == 'instance not unique') {
        this.alerts.alert(
          'You already have an account with that email!',
          'error'
        );
      } else {
        this.alerts.alert('There was an error signing up', 'error');
      }
    }
  }
}
