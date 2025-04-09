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
  private _isLoading: boolean = true;
  private readonly provider: GoogleAuthProvider;

  constructor() {
    super();
    this.provider = new GoogleAuthProvider();

    makeObservable<this, '_user' | '_isLoading'>(this, {
      _user: observable,
      _isLoading: observable,
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
        this._isLoading = false;
      });
    });
  }

  get user(): User | null {
    return this._user;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get isAuthenticated(): boolean {
    return !!this._user;
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await signInWithPopup(auth, this.provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOutUser(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}
