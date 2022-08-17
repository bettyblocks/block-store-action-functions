test('compareNr 1.0', async () => {
  const equals = await $app['compareNr 1.0']({ leftValue: 100, rightValue: 100, comparator: 'eq' });
  const nEquals = await $app['compareNr 1.0']({ leftValue: 100, rightValue: 0, comparator: 'neq'});
  const lower = await $app['compareNr 1.0']({ leftValue: 100, rightValue: 50, comparator: 'lower'});
  const lowerEq = await $app['compareNr 1.0']({ leftValue: 100, rightValue: 99, comparator: 'lowerEq'});
  const higher = await $app['compareNr 1.0']({ leftValue: 200, rightValue: 100, comparator: 'higher'});
  const higherEq = await $app['compareNr 1.0']({ leftValue: 100, rightValue: 100, comparator: 'higherEq'});

  
  assert(equals, { result: true });
  assert(nEquals, { result: true });
  assert(lower, { result: false });
  assert(lowerEq, { result: false });
  assert(higher, { result: true });
  assert(higherEq, { result: true });


})