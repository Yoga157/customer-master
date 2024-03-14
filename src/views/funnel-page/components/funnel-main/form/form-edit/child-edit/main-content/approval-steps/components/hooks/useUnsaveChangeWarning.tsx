import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';

const UseUnsaveChangeWarning = (message = 'Are you sure want to discard changes?') => {
  const [isCloseTab, handleCloseTab] = useState(false);

  useEffect(() => {
    window.onbeforeunload = isCloseTab && (() => message);

    return () => {
      window.onbeforeunload = null;
    };
  }, [isCloseTab]);

  const routerPrompt = <Prompt when={isCloseTab} message={message} />;
  return [routerPrompt, (e) => handleCloseTab(e)] as const;
};

export default UseUnsaveChangeWarning;
