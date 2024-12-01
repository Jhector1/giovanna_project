import React from 'react';
import { useSelector } from 'react-redux';
import useNewQuestion from '../../../hooks/useNewQuestion';
import Form from '../baseComponents/form';
import Input from '../baseComponents/input';
import TextArea from '../baseComponents/textarea';
import './index.css';

import { RootsState } from '../../../types';

/**
 * NewQuestionPage component allows users to submit a new question with a title,
 * description, tags, and username.
 */
const NewQuestionPage = () => {
  const { sidebarMode, buttonMode } = useSelector(
    (state: RootsState) => state.dataStorageReducer.datastorages,
  );

  const {
    title,
    setTitle,
    text,
    setText,
    tagNames,
    setTagNames,
    titleErr,
    textErr,
    tagErr,
    postQuestion,
  } = useNewQuestion();

  return (
    <Form>
      <Input
        title={'Question Title'}
        hint={'Limit title to 100 characters or less'}
        id={'formTitleInput'}
        val={title}
        setState={setTitle}
        err={titleErr}
      />
      <TextArea
        title={'Question Text'}
        hint={'Add details'}
        id={'formTextInput'}
        val={text}
        setState={setText}
        err={textErr}
      />
      <Input
        title={'Tags'}
        hint={'Add keywords separated by whitespace'}
        id={'formTagInput'}
        val={tagNames}
        setState={setTagNames}
        err={tagErr}
      />
      <div className='btn_indicator_container'>
        <button
          className={` ${buttonMode || 'post-question-bg-color'} form_postBtn`}
          onClick={() => {
            postQuestion();
          }}>
          Post Question
        </button>
        <div className={sidebarMode || 'mandatory_indicator'}>* indicates mandatory fields</div>
      </div>
    </Form>
  );
};

export default NewQuestionPage;
