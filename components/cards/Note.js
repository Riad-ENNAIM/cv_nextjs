import PropTypes from 'prop-types';

const Note = ({ note }) => {
  return (
    <div className="note">
      <i className="fas fa-caret-right"></i>
      <p>
        {note.text}
      </p>
    </div>
  );
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;
