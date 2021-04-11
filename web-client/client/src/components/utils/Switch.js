function Switch({ on, setOn }) {
    return (
        <label className="switch">
            <input type="checkbox" checked={on} onChange={setOn} />
            <span className="slider round"></span>
        </label>
    );
}

export default Switch;
