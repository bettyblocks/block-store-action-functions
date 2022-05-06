function hello({ name, id }: { name: string, id: number }): string {
  console.log(`Hello ${name + id || 'World, id '}!`);
  return String(`${name}, ${id}`);
}
