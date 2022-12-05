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

  input IdEquals {
    eq: Int!
  }

  input TaskFilterInput {
    id: IdEquals!
  }

  input TaskInput {
    ids: [Int]
  }

  type Query {
    oneTask(where: TaskFilterInput): Task
    allTask(where: TaskFilterInput, take: Int!): ManyTask
  }

  type Mutation {
    deleteManyTask(input: TaskInput): Task
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
  allTask({ take }) {
    return {
      results: Object.values(taskDatabase).slice(0, take),
      totalCount: Object.keys(taskDatabase).length,
    };
  },
  deleteManyTask({ input: { ids } }) {
    const task = taskDatabase[0];

    ids.forEach((id) => {
      delete taskDatabase[id];
    });

    return task;
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
