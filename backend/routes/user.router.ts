import { KlijentController } from '../controllers/klijent/KlijentController';
import { UserController } from '../controllers/user/UserController';
import express from 'express';

export const userRouter = express.Router();
userRouter.delete('/:idRacun', UserController.delete);

//userRouter.get('/all', UserController.getAll);

userRouter.get('/:idRacun', UserController.get);

//userRouter.get('/all', KlijentController.getAll);

// /*
//   Returns a promise, resolves if user with given id exists, rejects if not
//   If resolved returns
//   {
//     user,
//     isClient
//   }
// */
// const getUserById = async (idRacun) => {
//   return new Promise(async (resolve, reject) => {
//     // find account by id
//     const racun = (await Racun.findOne({
//       where: {
//         idRacun,
//       },
//     })) as any;

//     // reject with status 400 if account doesn't exist
//     if (!racun) {
//       reject({
//         errors: [
//           {
//             message: `Korisnik s id=${idRacun} ne postoji`,
//           },
//         ],
//         status: 404,
//       });
//     }

//     // filter data for returning user
//     const user = {
//       idRacun: racun.idRacun,
//       email: racun.email,
//       OIB: racun.OIB,
//       admin: racun.admin,
//       ime: undefined,
//       prezime: undefined,
//       brojKartice: undefined,
//       naziv: undefined,
//       adresa: undefined,
//     };

//     // fetch client by account id
//     const klijent = (await Klijent.findOne({
//       where: {
//         idRacun,
//       },
//     })) as any;

//     // if client exists, resolve with clients data
//     if (klijent) {
//       user.ime = klijent.ime;
//       user.prezime = klijent.prezime;
//       user.brojKartice = klijent.brojKartice;
//       resolve({ user, isClient: true });
//     }

//     // fetch company by account id
//     const tvrtka = (await Tvrtka.findOne({
//       where: {
//         idRacun,
//       },
//     })) as any;

//     // if company exists, resolve with companies data
//     if (tvrtka) {
//       user.naziv = tvrtka.naziv;
//       user.adresa = tvrtka.adresa;
//       resolve({ user, isClient: false });
//     }

//     // if client nor company exists and account does, there is error in database
//     reject({
//       errors: [
//         {
//           message: 'Internal server error',
//         },
//       ],
//       status: 500,
//     });
//   });
// };

// /*
//   Returns all users
//   {
//     data: {
//       clients: {
//         id: integer,
//         email: string,
//         OIB: string,
//         admin: boolean
//         ime: string,
//         prezime: string,
//         brojKartice: string
//       }[],
//       companies:{
//         id: integer,
//         email: string,
//         OIB: string,
//         admin: boolean,
//         naziv: string,
//         adresa: string
//       }[]
//     }
//   }
// */
// const getAllUsers = async () => {
//   return new Promise(async (resolve, reject) => {
//     const numberOfAccounts = await Racun.count();
//     let i = 0;
//     let id = 1;

//     const users = { clients: [], companies: [] };

//     while (i < numberOfAccounts) {
//       await getUserById(id)
//         .then(({ user, isClient }) => {
//           console.log('User fetched:', user);
//           if (isClient) {
//             users.clients.push(user);
//           } else {
//             users.companies.push(user);
//           }
//           i++;
//         })
//         .catch(({ errors, status }) => {
//           if (status === 404) {
//             console.log(`Account with id = ${id} doesn't exist!`);
//           } else if (status === 500) {
//             console.log(errors[0].message);
//           }
//         });
//       id++;
//     }

//     resolve(users);
//   });
// };

// /*
//   This endpoint will return all users in app.

//   If user is admin, this will return with status 200 and:
//   {
//     data: {
//       clients: {
//         id: integer,
//         email: string,
//         OIB: string,
//         admin: boolean
//         ime: string,
//         prezime: string,
//         brojKartice: string
//       }[],
//       companies:{
//         id: integer,
//         email: string,
//         OIB: string,
//         admin: boolean,
//         naziv: string,
//         adresa: string
//       }[]
//     }
//   }

//   If user is not admin
//   {
//     errors: [{
//       message: string,
//     }]
//   }
// */
// userRouter.get('/all', async (req: any, res) => {
//   if (!req.session.user.admin) {
//     return res.status(401).json({
//       errors: [
//         {
//           message: 'Neovlaštena radnja',
//         },
//       ],
//     });
//   }

//   await getAllUsers()
//     .then((users) => {
//       return res.json({
//         data: {
//           users,
//         },
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// /*
//   This endpoint will return a user with a given id

//   If user is logged, this will retun with status 200 and:
//   for clients:
//   {
//     data: {
//       user: {
//         id: integer,
//         email: string,
//         OIB: string,
//         admin: boolean
//         ime: string,
//         prezime: string,
//         brojKartice: string
//       }
//     }
//   }

//   for companies:
//   {
//     data: {
//       user: {
//         id: integer,
//         email: string,
//         OIB: string,
//         admin: boolean,
//         naziv: string,
//         adresa: string
//       }
//     }
//   }

//   If user is not logged, this will return with status 401 and:
//   {
//     errors: [
//       {
//       message: string,
//     }
//   ]
//   }
// */
// userRouter.get(
//   '/:id',
//   [param('id').isInt().withMessage('Traženi korisnik ne postoji.')],
//   async (req, res) => {
//     const errors = validationResult.withDefaults({
//       formatter: ({ msg, ...rest }) => {
//         return {
//           message: msg,
//           ...rest,
//         };
//       },
//     })(req);

//     if (!errors.isEmpty()) {
//       return res.status(404).json({ errors: errors.array() });
//     }

//     if (!(req.session.user.admin || req.session.user.id === req.params.id)) {
//       return res.status(401).json({
//         errors: [
//           {
//             message: 'Neovlaštena radnja',
//           },
//         ],
//       });
//     }

//     await getUserById(req.params.id)
//       .then(({ user }) => {
//         return res.json({
//           data: {
//             user,
//           },
//         });
//       })
//       .catch((err) => {
//         return res.status(err.status).json({
//           errors: err.errors,
//         });
//       });
//   }
// );
