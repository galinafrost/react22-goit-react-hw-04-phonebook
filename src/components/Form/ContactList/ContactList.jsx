import PropTypes from 'prop-types';

import style from './contact-list.module.css';

const ContactList = ({ removeContact, contacts }) => {
  const elements = contacts.map(contact => (
    <li className={style.li} key={contact.id}>
      {contact.name}: {contact.number}
      <button type="button" onClick={() => removeContact(contact.id)}>
        Delete
      </button>
    </li>
  ));
  return <ul>{elements}</ul>;
};

export default ContactList;

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};
