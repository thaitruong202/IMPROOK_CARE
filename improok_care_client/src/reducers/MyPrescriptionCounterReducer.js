const MyPrescriptionCounterReducer = (currentState, action) => {
    switch (action.type) {
        case "inc":
            return currentState + action.payload;
        case "dec":
            return currentState - action.payload;
        default:
            return currentState;
    }
}

export default MyPrescriptionCounterReducer;