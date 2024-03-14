import React, { useEffect, useState } from 'react';

import environment from 'environment';

import axios from 'axios';

function PMOHooks() {
  const [docTypeId, setDocTypeId] = useState(0);

  useEffect(() => {
    getDocumentTypeId();
  }, []);

  const getDocumentTypeId = () => {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    axios
      .get(`${environment.api.generic.replace(':controller', 'Udc/GetUdcId?entryKey=DocumentType&text1=Task%20and%20Ticket%20Attachment')}`, {
        headers: {
          Authorization: `Bearer ${userLogin === null ? '' : userLogin.token}`,
        },
      })
      .then((res) => setDocTypeId(res.data))
      .catch((err) => console.log(err));
  };

  return { docTypeId };
}

export default PMOHooks;
