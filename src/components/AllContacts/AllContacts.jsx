import { OneContact } from 'components/OneContact/OneContact';
import { Component } from 'react';
import { StyledAllContactsUl } from './AllContacts.styled';
import PropTypes from 'prop-types';

export class AllContacts extends Component {
  render() {
    const { deleteContact, dataContacts } = this.props;
    return (
      <StyledAllContactsUl>
        {dataContacts.map(contact => {
          return (
            <OneContact
              key={crypto.randomUUID()}
              {...contact}
              deleteContact={deleteContact}
            />
          );
        })}
      </StyledAllContactsUl>
    );
  }
}

AllContacts.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  dataContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
