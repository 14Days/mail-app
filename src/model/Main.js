export default {
  namespace: 'main',
  state: {
    count: 0,
  },
  reducers: {
    increase(state, _) {
      const {count} = state;
      console.log('ok');
      return {
        count: count + 1,
      };
    },
  },
};
