import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Form, Button, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './SendDocument.scss'
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import { RichTextEditor } from 'views/components/UI';
import RowWorkFlowSendDocument from './ApprovalStepsSendDocument/components/RowWorkFlowSendDocument';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import { selectDocumentTracking, selectWorkFlowHeader } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import SubmitApprovalDocumentModel from 'stores/dedicated-resources/models/SubmitApprovalDocumentModel';
import axios from 'axios';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';



interface IProps {
    contractID: number;
}

const SendDocument: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const WorkFlowHeader = useSelector((state: IStore) => selectWorkFlowHeader(state));
    const DocumentTracking = useSelector((state: IStore) => selectDocumentTracking(state));
    const result: any = useSelector((state: IStore) => state.dedicatedresources.resultActions);
    
    const { contractID } = props;

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };
    const now = moment();
    const [currentDateNow] = useState(moment(now).format('yyyy-MM-DD'));
   
    const onSubmitHandler = (values: any) => {
        const newValues = new SubmitApprovalDocumentModel();
       
        newValues.contractID = contractID;
        newValues.userID = currentUser.employeeID;
        newValues.remarks = values.remarks;
        newValues.process = "APPROVED";
        newValues.userLoginID = currentUser.employeeID;
        newValues.tanggal = null;

        dispatch(DedicatedResourcesActions.requestpostSubmitApprovalDocument(newValues))
        onClose()
    };

    const [typeRadioButton, setTypeRadioButton] = useState("DQ")
    const [validate, setValidate] = useState(false);
    useEffect(() => {
        dispatch(DedicatedResourcesActions.requestGetDocumentTracking(contractID))
    },[])
    useEffect(() => {
        // dispatch(DedicatedResourcesActions.requestWorkFlowHeader(contractID, "RENEWAL CONTRACT DOC"))
        // const GetWorkFlowByID = axios(
        //     `http://bhpapisrvdev.berca.co.id:7000/api/DQGenericService/Worfklow/GetWorkflowID?appsModul=RC&process=RENEWALCONTRACTDOCUMENT&userLogin=${currentUser.userName}&amount=1`,
        //     {
        //       method: "GET",
        //       headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //         "Accept": "application/json",
        //         "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userLogin")).token + ""}`,
        //       }, // default, so we can ignore
        //     }
        //   ).then((response) => {
        //       dispatch(DedicatedResourcesActions.requestWorkFlowHeader(contractID, parseInt(response.data)))
        //   });
        dispatch(DedicatedResourcesActions.requestWorkFlowHeader(contractID, 10065))
    },[])

   

    const isRequesting: boolean = useSelector((state: IStore) =>
        selectRequesting(state, [
            DedicatedResourcesActions.REQUEST_WORK_FLOW_HEADER,
            DedicatedResourcesActions.REQUEST_GET_DOCUMENT_TRACKING
        ])
    );

    useEffect(() => {
        // Check yang Login sesuai dengan Waiting Approval && Check Setelah SubmitApproval Button Disabled
        if(WorkFlowHeader.resultObj?.length > 0)
        {
            if(currentUser.fullName === WorkFlowHeader.resultObj[1]?.employeeName)
            {
                //Cek Approval Login
                if(WorkFlowHeader.resultObj[1].status === "Waiting For Approval"  && currentUser.fullName !== WorkFlowHeader.resultObj[1].employeeName)
                {
                    setValidate(true);
                }
    
                //Setelah Approval ==  Success
                if(WorkFlowHeader.resultObj && WorkFlowHeader.resultObj[1].status === "APPROVED" && currentUser.fullName === WorkFlowHeader.resultObj[1].employeeName)
                {
                    setValidate(true);
                }
            } else {
              setValidate(true);
            }
        }
        
      }, [WorkFlowHeader.resultObj]);
    return (
        <Fragment>
            <LoadingIndicator isActive={isRequesting}>
                <FinalForm
                    onSubmit={(values: any) => onSubmitHandler(values)}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form onSubmit={handleSubmit} loading={isRequesting}>
                            <Grid>
                                <Grid.Row className='TopReturnDocument'>
                                    <Grid.Column textAlign="center">
                                        <p>Send Document</p>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <RowWorkFlowSendDocument item="Service" dataWorflow={WorkFlowHeader.resultObj} />
                                        {/* <ApprovalStepsReceiveDocument funnelGenID={"21"} /> */}
                                    </Grid.Column>
                                </Grid.Row>
                                <Divider />
                                <Grid.Row columns={1} style={{marginLeft:"10px", marginRight:"10px"}}>
                                    <span style={{ color: '#A0A8B3 !important', fontSize: "1.255rem !important;", fontWeight: 600, opacity: 0.4}}>Remark From HR ComBen</span>
                                    <Grid.Column className="FullGrid767 WrappingRemakComben">
                                        <span>
                                            {ReactHtmlParser(DocumentTracking?.remarkHR)}
                                        </span>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row columns={1}>
                                    <Grid.Column className="FullGrid767" >
                                        <Field name="remarks" component={RichTextEditor} placeholder="Please put remark or other notes" labelName="Remark From Sender" />
                                    </Grid.Column>
                                </Grid.Row>


                                <Grid.Row columns={1}>
                                    <Grid.Column className="FullGrid767" style={{ backgroundColor: "#FFD2D2" }}>
                                        <span style={{ color: 'red', fontWeight: 600 }}>Warning!!</span>
                                        <br />
                                        <span style={{ color: 'red' }}>
                                            Makesure that document ready to sent. When you click <span style={{ fontWeight: 600 }}>Send Document</span>, submission status of employee contract renewal will be <span style={{ fontWeight: 600 }}>"Sent to Employee"</span>
                                        </span>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column width={16}>
                                        <Button icon="undo" type="button" floated="right" content="Cancel" onClick={onClose} />
                                        <Button icon="paper plane outline" color="blue" floated="right" content="Send Document" disabled={pristine || invalid || validate} />
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
                        </Form>
                    )}
                />
            </LoadingIndicator>
            
            {/* </Grid> */}
        </Fragment >
    );
};

export default SendDocument;
