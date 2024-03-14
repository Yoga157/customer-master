import React from 'react';
import { useSelector } from 'react-redux';
import tinymce from 'tinymce';

import { pssInitPlaceHolderEnum, pssInitValueEnum } from 'constants/pssInitValueEnum';
import IStore from 'models/IStore';

function PSSHooks() {
  const pssLastFirst = useSelector((state: IStore) => state.pss.firstData!);

  const setValueFields = (id: string, initValue: any, defaulValue: any) => {
    tinymce.get(id).setContent(initValue ? initValue : defaulValue);
  };

  const onClickIsEdit = () => {
    setValueFields('DocumentControl', pssLastFirst.documentControl, pssInitValueEnum.docControl);
    setValueFields('DistributionList', pssLastFirst.distributionList, pssInitValueEnum.distributionList);

    setValueFields('ProjScope', pssLastFirst.projectScopeStatement, pssInitValueEnum.projectScope);
    setValueFields('Deliverables', pssLastFirst.projectDeliverables, pssInitValueEnum.projectDeliverables);
    setValueFields('ScopeWork', pssLastFirst.scopeOfWork, pssInitValueEnum.scopeOfWork);
    setValueFields('Organization', pssLastFirst.projectOrganization, pssInitValueEnum.projectOrganization);
    setValueFields('Timeline', pssLastFirst.projectTimeline, pssInitValueEnum.projectTimeline);
    setValueFields('AccCriteria', pssLastFirst.projectAcceptance, pssInitValueEnum.projectAcceptance);
    setValueFields('Exclusion', pssLastFirst.projectExclusion, pssInitValueEnum.projectExclusion);
    setValueFields('Constrain', pssLastFirst.projectConstraint, pssInitValueEnum.projectConstraint);
    setValueFields('Assumption', pssLastFirst.assumption, pssInitValueEnum.assumption);
    setValueFields('Risk', pssLastFirst.risk, pssInitValueEnum.risk);
    setValueFields('Signature', pssLastFirst.projectApproval, pssInitValueEnum.projectApproval);
  };

  const onClickCancel = () => {
    setValueFields('DocumentControl', pssLastFirst.documentControl, pssInitPlaceHolderEnum.docControl);
    setValueFields('DistributionList', pssLastFirst.distributionList, pssInitPlaceHolderEnum.distributionList);

    setValueFields('ProjScope', pssLastFirst.projectScopeStatement, pssInitPlaceHolderEnum.projectScope);
    setValueFields('Deliverables', pssLastFirst.projectDeliverables, pssInitPlaceHolderEnum.projectDeliverables);
    setValueFields('ScopeWork', pssLastFirst.scopeOfWork, pssInitPlaceHolderEnum.scopeOfWork);
    setValueFields('Organization', pssLastFirst.projectOrganization, pssInitPlaceHolderEnum.projectOrganization);
    setValueFields('Timeline', pssLastFirst.projectTimeline, pssInitPlaceHolderEnum.projectTimeline);
    setValueFields('AccCriteria', pssLastFirst.projectAcceptance, pssInitPlaceHolderEnum.projectAcceptance);
    setValueFields('Exclusion', pssLastFirst.projectExclusion, pssInitPlaceHolderEnum.projectExclusion);
    setValueFields('Constrain', pssLastFirst.projectConstraint, pssInitPlaceHolderEnum.projectConstraint);
    setValueFields('Assumption', pssLastFirst.assumption, pssInitPlaceHolderEnum.assumption);
    setValueFields('Risk', pssLastFirst.risk, pssInitPlaceHolderEnum.risk);
    setValueFields('Signature', pssLastFirst.projectApproval, pssInitPlaceHolderEnum.projectApproval);
  };
  return [onClickIsEdit, onClickCancel];
}

export default PSSHooks;
