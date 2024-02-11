import { Component } from 'react';
import Notiflix from 'notiflix';
import {
  StyledAddContactInput,
  StyledAddContactForm,
  StyledAddContactLabel,
  StyledAddContactButton,
} from './AddContact.styled';
import PropTypes from 'prop-types';

export class AddContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { number } = this.state;
    if (!parseInt(number)) {
      Notiflix.Notify.warning('Please, enter numbers for the phone form');
      return;
    }
    this.props.addContact(this.state);
    this.setState({ name: '', number: '' });
  };

  handleOnChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <StyledAddContactForm onSubmit={this.handleSubmit}>
          <StyledAddContactLabel htmlFor={crypto.randomUUID()}>
            Name
          </StyledAddContactLabel>
          <StyledAddContactInput
            type="text"
            value={name}
            name="name"
            id={crypto.randomUUID()}
            onChange={this.handleOnChangeInput}
            required
          />
          <StyledAddContactLabel htmlFor={crypto.randomUUID()}>
            Number
          </StyledAddContactLabel>
          <StyledAddContactInput
            type="tel"
            value={number}
            name="number"
            id={crypto.randomUUID()}
            onChange={this.handleOnChangeInput}
            placeholder="000-00-00"
            required
          />
          <StyledAddContactButton
            disabled={!name || !name.trim() || !number || !number.trim()}
          >
            Add Contact
          </StyledAddContactButton>
        </StyledAddContactForm>
      </div>
    );
  }
}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired,
};
