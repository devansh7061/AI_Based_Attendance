export default (records = [], action) => {
  switch (action.type) {
    case "CREATE":
      return [...records, action.payload];
    case "FETCH_ALL":
      return action.payload;
    default:
      return records;
  }
};
