import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { query } from 'faunadb';

const { Login, Match, Index } = query;

export default class SignupController extends Controller {
  @tracked email;
  @tracked password;

  @service('fauna') fauna;
  @service('alerts') alerts;
  @service('router') router;

  @action
  async login(ev) {
    ev.preventDefault();

    if (!this.email || !this.password) {
      this.alerts.alert('Please enter an email and password', 'error');
      return;
    }

    try {
      let response = await this.fauna.hostDb.query(
        Login(Match(Index('users_by_email'), this.email), {
          password: this.password,
        })
      );

      await this.fauna.loginUser(response);

      this.alerts.alert(`You're all logged in!`, 'success');

      this.router.transitionTo('rank-list');
    } catch (e) {
      this.alerts.alert(
        'Check that your username and password are correct',
        'error'
      );
    }
  }
}
