import { calAuth, calSignOut, getFirstEventData } from "../../calendar";

function Main() {

    return (
        <div>
            <button onClick={calAuth}>
                Auth
            </button>
            <button onClick={calSignOut}>
                Revoke
            </button>
            <button onClick={(e) => getFirstEventData().then(console.log)}>
                Get First Events
            </button>
        </div>

    )
}

export default Main