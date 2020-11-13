import { action, computed, makeObservable, observable } from 'mobx';

export class DataStore {
  user = undefined;

  constructor() {
    makeObservable(this, {
      user: observable,
      currentUser: computed,
      setCurrentUser: action,
    });
  }

  get currentUser() {
    return this.user;
  }

  setCurrentUser(userData) {
    this.user = userData;
  }
}
