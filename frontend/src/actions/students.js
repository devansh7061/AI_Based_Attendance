import * as api from "../api/index";

// Action Creators
export const getStudents = () => async (dispatch) => {
    try {
        const { data } = await api.getStudents();
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addStudent = (student) => async (dispatch) => {
    try {
        const data = await api.addStudent(student);
        dispatch({ type: "CREATE", payload: data });
    } catch (error) {
        console.log(error);
    }
}