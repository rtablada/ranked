import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { query } from 'faunadb';

const { Collection } = query;

export default class RankListRoute extends Route {
  @service('fauna') fauna;

  async model() {
    let rankLists = await this.fauna.getAll('rank-lists');

    console.log(rankLists);

    return { rankLists };
  }
}
