const raiseError = async ({ errorMessage }) => {
  throw new Error(errorMessage);
};

export default raiseError;
