import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootsState } from '../../../types';
import getColor from '../../../tool/getColor';

/**
 * AskQuestionButton component that renders a button for navigating to the
 * "New Question" page. When clicked, it redirects the user to the page
 * where they can ask a new question.
 */
const AskQuestionButton = () => {
  const navigate = useNavigate();

  /**
   * Function to handle navigation to the "New Question" page.
   */
  const handleNewQuestion = () => {
    navigate('/new/question');
  };
  const { buttonMode } = useSelector((state: RootsState) => state.dataStorageReducer.datastorages);

  return (
    <button
      style={{
        backgroundColor: getColor(buttonMode),
        color: buttonMode === 'colorChoiceWhiteButton' ? 'black' : '',
      }}
      className='bluebtn btn_state'
      onClick={() => {
        handleNewQuestion();
      }}>
      Ask a Question
    </button>
  );
};

export default AskQuestionButton;
