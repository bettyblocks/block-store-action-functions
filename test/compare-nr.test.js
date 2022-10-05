test('Using "eq" returns true if the values are equal', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 100, rightValue: 100, comparator: 'eq' });

  assert(result, true);
})

test('Using "eq" returns false if the values are  not equal', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 100, rightValue: 50, comparator: 'eq' });

  assert(result, false);
})

test('Using "neq" returns true if the values are not equal', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 50, rightValue: 100, comparator: 'neq' });

  assert(result, true);
})

test('Using "neq" returns false if the values are equal', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 100, rightValue: 100, comparator: 'neq' });

  assert(result, false);
})

test('Using "lower" returns true if the first value is lower then the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 50, rightValue: 100, comparator: 'lower' });

  assert(result, true);
})

test('Using "lower" returns false if the first value is not lower then the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 150, rightValue: 100, comparator: 'lower' });

  assert(result, false);
})

test('Using "lowerEq" returns true if the first value is lower then the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 100, rightValue: 100, comparator: 'lowerEq' });

  assert(result, true);
})

test('Using "lowerEq" returns true if the first value is equal to the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 100, rightValue: 100, comparator: 'lowerEq' });

  assert(result, true);
})

test('Using "lowerEq" returns false if the first value is not lower then or equal to the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 150, rightValue: 100, comparator: 'lowerEq' });
  assert(result, false);
})

test('Using "higher" returns true if the first value is higher then the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 150, rightValue: 100, comparator: 'higher' });

  assert(result, true);
})

test('Using "higher" returns false if the first value is not higher then the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 50, rightValue: 100, comparator: 'higher' });

  assert(result, false);
})

test('Using "higherEq" returns true if the first value is higher then the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 150, rightValue: 100, comparator: 'higherEq' });

  assert(result, true);
})

test('Using "higherEq" returns true if the first value is equal to the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 100, rightValue: 100, comparator: 'higherEq' });

  assert(result, true);
})

test('Using "higherEq" returns false if the first value is not higher then or equal to the second value', async () => {
  const result = await $app['compareNumber 1.0']({ leftValue: 50, rightValue: 100, comparator: 'higherEq' });

  assert(result, false);
})


