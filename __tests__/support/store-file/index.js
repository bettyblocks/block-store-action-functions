const storeFile = async (modelName, _propertyName, _url) => {
  switch (modelName) {
    case 'Error':
      throw new Error('Something went wrong.');

    default:
      return 'my-awesome-reference';
  }
};

export default storeFile;
