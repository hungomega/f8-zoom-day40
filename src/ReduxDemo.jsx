import { useSelector, useDispatch } from "@/libs/react-redux";

function ReduxDemo() {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={() => dispatch({ type: "increase" })}>
                Increase
            </button>
        </div>
    );
}

export default ReduxDemo;