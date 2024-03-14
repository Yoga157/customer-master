import React, { useEffect, Fragment, useState, useRef } from 'react';

import { Button, Card, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import environment from 'environment';
import { Dispatch } from 'redux';
import moment from 'moment';
import axios from 'axios';

import { InitPlaceHolderDocInformation, pssInitPlaceHolderEnum, pssInitValueEnum } from 'constants/pssInitValueEnum';
import PMOEditStatusHook from '../pmo-view-detail/components/pmo-edit-status/hooks/PMOEditStatusHook';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectHeaderPss } from 'selectors/pss/PssSelectors';
import IUserResult from 'selectors/user/models/IUserResult';
import ToolTips from 'views/components/UI/Tooltip/ToolTip';
import CardEditor from './components/editor/CardEditor';
import PSSHitory from './components/history/Index';
import * as PssActions from 'stores/pss/PSSActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import PrintPSS from './components/print/PrintPSS';
import classes from './Index.module.scss';
import PSSHooks from './hooks/PSSHooks';
import IStore from 'models/IStore';

interface IProps {}

const IndexForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const projHeaderRef = useRef(null);
  const docInformationRef = useRef(null);
  const docControlRef = useRef(null);
  const distributionRef = useRef(null);
  const projScopeRef = useRef(null);
  const deliverablesRef = useRef(null);
  const scopeWorkRef = useRef(null);
  const organizationRef = useRef(null);
  const timelineRef = useRef(null);
  const accCriteriaRef = useRef(null);
  const exclusionRef = useRef(null);
  const constrainRef = useRef(null);
  const assumptionRef = useRef(null);
  const riskRef = useRef(null);
  const signatureRef = useRef(null);

  const [valProjHeader, setValPojHeader] = useState('<p>-</p>');
  const [valDocInformation, setDocInformation] = useState('<p>-</p>');
  const [valDocControl, setDocControl] = useState('<p>-</p>');
  const [valDistributionList, setDistributionList] = useState('<p>-</p>');
  const [valProjScope, setValProjScope] = useState('<p>-</p>');
  const [valDeliverables, setValDeliverables] = useState('<p>-</p>');
  const [valScopeWork, setValScopeWork] = useState('<p>-</p>');
  const [valOrganization, setValOrganization] = useState('<p>-</p>');
  const [valTimeline, setValTimeLine] = useState('<p>-</p>');
  const [valAccCriteria, setValAccCriteria] = useState('<p>-</p>');
  const [valExclusion, setValExclusion] = useState('<p>-</p>');
  const [valConstrain, setValConstrain] = useState('<p>-</p>');
  const [valAssumption, setValAssumption] = useState('<p>-</p>');
  const [valRisk, setValRisk] = useState('<p>-</p>');
  const [valSignature, setValSignature] = useState('<p>-</p>');
  const [isSave, setIsSave] = useState(false);
  const [clickBtnEdit, setClickBtnEdit] = useState(false);
  const [isPlaceHolder, setIsPlaceHolder] = useState({
    docHeader: false,
    docInformation: false,
    docControl: false,
    distributionList: false,
    projScope: false,
    projDeliverables: false,
    projScopeOfWork: false,
    projOrganization: false,
    projTimeline: false,
    projAcceptance: false,
    projExclusion: false,
    projConstraint: false,
    projAssumption: false,
    projRisk: false,
  });

  const funnelGenId: number = +state.funnelGenID;

  const [isDisable, setDisable] = useState(true);
  const [disableComponent, setDisableComponent] = useState(true);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [PssActions.PSS_HEADER, PssActions.GET_PSS_LATEST, PssActions.CREATE_PSS, PssActions.PUT_PSS])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const pssLastFirst = useSelector((state: IStore) => state.pss.firstData!);
  const pss = useSelector((state: IStore) => selectHeaderPss(state));

  const { statusProject } = PMOEditStatusHook({});

  const example_image_upload_handler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('FunnelGenID', String(funnelGenId));
      formData.append('CreateUserID', `${currentUser.employeeID}`);
      formData.append('File', blobInfo.blob(), blobInfo.filename());

      const endPoind = (controllerName: string) => {
        // return environment.api.funnel.replace(':controller', controllerName);
        return `https://bhpapisrv.berca.co.id:5009/api/DQFunnelService/${controllerName}`;
      };
      axios({
        method: 'post',
        url: endPoind('FileFunnel/UploadGetImageLink'),
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${currentUser.token}` },
      })
        .then(function(response) {
          let url = response.data.filePath;
          // resolve(`http://10.0.2.41:7000/api/DQFunnelService/FileFunnel/${url.split('/')[url.split('/').length - 1]}`);
          resolve(`https://bhpapisrv.berca.co.id:5009/api/DQFunnelService/FileFunnel/${url.split('/')[url.split('/').length - 1]}`);
          // resolve(response.data.filePath);
          // console.log('response', response);
        })
        .catch(function(response) {
          // console.log(response);
          if (response.status < 200 || response.status >= 300) {
            reject('HTTP Error: ' + response.status);
            return;
          }
        });
    });

  const [onClickIsEdit, onClickCancel] = PSSHooks();

  useEffect(() => {
    dispatch(PssActions.reqGetPSSLatest(+state.funnelGenID));

    dispatch(PssActions.reqPSSHeaderPrint(+funnelGenId));
    // let timer = setTimeout(() => setDisable(false), 5500);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [dispatch]);

  useEffect(() => {
    setValPojHeader(pssLastFirst.documentHeader ? pssLastFirst.documentHeader : pssInitPlaceHolderEnum.docHeader);
    setDocInformation(pssLastFirst.documentInformation ? pssLastFirst.documentInformation : InitPlaceHolderDocInformation(pss));
    setDocControl(pssLastFirst.documentControl ? pssLastFirst.documentControl : pssInitPlaceHolderEnum.docControl);
    setDistributionList(pssLastFirst.distributionList ? pssLastFirst.distributionList : pssInitPlaceHolderEnum.distributionList);

    setValProjScope(pssLastFirst.projectScopeStatement ? pssLastFirst.projectScopeStatement : pssInitPlaceHolderEnum.projectScope);
    setValDeliverables(pssLastFirst.projectDeliverables ? pssLastFirst.projectDeliverables : pssInitPlaceHolderEnum.projectDeliverables);
    setValScopeWork(pssLastFirst.scopeOfWork ? pssLastFirst.scopeOfWork : pssInitPlaceHolderEnum.scopeOfWork);
    setValOrganization(pssLastFirst.projectOrganization ? pssLastFirst.projectOrganization : pssInitPlaceHolderEnum.projectOrganization);
    setValTimeLine(pssLastFirst.projectTimeline ? pssLastFirst.projectTimeline : pssInitPlaceHolderEnum.projectTimeline);
    setValAccCriteria(pssLastFirst.projectAcceptance ? pssLastFirst.projectAcceptance : pssInitPlaceHolderEnum.projectAcceptance);
    setValExclusion(pssLastFirst.projectExclusion ? pssLastFirst.projectExclusion : pssInitPlaceHolderEnum.projectExclusion);
    setValConstrain(pssLastFirst.projectConstraint ? pssLastFirst.projectConstraint : pssInitPlaceHolderEnum.projectConstraint);
    setValAssumption(pssLastFirst.assumption ? pssLastFirst.assumption : pssInitPlaceHolderEnum.assumption);
    setValRisk(pssLastFirst.risk ? pssLastFirst.risk : pssInitPlaceHolderEnum.risk);
    setValSignature(pssLastFirst.projectApproval ? pssLastFirst.projectApproval : pssInitPlaceHolderEnum.projectApproval);
  }, [dispatch, pss, pssLastFirst]);

  useEffect(() => {
    validate('onChange');
  }, [
    valProjHeader,
    valDocInformation,
    valDocControl,
    valDistributionList,
    valProjScope,
    valDeliverables,
    valScopeWork,
    valOrganization,
    valTimeline,
    valAccCriteria,
    valExclusion,
    valConstrain,
    valAssumption,
    valRisk,
  ]);

  const compareBeforeSendData = (ref: any, initValue: string) => {
    ref = ref.replace(/(\r\n|\n|\r)/gm, '');
    initValue = $.trim(initValue.replace(/(\r\n|\n|\r)/gm, '').replace(/\s\s+/g, ''));

    if (ref === initValue) {
      return '';
    } else {
      return ref;
    }
  };

  const validate = (type: string) => {
    let docHeader = compareBeforeSendData(valProjHeader, pssInitValueEnum.docHeader);
    let docInformation = compareBeforeSendData(valDocInformation, InitPlaceHolderDocInformation(pss));
    let docControl = compareBeforeSendData(valDocControl, pssInitValueEnum.docControl);
    let distributionList = compareBeforeSendData(valDistributionList, pssInitValueEnum.distributionList);

    let projScope = compareBeforeSendData(valProjScope, pssInitValueEnum.projectScope);
    let projDeliverables = compareBeforeSendData(valDeliverables, pssInitValueEnum.projectDeliverables);
    let projScopeOfWork = compareBeforeSendData(valScopeWork, pssInitValueEnum.scopeOfWork);
    let projOrganization = compareBeforeSendData(valOrganization, pssInitValueEnum.projectOrganization);
    let projTimeline = compareBeforeSendData(valTimeline, pssInitValueEnum.projectTimeline);
    let projAcceptance = compareBeforeSendData(valAccCriteria, pssInitValueEnum.projectAcceptance);
    let projExclusion = compareBeforeSendData(valExclusion, pssInitValueEnum.projectExclusion);
    let projConstraint = compareBeforeSendData(valConstrain, pssInitValueEnum.projectConstraint);
    let projAssumption = compareBeforeSendData(valAssumption, pssInitValueEnum.assumption);
    let projRisk = compareBeforeSendData(valRisk, pssInitValueEnum.risk);
    let projApproval = compareBeforeSendData(valSignature, pssInitValueEnum.projectApproval);

    const validatePlaceHolder = () => {
      setIsPlaceHolder({
        ...isPlaceHolder,
        docHeader: !docHeader ? true : false,
        docInformation: !docInformation ? true : false,

        docControl: (currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') && !docControl ? true : false,
        distributionList:
          (currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') && !distributionList ? true : false,

        projScope: (currentUser.role === 'Sales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projScope ? true : false,
        projDeliverables:
          (currentUser.role === 'Sales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projDeliverables ? true : false,
        projScopeOfWork:
          (currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projScopeOfWork ? true : false,
        projOrganization:
          (currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projOrganization ? true : false,
        projTimeline:
          (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
          !projTimeline
            ? true
            : false,
        projAcceptance:
          (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
          !projAcceptance
            ? true
            : false,
        projExclusion:
          (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
          !projExclusion
            ? true
            : false,
        projConstraint:
          (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
          !projConstraint
            ? true
            : false,
        projAssumption:
          (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
          !projAssumption
            ? true
            : false,
        projRisk:
          (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projRisk
            ? true
            : false,
      });
    };

    if (
      !valProjHeader ||
      !valDocInformation ||
      ((currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') && (!valDocControl || !valDistributionList)) ||
      ((currentUser.role === 'Sales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && (!valProjScope || !valDeliverables)) ||
      ((currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && (!valScopeWork || !valOrganization)) ||
      ((currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
        (!valTimeline || !valAccCriteria || !valExclusion || !valConstrain || !valAssumption || !valRisk))
    ) {
      setIsSave(true);
    } else {
      setIsSave(false);
    }

    if (type === 'onChange') {
      if (clickBtnEdit) {
        // validatePlaceHolder();
      }
    }

    if (type === 'save') {
      // validatePlaceHolder();
      setClickBtnEdit(true);
      return {
        docHeader,
        docInformation,
        docControl,
        distributionList,
        projScope,
        projDeliverables,
        projScopeOfWork,
        projOrganization,
        projTimeline,
        projAcceptance,
        projExclusion,
        projConstraint,
        projAssumption,
        projRisk,
        projApproval,
        validate: {
          projScope: (currentUser.role === 'Sales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projScope ? true : false,
          projDeliverables:
            (currentUser.role === 'Sales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projDeliverables ? true : false,
          projScopeOfWork:
            (currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projScopeOfWork ? true : false,
          projOrganization:
            (currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') && !projOrganization ? true : false,
          projTimeline:
            (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
            !projTimeline
              ? true
              : false,
          projAcceptance:
            (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
            !projAcceptance
              ? true
              : false,
          projExclusion:
            (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
            !projExclusion
              ? true
              : false,
          projConstraint:
            (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
            !projConstraint
              ? true
              : false,
          projAssumption:
            (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
            !projAssumption
              ? true
              : false,
          projRisk:
            (currentUser.role === 'Sales' || currentUser.role === 'Presales' || currentUser.role === 'PMO' || currentUser.role === 'PMOS') &&
            !projRisk
              ? true
              : false,
        },
      };
    }
  };

  const onSubmitHandler = () => {
    const values = validate('save');

    if (
      valDocControl &&
      valDistributionList &&
      valProjScope &&
      valDeliverables &&
      valScopeWork &&
      valOrganization &&
      valTimeline &&
      valAccCriteria &&
      valExclusion &&
      valConstrain &&
      valAssumption &&
      valRisk &&
      valSignature

      // !values.validate.projScope &&
      // !values.validate.projDeliverables &&
      // !values.validate.projScopeOfWork &&
      // !values.validate.projOrganization &&
      // !values.validate.projTimeline &&
      // !values.validate.projAcceptance &&
      // !values.validate.projExclusion &&
      // !values.validate.projConstraint &&
      // !values.validate.projAssumption &&
      // !values.validate.projRisk
    ) {
      const formData = new FormData();
      formData.append(`ProjectId`, `${+state.projectId}`);
      formData.append(`FunnelGenId`, `${+funnelGenId}`);

      formData.append(
        `DocumentHeader`,
        currentUser.role === 'PMO' || currentUser.role === 'PMOS' ? (values.docHeader ? values.docHeader : null) : ''
      );

      formData.append(
        `DocumentInformation`,
        currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO'
          ? values.docInformation
            ? values.docInformation
            : null
          : ''
      );
      formData.append(`DocumentControl`, values.docControl);
      formData.append(`DistributionList`, values.distributionList);

      formData.append(`ProjectScopeStatement`, values.projScope);
      formData.append(`ProjectDeliverables`, values.projDeliverables);
      formData.append(`ScopeOfWork`, values.projScopeOfWork);
      formData.append(`ProjectOrganization`, values.projOrganization);
      formData.append(`ProjectTimeline`, values.projTimeline);
      formData.append(`ProjectAcceptance`, values.projAcceptance);
      formData.append(`ProjectExclusion`, values.projExclusion);
      formData.append(`ProjectConstraint`, values.projConstraint);
      formData.append(`Assumption`, values.projAssumption);
      formData.append(`Risk`, values.projRisk);
      formData.append(`ProjectApproval`, values.projApproval);
      formData.append(`Role`, `${currentUser.role}`);

      if (pssLastFirst?.versionNumber) {
        if (+pssLastFirst?.projectId === +state.projectId) {
          formData.append(`PssDocumentId`, `${pssLastFirst.pssDocumentId}`);
          formData.append(`ModifyDate`, `${moment().format('yyyy-MM-DD')}`);
          formData.append(`ModifyUserID`, `${currentUser.employeeID}`);
          dispatch(PssActions.reqPutPSS(formData)).then(() => {
            getReloadData();
          });
        } else {
          createDate(formData);
        }
      } else {
        createDate(formData);
      }
    }
  };

  const createDate = (formData: any) => {
    formData.append(`CreateDate`, `${moment().format('yyyy-MM-DD')}`);
    formData.append(`CreateUserID`, `${currentUser.employeeID}`);
    dispatch(PssActions.reqPostPSS(formData)).then(() => {
      getReloadData();
    });
  };

  useEffect(() => {
    if (state.page !== 'funnel-view-edit' && state.page !== 'pss-list' && pssLastFirst?.projectId === 0) {
      if (pssLastFirst.pssDocumentId && pssLastFirst.funnelGenId !== 0) {
        const formData = {
          projectIdFromPmo: +state.projectId,
          latestProjectIdFromFunnelGenId: +pssLastFirst?.projectId,
          funnelGenId: +funnelGenId,
        };

        dispatch(PssActions.reqPutProjectIdByPmo(formData)).then(() => {
          getReloadData();
        });
      }
    }
  }, [pssLastFirst]);

  const getReloadData = () => {
    dispatch(PssActions.reqGetPSSLatest(+state.funnelGenID));
    setDisableComponent(true);
  };

  return (
    <Fragment>
      <Grid.Column width={10}>
        {+pssLastFirst.versionNumber !== 0 && (
          <Header as="h5" className={classes.LabelHistory}>
            <Icon disabled name="history" style={{ fontSize: 12 }} /> Last Update On&nbsp;
            <span className=" bold-7"> {pssLastFirst.modifyDate && moment(pssLastFirst.modifyDate).format('DD MMM YYYY HH:mm')}</span>
            <Icon disabled name="user" className="ml-20" style={{ fontSize: 12 }} /> By.&nbsp;
            <span className=" bold-7">{+pssLastFirst.versionNumber === 1 ? pssLastFirst.createUserName : pssLastFirst.modifyUserName}</span>
          </Header>
        )}

        <LoadingIndicator isActive={isRequesting}>
          <Card centered raised fluid>
            <CardEditor
              title={'PROJECT SCOPE STATEMENT'}
              value={valProjHeader}
              editRef={projHeaderRef}
              height={'22vh'}
              handleUploadImage={example_image_upload_handler}
              readonly={isDisable || disableComponent}
              onEditorChange={(e) => {
                setValPojHeader(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
              className={!valProjHeader ? { class: classes.ErrorSection, errMsg: 'Document Header is Required! ' } : ''}
            />

            <CardEditor
              value={valDocInformation}
              editRef={docInformationRef}
              height={'50vh'}
              handleUploadImage={example_image_upload_handler}
              onEditorChange={(e) => {
                setDocInformation(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
              readonly={isDisable || disableComponent || (currentUser.role !== 'PMO' && currentUser.role !== 'PMOS' && currentUser.role !== 'SMO')}
              id={'DocumentInformation'}
              className={!valDocInformation ? { class: classes.ErrorSection, errMsg: 'Document Information is Required! ' } : ''}
            />

            <CardEditor
              // title={'Document Control'}
              value={valDocControl}
              editRef={docControlRef}
              handleUploadImage={example_image_upload_handler}
              onEditorChange={(e) => {
                setDocControl(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
              readonly={isDisable || disableComponent || (currentUser.role !== 'PMO' && currentUser.role !== 'PMOS' && currentUser.role !== 'SMO')}
              id={'DocumentControl'}
              className={!valDocControl ? { class: classes.ErrorSection, errMsg: 'Document Control is Required! ' } : ''}
            />

            <CardEditor
              // title={'Distribution List'}
              value={valDistributionList}
              editRef={distributionRef}
              handleUploadImage={example_image_upload_handler}
              onEditorChange={(e) => {
                setDistributionList(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
              readonly={isDisable || disableComponent || (currentUser.role !== 'PMO' && currentUser.role !== 'PMOS' && currentUser.role !== 'SMO')}
              id={'DistributionList'}
              className={!valDistributionList ? { class: classes.ErrorSection, errMsg: 'Distribution List is Required! ' } : ''}
            />

            <CardEditor
              value={valProjScope}
              editRef={projScopeRef}
              height={400}
              handleUploadImage={example_image_upload_handler}
              readonly={isDisable || disableComponent || (currentUser.role !== 'Sales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')}
              id={'ProjScope'}
              className={!valProjScope ? { class: classes.ErrorSection, errMsg: 'Project Scope Statement is Required! ' } : ''}
              onEditorChange={(e) => {
                setValProjScope(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valDeliverables}
              editRef={deliverablesRef}
              height={400}
              handleUploadImage={example_image_upload_handler}
              readonly={isDisable || disableComponent || (currentUser.role !== 'Sales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')}
              id={'Deliverables'}
              className={!valDeliverables ? { class: classes.ErrorSection, errMsg: 'Project Deliverables is Required! ' } : ''}
              onEditorChange={(e) => {
                setValDeliverables(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valScopeWork}
              editRef={scopeWorkRef}
              height={400}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable || disableComponent || (currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'ScopeWork'}
              className={!valScopeWork ? { class: classes.ErrorSection, errMsg: 'Scope of Work is Required! ' } : ''}
              onEditorChange={(e) => {
                setValScopeWork(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valOrganization}
              editRef={organizationRef}
              height={550}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable || disableComponent || (currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'Organization'}
              className={
                !valOrganization ? { class: classes.ErrorSection, errMsg: 'Project Organization and Resource Composition is Required! ' } : ''
              }
              onEditorChange={(e) => {
                setValOrganization(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valTimeline}
              editRef={timelineRef}
              height={360}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable ||
                disableComponent ||
                (currentUser.role !== 'Sales' && currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'Timeline'}
              className={!valTimeline ? { class: classes.ErrorSection, errMsg: 'Project Timeline is Required! ' } : ''}
              onEditorChange={(e) => {
                setValTimeLine(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valAccCriteria}
              editRef={accCriteriaRef}
              height={360}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable ||
                disableComponent ||
                (currentUser.role !== 'Sales' && currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'AccCriteria'}
              className={!valAccCriteria ? { class: classes.ErrorSection, errMsg: 'Project Acceptance Criteria is Required! ' } : ''}
              onEditorChange={(e) => {
                setValAccCriteria(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valExclusion}
              editRef={exclusionRef}
              height={360}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable ||
                disableComponent ||
                (currentUser.role !== 'Sales' && currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'Exclusion'}
              className={!valExclusion ? { class: classes.ErrorSection, errMsg: 'Project Exclusion is Required! ' } : ''}
              onEditorChange={(e) => {
                setValExclusion(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valConstrain}
              editRef={constrainRef}
              height={360}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable ||
                disableComponent ||
                (currentUser.role !== 'Sales' && currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'Constrain'}
              className={!valConstrain ? { class: classes.ErrorSection, errMsg: 'Project Constraints is Required! ' } : ''}
              onEditorChange={(e) => {
                setValConstrain(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valAssumption}
              editRef={assumptionRef}
              height={360}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable ||
                disableComponent ||
                (currentUser.role !== 'Sales' && currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'Assumption'}
              className={!valAssumption ? { class: classes.ErrorSection, errMsg: 'Assumption is Required! ' } : ''}
              onEditorChange={(e) => {
                setValAssumption(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valRisk}
              editRef={riskRef}
              height={360}
              handleUploadImage={example_image_upload_handler}
              readonly={
                isDisable ||
                disableComponent ||
                (currentUser.role !== 'Sales' && currentUser.role !== 'Presales' && currentUser.role !== 'PMO' && currentUser.role !== 'PMOS')
              }
              id={'Risk'}
              className={!valRisk ? { class: classes.ErrorSection, errMsg: 'Risk is Required! ' } : ''}
              onEditorChange={(e) => {
                setValRisk(e);
                validate('onChange');
              }}
              handleLoadContent={setDisable}
            />
            <CardEditor
              value={valSignature}
              editRef={signatureRef}
              height={400}
              handleUploadImage={example_image_upload_handler}
              readonly={false}
              id={'Signature'}
              onEditorChange={(e) => setValSignature(e)}
              handleLoadContent={setDisable}
            />
          </Card>
        </LoadingIndicator>
      </Grid.Column>

      <Grid.Column width={1}>
        <Segment className={classes.StikyCard} textAlign="center">
          {disableComponent && (
            <ToolTips
              content={'Edit Project Scope Statement'}
              trigger={
                <Button
                  className="mb-1"
                  circular
                  color="red"
                  icon="edit outline"
                  disabled={isDisable || isRequesting || (+state.projectId && statusProject === 'void')}
                  loading={isDisable || isRequesting}
                  onClick={() => {
                    onClickIsEdit();
                    setDisableComponent(false);
                  }}
                />
              }
            />
          )}

          {!disableComponent && (
            <ToolTips
              content="Save Project Scope Statement"
              trigger={
                <Button
                  className="mb-1"
                  circular
                  color="yellow"
                  icon="save"
                  disabled={
                    isDisable || isRequesting || isSave
                    // ||
                    // isPlaceHolder.docControl || // mandatory if section is template *don't forget to add every section in classname
                    // isPlaceHolder.distributionList ||
                    // isPlaceHolder.projScope ||
                    // isPlaceHolder.projDeliverables ||
                    // isPlaceHolder.projScopeOfWork ||
                    // isPlaceHolder.projOrganization ||
                    // isPlaceHolder.projTimeline ||
                    // isPlaceHolder.projAcceptance ||
                    // isPlaceHolder.projExclusion ||
                    // isPlaceHolder.projConstraint ||
                    // isPlaceHolder.projAssumption ||
                    // isPlaceHolder.projRisk
                  }
                  loading={isDisable || isRequesting}
                  onClick={onSubmitHandler}
                />
              }
            />
          )}
          {!disableComponent && (
            <ToolTips
              content="Cancel"
              trigger={
                <Button
                  className="mb-1"
                  circular
                  color="green"
                  icon="close"
                  disabled={isDisable || isRequesting}
                  loading={isDisable || isRequesting}
                  onClick={() => {
                    getReloadData();
                    onClickCancel();
                  }}
                />
              }
            />
          )}

          {disableComponent && (
            <>
              <ToolTips
                content="History Project Scope Statement"
                trigger={
                  <Button
                    className="mb-1"
                    circular
                    color="green"
                    icon="history"
                    disabled={isDisable || isRequesting}
                    loading={isDisable || isRequesting}
                    onClick={() => dispatch(ModalFirstActions.OPEN(<PSSHitory projectId={+state.projectId} />, ModalSizeEnum.Large))}
                  />
                }
              />

              <ToolTips
                content="Print Preview Project Scope Statement"
                trigger={
                  <Button
                    circular
                    color="blue"
                    icon="print"
                    disabled={isDisable || isRequesting}
                    loading={isDisable || isRequesting}
                    onClick={() =>
                      dispatch(
                        ModalFirstActions.OPEN(
                          <PrintPSS
                            content={{
                              valProjHeader: valProjHeader,
                              valDocInformation: valDocInformation,
                              valDocControl: valDocControl,
                              valDistributionList: valDistributionList,
                              valProjScope: valProjScope,
                              valDeliverables: valDeliverables,
                              valScopeWork: valScopeWork,
                              valOrganization: valOrganization,
                              valTimeline: valTimeline,
                              valAccCriteria: valAccCriteria,
                              valExclusion: valExclusion,
                              valConstrain: valConstrain,
                              valAssumption: valAssumption,
                              valRisk: valRisk,
                              valSignature: valSignature,
                            }}
                          />,
                          ModalSizeEnum.Large
                        )
                      )
                    }
                  />
                }
              />
            </>
          )}
        </Segment>
      </Grid.Column>
    </Fragment>
  );
};

export default IndexForm;
