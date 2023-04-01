import { calAuth, calSignOut, getUpcomingEvents } from "../../calendar";

function Main() {

    return (
        <div>
            <button onClick={calAuth}>
                Auth
            </button>
            <button onClick={calSignOut}>
                Revoke
            </button>
            <button onClick={(e) => getUpcomingEvents(20).then(console.log)}>
                Get Upcoming Events
            </button>
        </div>

    )
}

export default Main