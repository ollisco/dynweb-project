import { calAuth, calSignOut, getFirstEvent } from "../../calendar";

function Main() {

    return (
        <div>
            <button onClick={calAuth}>
                Auth
            </button>
            <button onClick={calSignOut}>
                Revoke
            </button>
            <button onClick={(e) => getFirstEvent().then(console.log)}>
                Get Upcoming Event
            </button>
        </div>

    )
}

export default Main