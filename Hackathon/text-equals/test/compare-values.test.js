test('Using "eq" returns true if the left value equals the right value ', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum Ipsum', comparator: 'eq', toLower: false });
  assert(result, true);
});

test('Using "eq" returns false if the left value does not equal the right value ', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'eq', toLower: false });
  assert(result, false);
});

test('Using "eq" returns true if the left value to lowercase equals the right value to lowercase', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum Ipsum', comparator: 'eq', toLower: true });
  assert(result, true);
});

test('Using "eq" returns false if the left value to lowercase does not equal the right value to lowercase', async () => {
const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Dolor Sit Amet', comparator: 'eq', toLower: true });
  assert(result, false);
});

test('Using "neq" returns true if the left value does not equal the right value', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'neq', toLower: false });
  assert(result, true);
});

test('Using "neq" returns false if the left value equals the right value', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum Ipsum', comparator: 'neq', toLower: false });
  assert(result, false);
});

test('Using "neq" returns true if the left value to lowercase does not equal the right value to lowercase', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'neq', toLower: true });
  assert(result, true);
});

test('Using "neq" returns false if the left value to lower case equals the right value to lower case', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum Ipsum', comparator: 'neq', toLower: true });
  assert(result, false);
});

test('Using "cont" returns true if the left value contains the right value ', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'cont', toLower: false });
  assert(result, true);
});

test('Using "cont" returns false if the left value does not contain the right value ', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Dolor Sit Amet', comparator: 'cont', toLower: false });
  assert(result, false);
});

test('Using "cont" returns true if the left value to lowercase contains the right value to lowercase', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'cont', toLower: true });
  assert(result, true);
});

test('Using "cont" returns false if the left value to lowercase does not contain the right value to lowercase', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Dolor Sit Amet', comparator: 'cont', toLower: true });
  assert(result, false);
});

test('Using "ncont" returns true if the left value does not contain the right value ', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Dolor Sit Amet', comparator: 'ncont', toLower: false });
  assert(result, true);
});

test('Using "ncont" returns false if the left value contains the right value ', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum Ipsum', comparator: 'ncont', toLower: false });
  assert(result, false);
});

test('Using "startsWith" returns true if the left value starts with the right value', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'startsWith', toLower: true });
  assert(result, true);
});

test('Using "startsWith" returns false if the left value does not start with the right value', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Ipsum', comparator: 'startsWith', toLower: true });
  assert(result, false);
});

test('Using "endsWith" returns true if the left value ends with the right value', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Ipsum', comparator: 'endsWith', toLower: true });
  assert(result, true);
});

test('Using "endsWith" returns false if the left value does not end with the right value', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'endsWith', toLower: true });
  assert(result, false);
});

test('Using "regMatch" returns true if the left value ends matches with the given regex', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: /([a-z])/g, comparator: 'regMatch', toLower: false });
  assert(result, true);
});

test('Using "regMatch" returns false if the left value does not match with the given regex', async () => {
  const result = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: /([1-9])/g, comparator: 'regMatch', toLower: false });
  assert(result, false);
});

