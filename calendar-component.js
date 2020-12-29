class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentDate: this.props.highlightDate, events: this.props.events, popup: "none", temp: { value: '' } }
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.textInput = React.createRef();
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            Array.from(document.getElementsByClassName('selected')).forEach((el) => el.classList.remove('selected'));
            this.setState({popup:"none"})
        }
    }
    handleClick(event) {
        var entry = this.state.events.find(x => x.date == event.currentTarget.id);
        Array.from(document.getElementsByClassName('selected')).forEach((el) => el.classList.remove('selected'));
        document.getElementById(event.currentTarget.id).classList.add("selected");
        this.setState({ popup: "block", temp: { date: event.currentTarget.id, value: entry ? entry.eventTitle : '' } });
        this.textInput.current.focus();
    }
    handleCopyEvents()
    {
        var copyText = "Your Events Copied on "+new Date().toDateString();
        this.state.events.forEach((event)=>{copyText+="\n "+event.eventTitle+" on "+ new Date(event.date).toDateString()});
        navigator.clipboard.writeText(copyText).then(function() {
            console.log('Async: Copying to clipboard was successful!');
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }
    handleAddEvent(e) {
        var events = this.state.events;
        var index = events.findIndex(e => e.date == this.state.temp.date);
        if (index === -1)
            events.push({ date: this.state.temp.date, eventTitle: e.currentTarget.value });
        else
            events[index] = { date: this.state.temp.date, eventTitle: e.currentTarget.value }
        this.setState({ events: events, temp: { date: this.state.temp.date, value: e.currentTarget.value } });
    }

    handleYearChange(change) {
        var date = new Date(this.state.currentDate);
        var newCurrentDate = date.setFullYear(date.getFullYear() + change);
        this.setState({ currentDate: newCurrentDate })
    }

    handleMonthChange(change) {
        var date = new Date(this.state.currentDate);
        var newCurrentDate = date.setMonth(date.getMonth() + change);
        this.setState({ currentDate: newCurrentDate })
    }

    render() {
        var currentDate = new Date(this.state.currentDate);

        var fdayMonth = new Date(currentDate).setDate(1);
        var dayOfWeek = new Date(fdayMonth).getDay();
        var fdayCalendar = new Date(fdayMonth).setDate(1 - dayOfWeek);

        let rows = [];

        var loopDate = new Date(fdayCalendar);
        var currentEvent;
        for (var i = 0; i < this.props.calendarRows; i++) {
            console.log("i");
            let tds = [];
            for (var j = 0; j < 7; j++) {
                if (this.state.events)
                    currentEvent = this.state.events.find(a => loopDate.wt() === new Date(a.date).wt());
                tds.push(
                    <td onClickCapture={this.handleClick} id={loopDate.toDateString()}
                        className={`${loopDate.wt() === new Date(this.props.highlightDate).wt() ? "today" : ""}
                                    ${loopDate.getMonth() != currentDate.getMonth() ? "inactive-month" : ""}`
                        }
                    >
                        <span className="date">{loopDate.getDate()}</span>
                        {currentEvent && currentEvent.eventTitle.length > 0 ? <span className="event">{currentEvent.eventTitle}</span> : ''}
                    </td>
                );
                loopDate.setDate(loopDate.getDate() + 1)
            }
            rows.push(<tr>{tds}</tr>);
            console.log(rows);
        }
        return (<div ref={this.wrapperRef} style={{ display: "contents" }}>

            <table  id="calendartable">
                <thead>
                    <tr key="month">
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleYearChange(-1)}>&lt;&lt;</button>
                        </th>
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleMonthChange(-1)}>&lt;</button>
                        </th>
                        <th colSpan="3">
                            {currentDate.toLocaleString('default', { month: 'short' })}&nbsp; {currentDate.getFullYear()}
                        </th>
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleMonthChange(1)}>&gt;</button>
                        </th>
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleYearChange(1)}>&gt;&gt;</button>
                        </th>
                    </tr>
                    <tr key="week">
                        {this.props.weekdayFormat.map(day => { return <th className="weekDayNames">{day}</th> })}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            <div style={{ display: this.state.popup }}>
                <input type="text" ref={this.textInput} value={this.state.temp.value} onChange={this.handleAddEvent.bind(this)}></input>
            </div>
            <div><button className="button" onClick={this.handleCopyEvents.bind(this)}>Copy to Clipboard</button></div>
        </div>

        )
    }
}

Calendar.defaultProps =
{
    highlightDate: [new Date()],
    weekdayFormat: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calendarRows: 6,
    events: []
};

Date.prototype.wt = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

ReactDOM.render(<Calendar></Calendar>,document.getElementById('Calendar'));