import  AuthListener from "./AuthListener.tsx";

export default class AuthHolder {
    private authListeners: AuthListener[];
    private isAuthorized: boolean;
    private authToken: string;

    public constructor() {
        this.isAuthorized = false;
        this.authListeners = [];
        this.authToken = '';
    }

    public onSignIn(authToken:string): void {
        this.authToken = authToken;
        this.isAuthorized = true;
       this.notifyListeners();
    }

    public onSignOut(): void {
        this.authToken = ' ';
        this.isAuthorized = false;
        this.notifyListeners();
    }

    public isUserAuthorized():boolean{
        return this.isAuthorized;
    }

    /**
     * @throws {Error} if user is not authorized
     */

    public getAuthToken(): string {
        if (!this.isAuthorized) {
            throw new Error('User is not authorized');
        }
        return this.authToken;
    }



    public addAuthListener(authListener:AuthListener): void {
        this.authListeners.push(authListener);
    }

    public removeAuthListener(authListener:AuthListener): void {
        this.authListeners.splice(this.authListeners.indexOf(authListener), 1);
    }

    public notifyListeners(): void {
        this.authListeners.forEach((listener)=> listener.onAuthChanged());
    }
}
