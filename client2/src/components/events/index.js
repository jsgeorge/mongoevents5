import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEvents } from "../../actions/eventActions";
import EventItem from "./item";

class EventsPage extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <div className="events-wrapper">
        <div className="page-top-cmds">
          <form className="form-inline active-cyan-4">
            <input
              className="form-control form-control-sm mr-3 w-75"
              type="text"
              placeholder="Search events, venues, categories"
              aria-label="Search"
            />
            <button>
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
        <div className="page-top-cmds">
          <h5>
            San Francisco, CA <button className="btn btn-default">chg</button>
          </h5>
        </div>
        <div className="page-top-cmds">
          <Link to="/events/new" className="btn btn-primary">
            Add Event
          </Link>
        </div>
       
        {events.list ? (
          <div>
            {this.props.events.list.map(event => (
              <EventItem key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p>No current events</p>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    events: state.events
  };
}

export default connect(mapStateToProps, { getEvents })(withRouter(EventsPage));
