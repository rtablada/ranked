import Service from '@ember/service';
import config from 'ranked-ui/config/environment';
import faunadb from 'faunadb';

export default class FaunaService extends Service {
  client = null;

  constructor() {
    super(...arguments);
    this.db = new faunadb.Client({
      secret: config.FAUNADB_SECRET,
    });
  }
}
