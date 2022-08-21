import PropTypes from 'prop-types';

const Filter = ({ handleChange, filter }) => {
  return (
    <div>
      <label htmlFor="filter">Find contacts by name</label>
      <input value={filter} required name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string,
};
