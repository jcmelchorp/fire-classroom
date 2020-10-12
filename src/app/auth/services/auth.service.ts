import { UpdateProfile } from './../store/auth.actions';
import { GoogleApiService } from 'src/app/auth/services/google-api.service';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private googleApiService: GoogleApiService,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    /* this.initClient();
    this.user$ = afAuth.authState; */
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      providerId: user.providerId,
      photoUrl: user.photoUrl,
      isAdmin: user.isAdmin,
      isNewUser: user.isNewUser,
      isOnline: user.isOnline,
    };
    return userRef.set(data, { merge: true });
  }

  // Initialize the Google API client with desired scopes
  /* initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: environment.firebaseConfig.apiKey,
        clientId: environment.firebaseConfig.clientId,
        discoveryDocs: environment.firebaseConfig.discoveryDocs,
        scope: environment.firebaseConfig.scopes
      })
      gapi.client.load('classroom', 'v1', () => console.log('loaded classroom'));
    });
  } */
  register(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  updateProfile(
    newName: string,
    newPhotoUrl: string
  ) {
    const userProfile = firebase.auth().currentUser;
    if (userProfile) {
      return from<any>(userProfile.updateProfile({ displayName: newName, photoURL: newPhotoUrl }));
    }
  }

  login(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  socialLogin(authProvider: string): Observable<firebase.auth.UserCredential> {
    let provider: any;
    if (authProvider === 'google') {
      return from(this.googleApiService.login());
    }

    if (authProvider === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    if (authProvider === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    return from(this.afAuth.signInWithPopup(provider));
    /* cred.then((credential) => {
      this.updateUserData(credential.user);
    }); */
    /* const cred = this.googleApiService.login();
    return from(cred); */
  }

  logout(uid: string): Observable<void> {
    this.updateOnlineStatus(uid, false);
    return from(this.afAuth.signOut());
  }

  saveUser(user: User): Promise<void> {
    const users = this.db.object('users/' + user.uid);
    return users.set(user);
  }

  updateOnlineStatus(uid: string, status: boolean): Observable<void> {
    if (status) {
      this.db.database
        .ref()
        .child('users/' + uid)
        .onDisconnect()
        .update({ isOnline: false });
    }
    return from(this.db.object('users/' + uid).update({ isOnline: status }));
  }

  checkUserRole(uid: string): Observable<unknown> {
    return this.db.object('admins/' + uid).valueChanges();
  }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getCurrentUser(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  getAccessToken(): Promise<string> {
    return this.afAuth.currentUser.then((user) => {
      return user.getIdToken();
    });
  }
}
