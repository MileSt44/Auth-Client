export class Auth{
    username:string;
    token:string;
    expiration:string;

    constructor(username: string, token: string, expiration: string){
        this.username=username;
        this.token=token;
        this.expiration=expiration;
    }
}