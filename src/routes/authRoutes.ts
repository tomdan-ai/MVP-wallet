import { Router } from 'express';
import { UserService } from '../services/UserService';

const router = Router();
const userService = new UserService();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.createUser({ email, password, balance: 0 });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
