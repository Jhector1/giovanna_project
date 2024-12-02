import React from 'react';
import { useSelector } from 'react-redux';

import { handleHyperlink } from '../../../../tool';
import CommentSection from '../../commentSection';
import './index.css';

import { Comment, RootsState } from '../../../../types';

import useTextToSpeech from '../../../../hooks/useTextToSpeech';
import { ReactComponent as SpeakerIcon } from '../../../../tool/speaker.svg';

/**
 * Interface representing the props for the AnswerView component.
 *
 * - text The content of the answer.
 * - ansBy The username of the user who wrote the answer.
 * - meta Additional metadata related to the answer.
 * - comments An array of comments associated with the answer.
 * - handleAddComment Callback function to handle adding a new comment.
 */
interface AnswerProps {
  text: string;
  ansBy: string;
  meta: string;
  comments: Comment[];
  handleAddComment: (comment: Comment) => void;
}

/**
 * AnswerView component that displays the content of an answer with the author's name and metadata.
 * The answer text is processed to handle hyperlinks, and a comment section is included.
 *
 * @param text The content of the answer.
 * @param ansBy The username of the answer's author.
 * @param meta Additional metadata related to the answer.
 * @param comments An array of comments associated with the answer.
 * @param handleAddComment Function to handle adding a new comment.
 */
const AnswerView = ({ text, ansBy, meta, comments, handleAddComment }: AnswerProps) => {
  const { sidebarMode } = useSelector((state: RootsState) => state.dataStorageReducer.datastorages);

  const { speak } = useTextToSpeech();

  const handleTextClick = () => {
    speak(text);
  };

  return (
    <div className='answer right_padding'>
      <div id='answerText' className='answerText'>
        {handleHyperlink(text)}
      </div>

      <div className='answerAuthor'>
        <div className={sidebarMode || 'answer_author'}>{ansBy}</div>

        <button className='speaker_button' onClick={handleTextClick} aria-label='Read text'>
          <SpeakerIcon className='speaker_button' />
        </button>
        <div className='answerAuthor'>
          <div className='answer_author'>{ansBy}</div>

          <div className='answer_question_meta'>{meta}</div>
        </div>
        <CommentSection comments={comments} handleAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default AnswerView;
