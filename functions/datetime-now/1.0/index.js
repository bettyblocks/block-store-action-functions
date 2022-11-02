const datetimeNow = async () => {
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  return {
    result: date,
  };
};

export default datetimeNow;