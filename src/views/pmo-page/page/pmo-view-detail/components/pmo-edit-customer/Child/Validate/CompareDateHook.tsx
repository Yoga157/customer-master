import React, { useState } from 'react';

function CompareDateHook() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndate] = useState(null);

  return { startDate, setStartDate, endDate, setEndate };
}

export default CompareDateHook;
