const subAction = async ({ action: id, inputVariables }) => ({
  result: await runAction({ id, input: inputVariables }),
});

export default subAction;
