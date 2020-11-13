export interface ISessionUserDTO {
  idRacun: number;
  email: string;
  admin: boolean;
}

// export class SessionUserDTO {
//   private _idRacun!: number;
//   private _email!: string;
//   private _admin!: boolean;

//   constructor(idRacun: number, email: string, admin: boolean) {
//     this._idRacun = idRacun;
//     this._email = email;
//     this._admin = admin;
//   }

//   public get idRacun(): number {
//     return this._idRacun;
//   }

//   public set idRacun(newIdRacun: number) {
//     this._idRacun = newIdRacun;
//   }

//   public get email(): string {
//     return this._email;
//   }

//   public set email(newemail: string) {
//     this._email = newemail;
//   }

//   public get admin(): boolean {
//     return this._admin;
//   }

//   public set admin(newadmin: boolean) {
//     this._admin = newadmin;
//   }
// }
