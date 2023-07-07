import express, {Request, Response} from 'express';
import cors from 'cors';
import dataSource from './dataSource';
import {
   authRoutes,
   poiRoutes,
   profileRoutes,
   citiesRoutes,
   categoriesRoutes,
} from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('api/auth', authRoutes);
app.use('api/profile', profileRoutes);
app.use('api/poi', poiRoutes);
app.use('api/cities', citiesRoutes);
app.use('api/categories', categoriesRoutes);

// // Old method to implement login
// app.post('/auth/login', async (req: Request, res: Response) => {
//    const { username, password } = req.body;
//    const user = await dataSource.users.findUnique({ where: { username } });
//    if (!user) {
//       res.status(404).json({ message: 'Credentials not valid' });
//       return;
//    }
//    // On vérifiait le MDP
//    if (user.password !== password) {
//       res.status(404).json({ message: 'Credentials not valid' });
//       return;
//    }

//    const token = generateToken(user);

//    // On mettait le token dans un cookie
//    res.cookie('token', token, { httpOnly: true });

//    res.json({ token });
// })
// // Côté frontend, on va stocker le token dans le local storage
// // const response = await axios.post('http://localhost:5000/auth/login', { username, password })

// // const response2 = await axios.get('http://localhost:5000/auth/me')
// // console.log('User', response2.data.user) // { id: 1, username: 'toto', password: 'toto' }

// app.get('/auth/me', async (req: Request, res: Response) => {
//    // On récupère le token depuis le header `Authorization`
//    const token = req.cookies.token;
   
//    // On vérifie que le token est valide
//    const data = await verifyToken(token);

//    // On récupère l'utilisateur depuis la BDD
//    const user = await dataSource.users.findUnique({ where: { id: data.id } });

//    // On renvoie l'utilisateur
//    res.json({ user });
// })

const start = async (): Promise<void> => {
   const port = 5000;

   await dataSource.initialize();
   app.listen({ port }, () => {
      console.log(`Backend app ready at http://localhost:${port}`);
   });
};
void start();
