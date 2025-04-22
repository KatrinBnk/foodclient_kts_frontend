import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { BaseStore } from '@stores/BaseStore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '@configs/firebaseConfig';

export default class AuthStore extends BaseStore {
  private _user: User | null = null;
  private readonly provider: GoogleAuthProvider;

  constructor() {
    super();
    this.provider = new GoogleAuthProvider();

    makeObservable<this, '_user'>(this, {
      _user: observable,
      isAuthenticated: computed,
      signInWithGoogle: action,
      signOutUser: action,
    });

    this.initializeAuthListener();
  }

  private initializeAuthListener(): void {
    onAuthStateChanged(auth, (user) => {
      runInAction(() => {
        this._user = user;
        this.loading = false;
      });
    });
  }

  get user(): User | null {
    return this._user;
  }

  get isLoading(): boolean {
    return this.loading;
  }

  get isAuthenticated(): boolean {
    return !!this._user;
  }

  async signInWithGoogle(): Promise<void> {
    await this.handleApiCall(async () => {
      await signInWithPopup(auth, this.provider);
    });
  }

  async signOutUser(): Promise<void> {
    await this.handleApiCall(async () => {
      await signOut(auth);
    });
  }
}
