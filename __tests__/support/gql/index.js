import { graphql, buildSchema } from 'graphql';
import Task from '../task';
import User from '../user';

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
  2: new User(2, {
    id: 2,
    firstName: 'Jane',
    lastName: 'Poe',
    age: 30,
    username: 'jane@test.test',
    password: 'test4321',
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

// Populate taskDatabase
Array(201)
  .fill()
  .forEach((_, index) => {
    taskDatabase[index + 1] = new Task(index + 1, {
      id: index + 1,
      name: `Task ${index + 1}`,
      user: userDatabase[1],
    });
  });

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

  type ManyUser {
    results: [User]
    totalCount: Int!
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

  type ManyTask {
    results: [Task]
    totalCount: Int!
  }

  type DeleteManyTask {
    id: Int
    deleteManyTask: [Task]
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

  input IdsIn {
    in: [Int]
  }

  input ManyUserFilterInput {
    id: IdsIn!
  }

  input TaskFilterInput {
    id: IdEquals!
  }

  input TaskInput {
    ids: [Int]
  }

  type Query {
    allUser(where: ManyUserFilterInput): ManyUser
    oneTask(where: TaskFilterInput): Task
    allTask(where: TaskFilterInput, take: Int!): ManyTask
  }

  type Mutation {
    updateManyUser(where: ManyUserFilterInput, input: UserInput): User
    deleteManyTask(input: TaskInput): DeleteManyTask
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
  allUser({
    where: {
      id: { in: ids },
    },
  }) {
    return { results: ids.map((id) => userDatabase[id]) };
  },
  allTask({ take = 50 }) {
    return {
      results: Object.values(taskDatabase).slice(0, take),
      totalCount: Object.keys(taskDatabase).length,
    };
  },
  updateManyUser({
    where: {
      id: { in: ids },
    },
    input,
  }) {
    ids.map((id) => userDatabase[id].update(input));
  },
  deleteManyTask({ input: { ids } }) {
    const deleteManyTask = [];

    ids.forEach((id) => {
      if (Object.prototype.hasOwnProperty.call(taskDatabase, id)) {
        deleteManyTask.push({ id });
      }
      delete taskDatabase[id];
    });

    return { id: 1, data: { deleteManyTask } };
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
