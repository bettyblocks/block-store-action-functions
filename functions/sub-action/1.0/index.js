const subAction = async ({ action: id, input }) => ({
  result: await runAction({ id, input }),
});

export default subAction;
