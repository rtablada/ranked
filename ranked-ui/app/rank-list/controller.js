import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { query } from 'faunadb';
import { tracked } from '@glimmer/tracking';

const { Collection, Create } = query;

export default class RankListRoute extends Controller {
  @service('fauna') fauna;
  @tracked title;

  @action
  async saveNewList(ev) {
    ev.preventDefault();

    await this.fauna.db.query(
      Create(Collection('rank-lists'), {
        data: { title: this.title, user: this.fauna.identity },
      })
    );
  }
}
