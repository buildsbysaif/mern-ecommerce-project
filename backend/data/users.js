import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Saif Sultan',
    email: 'sonuseven15837@gmail.com',
    password: bcrypt.hashSync('sonu62960509', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;