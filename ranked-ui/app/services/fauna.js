import Service from '@ember/service';
import config from 'ranked-ui/config/environment';
import faunadb, { query } from 'faunadb';

const { Match, Index, CurrentIdentity, Get, Map, Paginate } = query;

export default class FaunaService extends Service {
  hostDb = null;
  userDb = undefined;
  identity = undefined;

  set userSecret(value) {
    localStorage._userSecret = value;
  }

  get userSecret() {
    return localStorage._userSecret;
  }

  get db() {
    return this.userDb ?? this.hostDb;
  }

  setupSession() {
    this.hostDb = new faunadb.Client({
      secret: config.FAUNADB_SECRET,
    });

    this.setupUserClient();
  }

  async loginUser(userData) {
    this.userSecret = userData.secret;
    await this.setupUserClient();
  }

  async setupUserClient() {
    if (!this.userSecret) {
      return;
    }

    try {
      this.userDb = new faunadb.Client({
        secret: this.userSecret,
      });

      this.identity = await this.userDb.query(CurrentIdentity());
    } catch (e) {
      this.userDb = undefined;
    }
  }

  async getAll() {
    let pagination = Map(Paginate(Match(Index(`all_rank-lists`))), (r) =>
      Get(r)
    );

    return await this.userDb.query(pagination);
  }
}
