import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Note = ({ note }) => (
  <div className="note">
    <FontAwesomeIcon icon={faCaretRight} />
    <p>{note.text}</p>
  </div>
);

Note.propTypes = {
  note: PropTypes.object.isRequired,
};

export default Note;
