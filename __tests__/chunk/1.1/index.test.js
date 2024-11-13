import chunk from '../../../functions/chunk/1.1/index';

describe('chunk', () => {
  it('should split the input into chunks of specified size', async () => {
    const input =
      'Homeworld is a real-time strategy video game developed by Relic Entertainment and published by Sierra Studios on September 28, 1999, for Microsoft Windows. Set in space, the science fiction game follows the Kushan exiles of the planet Kharak after their home planet is destroyed by the Taiidan Empire in retaliation for developing hyperspace jump technology. ';
    const chunkSize = 1;
    const expectedChunks = [
      'Homeworld is a real-time strategy video game developed by Relic Entertainment and published by Sierra Studios on September 28, 1999, for Microsoft Windows.',
      'Set in space, the science fiction game follows the Kushan exiles of the planet Kharak after their home planet is destroyed by the Taiidan Empire in retaliation for developing hyperspace jump technology.',
    ];

    const result = await chunk({ input, chunkSize });

    expect(result.result).toEqual(expectedChunks);
  });
  it('should still split the input into chunks of specified size why there are special quotes', async () => {
    const input =
      '“Homeworld" is a real-time strategy video game developed by Relic Entertainment and published by Sierra Studios on September 28, 1999, for Microsoft Windows. Set in space, the science fiction game follows the Kushan exiles of the planet Kharak after their home planet is destroyed by the Taiidan Empire in retaliation for developing hyperspace jump technology. ';
    const chunkSize = 1;
    const expectedChunks = [
      '"Homeworld" is a real-time strategy video game developed by Relic Entertainment and published by Sierra Studios on September 28, 1999, for Microsoft Windows.',
      'Set in space, the science fiction game follows the Kushan exiles of the planet Kharak after their home planet is destroyed by the Taiidan Empire in retaliation for developing hyperspace jump technology.',
    ];

    const result = await chunk({ input, chunkSize });

    expect(result.result).toEqual(expectedChunks);
  });
});
