import { calAuth, calSignOut, getFirstEventData } from "../../gcalSource";

function Main() {

    return (
        <div>
            <button onClick={calAuth}>
                Sign In
            </button>
            <button onClick={calSignOut}>
                Sign Out
            </button>
            <button onClick={(e) => getFirstEventData().then(console.log)}>
                Get First Event
            </button>
        </div>

    )
}

export default Main