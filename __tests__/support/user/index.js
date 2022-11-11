import City from '../city';
import Task from '../task';

const cityDatabase = {
  1: new City(1, {
    name: 'Amsterdam',
  }),
  2: new City(2, {
    name: 'London',
  }),
};

const taskDatabase = [
  new Task(1, {
    name: 'Write tests',
  }),
  new Task(2, {
    name: 'Setup pipeline',
  }),
];

class User {
  constructor(
    id,
    {
      firstName,
      lastName,
      age,
      createdAt,
      updatedAt,
      username,
      password,
      city,
      tasks,
    },
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
    this.password = password;
    this.city = cityDatabase[city];

    if (tasks && tasks.id) {
      this.tasks = taskDatabase.filter((task) => tasks.id.includes(task.id));
    }
  }

  update({ firstName, lastName, age, city, tasks }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.city = cityDatabase[city];

    if (tasks && tasks.id) {
      this.tasks = taskDatabase.filter((task) => tasks.id.includes(task.id));
    }

    return this;
  }
}

export default User;
