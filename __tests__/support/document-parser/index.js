const documentParser = async ({ document }) => {
  if (document === 'https://www.example.com/special-document.pdf') {
    return {
      result: 'Dummy&nbsp;result with special&nbsp;characters',
    };
  }

  return {
    result: 'Dummy result',
  };
};

export default documentParser;
