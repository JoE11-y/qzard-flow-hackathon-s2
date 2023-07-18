import { useEffect, useRef } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

export function SurveyComponent({surveyJson, onComplete}:{surveyJson: any, onComplete: any}) {
  // useRef enables the Model object to persist between state changes
  const surveyModel = useRef(new Model(surveyJson)).current;

  useEffect(() => {
    surveyModel.onComplete.add(onComplete);
  }, [onComplete, surveyModel]);

  return <Survey model={surveyModel} />;
}