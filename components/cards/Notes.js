import PropTypes from 'prop-types';
import Note from './Note';

const Notes = ({ notes }) => {
  return (
    <div className="notes">
      {
        notes.map(note => <Note key={note._id} note={note} />)
      }
    </div>
  );
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default Notes;
