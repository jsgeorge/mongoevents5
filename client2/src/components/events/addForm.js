import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { addEvent } from "../../actions/eventActions";

class AddEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      username: "",
      eventDate: "",
      eventTime: "",
      city: "",
      state: "",
      location: "",
      address: "",
      description: "",
      errors: {},
      isLoading: false,
      invalid: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ username: this.props.user.username });
  }
  onChange(e) {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value, errors });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  valid(value) {
    console.log(/[^0-9a-zA-Z]/.test(value));
    return /[^0-9a-zA-Z]/.test(value);
  }
  isValidEntries() {
    let errors = {};
    const { name, category, location, eventDate, eventTime } = this.state;
    if (!name || !this.valid(name)) {
      errors.name = "Missing/invalid name";
    }
    if (!category) {
      errors.category = "Missing/invalid category";
    }
    if (!location) {
      errors.location = "missing/invalid location";
    }
    if (!eventDate) {
      errors.eventDate = "missing/invalid event date";
    }
    if (!eventTime) {
      errors.eventTime = "missing/invalid event time";
    }
    // if (errors) {
    this.setState({ errors });
    //   return false;
    // }
    // return true;
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValidEntries()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.addEvent(this.state).then(
        res => this.props.history.push("/events"),
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        {errors.form && (
          <div className="alert alert-danger">{this.state.errors.form}</div>
        )}
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            error={errors.name}
            label="Name"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.name}
            field="name"
          />
          <TextFieldGroup
            error={errors.category}
            label="category"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.category}
            field="category"
          />

          <TextFieldGroup
            error={errors.eventDate}
            label="eventDate"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.eventDate}
            field="eventDate"
          />
          <TextFieldGroup
            error={errors.eventTime}
            label="eventTime"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.eventTime}
            field="eventTime"
          />
          <TextFieldGroup
            error={errors.location}
            label="location"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.location}
            field="location"
          />
          <TextFieldGroup
            error={errors.address}
            label="address"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.address}
            field="address"
          />
          <TextFieldGroup
            error={errors.city}
            label="city"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.city}
            field="city"
          />
          <TextFieldGroup
            error={errors.state}
            label="State"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.state}
            field="state"
          />
          <TextFieldGroup
            error={errors.description}
            label="description"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.description}
            field="description"
          />
          <div className="form-group">
            <button
              disabled={this.state.isLoading || this.state.invalid}
              className="btn btn-primary btn-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.auth.user
  };
}
export default connect(mapStateToProps, { addEvent })(withRouter(AddEventForm));
