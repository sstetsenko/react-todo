import React from "react";

function Navigation(props) {

    return (
        <div className="navigation">
            <button className="all" onClick={() => props.filterStatus('all')}>All</button>
            <button className="in-progress" onClick={() => props.filterStatus(false)}>In Progress</button>
            <button className="all-done" onClick={() => props.filterStatus(true)}>Done</button>
        </div>
    )
}

export default Navigation