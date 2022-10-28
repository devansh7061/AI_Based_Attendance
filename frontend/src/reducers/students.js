export default (students = [], action) => {
    switch (action.type) {
        case "CREATE":
            return [...students, action.payload];
        case "FETCH_ALL":
            return action.payload;
        default:
            return students;
    }
}