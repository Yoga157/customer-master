import React, { useState } from 'react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { useSelector } from 'react-redux';
import tinymce from 'tinymce';

import { selectFunnelSearchOptions } from 'selectors/select-options/PMOTypeSelector';
import IStore from 'models/IStore';
import moment from 'moment';

function ValidateFormAddNewProject({ onChangeField, projectAlias, assignToList, assignCCList }) {
  const [estStartBypmo, setEstStartBypmo] = useState(null);
  const [estEndBypmo, setEstEndBypmo] = useState(null);
  const [activityStart, setActivityStart] = useState(null);
  const [activityEnd, setActivityEnd] = useState(null);

  var endPMO = moment(estEndBypmo);
  var startPMO = moment(estStartBypmo);
  var endMeet = moment(activityEnd);
  var startMeet = moment(activityStart);

  const onResultSelectFunnel = useSelector((state: IStore) => selectFunnelSearchOptions(state));

  const isValidFunnelGenID = createValidator(
    (message) => (value) => {
      if (value && onResultSelectFunnel.length === 0) {
        return message;
      }
    },
    'Invalid FunnelGenID'
  );

  const isValidAssignTo = createValidator(
    (message) => (value) => {
      if (assignToList.length === 0) return 'Sent Invitation To is required!';

      if ((value && value.length === 1 && value[0]?.text === '') || (value && value.length === 0)) return message;
    },
    'Invalid AssignTo'
  );

  const isValidAssignCc = createValidator(
    (message) => (value) => {
      if (assignCCList.length === 0) return 'Assign CC is required!';

      if ((value && value.length === 1 && value[0]?.text === '') || (value && value.length === 0)) return message;
    },
    'Invalid Assign CC'
  );

  const isValidDescription = createValidator(
    (message) => (value) => {
      if ($.trim(jQuery(value).text()) === '') {
        return message;
      } else if (!value) {
        return message;
      }
    },
    'Meeting Description is required!'
  );

  const isValidProjectAlias = createValidator(
    (message) => (value) => {
      if (projectAlias.length === 0) {
        return message;
      }
    },
    'Project Alias is required!'
  );

  const isValidStartDatePMO = createValidator(
    (message) => (value) => {
      setEstStartBypmo(value);

      if (value && endPMO.diff(startPMO, 'hours') < 0 && moment(onChangeField.estEndBypmo).diff(moment(onChangeField.estStartBypmo), 'hours') < 0) {
        return 'Est. Project Start must be less than Est. Project End';
      } else if (!value && !onChangeField.estStartBypmo) {
        return message;
      }
    },
    'PMO Est. Project Start is required!'
  );

  const isValidEndDatePMO = createValidator(
    (message) => (value) => {
      setEstEndBypmo(value);

      if (value && endPMO.diff(startPMO, 'hours') < 0 && moment(onChangeField.estEndBypmo).diff(moment(onChangeField.estStartBypmo), 'hours') < 0) {
        return 'Est. Project End must be more than Est. Project Start';
      } else if (!value && !onChangeField.estEndBypmo) {
        return message;
      }
    },
    'PMO Est. Project End is required!'
  );

  const isValidActivityStart = createValidator(
    (message) => (value) => {
      setActivityStart(value);
      if (value && endMeet.diff(startMeet, 'hours') < 1) {
        return 'Meeting Start must be less than Meeting End';
      } else if (!value) {
        return message;
      }
    },
    'Meeting Start is required!'
  );

  const isValidActivityEnd = createValidator(
    (message) => (value) => {
      setActivityEnd(value);
      if (value && endMeet.diff(startMeet, 'hours') < 1) {
        return 'Meeting End must be more than Meeting Start';
      } else if (!value) {
        return message;
      }
    },
    'Meeting End is required!'
  );

  const validatePMONotInitialMeet = combineValidators({
    funnelGenId: composeValidators(isValidFunnelGenID, isRequired('Funnel No'))(),
    estStartBypmo: composeValidators(isValidStartDatePMO)(),
    estEndBypmo: composeValidators(isValidEndDatePMO)(),
    // projectAliass: composeValidators(isValidProjectAlias)(),
  });

  const validatePMOActivity = combineValidators({
    funnelGenId: composeValidators(isValidFunnelGenID, isRequired('Funnel No'))(),
    estStartBypmo: composeValidators(isValidStartDatePMO)(),
    estEndBypmo: composeValidators(isValidEndDatePMO)(),
    // projectAliass: composeValidators(isValidProjectAlias)(),
    activityTitle: isRequired('Subject'),
    assignTo: composeValidators(isValidAssignTo)(),
    // assignCc: composeValidators(isValidAssignCc)(),
    activityStart: composeValidators(isValidActivityStart)(),
    activityEnd: composeValidators(isValidActivityEnd)(),
    activityText: isRequired('Venue (offline meeting) / Link (online meeting)'),
    // activityText: composeValidators(isValidDescription)(),
  });

  return [validatePMONotInitialMeet, validatePMOActivity];
}

export default ValidateFormAddNewProject;
