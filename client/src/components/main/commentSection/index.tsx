import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getMetaData } from '../../../tool';
import { Comment, RootsState } from '../../../types';
import './index.css';
import useUserContext from '../../../hooks/useUserContext';
import getColor from '../../../tool/getColor';
import useTextToSpeech from '../../../hooks/useTextToSpeech';
import { ReactComponent as SpeakerIcon } from '../../../tool/speaker.svg';

/**
 * Interface representing the props for the Comment Section component.
 *
 * - comments - list of the comment components
 * - handleAddComment - a function that handles adding a new comment, taking a Comment object as an argument
 */
interface CommentSectionProps {
  comments: Comment[];
  handleAddComment: (comment: Comment) => void;
}

/**
 * CommentSection component shows the users all the comments and allows the users add more comments.
 *
 * @param comments: an array of Comment objects
 * @param handleAddComment: function to handle the addition of a new comment
 */
const CommentSection = ({ comments, handleAddComment }: CommentSectionProps) => {
  const { user } = useUserContext();
  const [text, setText] = useState<string>('');
  const [textErr, setTextErr] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(false);
  const { speak } = useTextToSpeech();

  /**
   * Function to handle the addition of a new comment.
   */
  const handleAddCommentClick = () => {
    if (text.trim() === '' || user.username.trim() === '') {
      setTextErr(text.trim() === '' ? 'Comment text cannot be empty' : '');
      return;
    }

    const newComment: Comment = {
      text,
      commentBy: user.username,
      commentDateTime: new Date(),
    };

    handleAddComment(newComment);
    setText('');
    setTextErr('');
    // sample comment to try meger conflict
  };
  const { buttonMode } = useSelector((state: RootsState) => state.dataStorageReducer.datastorages);

  const handleTextClick = (commentText: string) => {
    speak(commentText);
  };

  return (
    <div className='comment-section'>
      <button
        style={{ color: getColor(buttonMode) }}
        className='toggle-button'
        onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <div className='comments-container'>
          <ul className='comments-list'>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className='comment-item'>
                  <div className='comment-text-container'>
                    <p className='comment-text'>{comment.text}</p>
                    <button
                      className='speaker_button'
                      onClick={() => handleTextClick(comment.text)}
                      aria-label='Read Comment'>
                      <SpeakerIcon className='speaker-button' />
                    </button>
                  </div>
                  <small className='comment-meta'>
                    {comment.commentBy}, {getMetaData(new Date(comment.commentDateTime))}
                  </small>
                </li>
              ))
            ) : (
              <p className='no-comments'>No comments yet.</p>
            )}
          </ul>

          <div className='add-comment'>
            <div className='input-row'>
              <textarea
                placeholder='Comment'
                value={text}
                onChange={e => setText(e.target.value)}
                className='comment-textarea'
              />
              <button
                className={`${buttonMode || 'add-comment-bg-color'} add-comment-button`}
                onClick={handleAddCommentClick}>
                Add Comment
              </button>
            </div>
            {textErr && <small className='error'>{textErr}</small>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
