import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthController {
  login = (req: Request, res: Response) => {
    // כאן צריך להוסיף לוגיקת אימות משתמש אמיתית
    const user = { id: '123', username: req.body.username };
    
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // שעה אחת
    });
    
    res.json({ message: 'התחברת בהצלחה' });
  };

  logout = (req: Request, res: Response) => {
    res.clearCookie('jwt');
    res.json({ message: 'התנתקת בהצלחה' });
  };
}
