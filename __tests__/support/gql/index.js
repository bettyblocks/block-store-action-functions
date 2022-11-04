import { graphql, buildSchema } from 'graphql';
import Task from '../task';
import User from '../user';

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.extensions = {
      statusCode: 401,
    };
  }
}

const userDatabase = {
  1: new User(1, {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    username: 'test@test.test',
    password: 'test1234',
    city: null,
    tasks: { id: [] },
  }),
};

const taskDatabase = {
  1: new Task(1, {
    id: 1,
    name: 'First task',
    user: userDatabase[1],
  }),
};

const loginUser = (username, password) =>
  !!Object.values(userDatabase).find(
    (user) => user.username === username && user.password === password,
  );

const schema = buildSchema(`
  type User {
    id: Int!
    firstName: String
    lastName: String
    age: Int
    createdAt: String
    updatedAt: String
    city: City
    tasks: [Task]
  }

  type City {
    id: Int!
    name: String!
  }

  type Task {
    id: Int!
    name: String!
    user: User
  }

  type Token {
    accessExpiresAt: String
    accessExpiresIn: Int
    isValid: Boolean
    jwtToken: String
    refreshExpiresAt: String
    refreshExpiresIn: Int
    refreshToken: String
  }

  input UserTasksInput {
    id: [Int] 
  }

  input UserInput {
    firstName: String
    lastName: String
    age: Int
    createdAt: String
    updatedAt: String
    city: Int
    tasks: UserTasksInput
  }

  input IdEquals {
    eq: Int!
  }

  input UserFilterInput {
    id: IdEquals!
  }

  input TaskFilterInput {
    id: IdEquals!
  }

  type Query {
    oneUser(where: UserFilterInput): User
    oneTask(where: TaskFilterInput): Task
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: Int!, input: UserInput): User
    deleteUser(id: Int!): User
    generateJwt(authProfileUuid: String!, userId: Int, username: String, password: String): Token
  }
`);

const root = {
  oneTask({
    where: {
      id: { eq: id },
    },
  }) {
    return taskDatabase[id];
  },
  oneUser({
    where: {
      id: { eq: id },
    },
  }) {
    return userDatabase[id];
  },
  createUser({ input }) {
    const id = Math.floor((Math.random() + 1) * 100);

    userDatabase[id] = new User(id, input);

    return {
      id,
    };
  },
  updateUser({ id, input }) {
    userDatabase[id].update(input);
  },
  deleteUser({ id }) {
    const user = userDatabase[id];

    delete userDatabase[id];

    return user;
  },
  generateJwt({ authProfileUuid, userId, username, password }) {
    const accessExpiresIn = 7200;
    const refreshExpiresIn = 259200;
    const token = {
      accessExpiresAt: new Date(Date.now() + accessExpiresIn * 1000),
      accessExpiresIn,
      isValid: true,
      jwtToken: 'my-awesome-token',
      refreshExpiresAt: new Date(Date.now() + refreshExpiresIn * 1000),
      refreshExpiresIn,
      refreshToken: 'my-awesome-refresh-token',
    };

    if (authProfileUuid === 'username-password-profile-id') {
      if (loginUser(username, password)) {
        return token;
      }
    } else if (authProfileUuid === 'custom-authentication-profile-id') {
      if (userDatabase[userId]) {
        return token;
      }
    } else {
      throw new Error('Unknown authentication profile');
    }

    throw new AuthenticationError('Wrong credentials, please try again');
  },
};

const gql = async (query, input) =>
  graphql({
    schema,
    source: query,
    rootValue: root,
    variableValues: input,
  });

export default gql;
