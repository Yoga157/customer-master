import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, Form, Button, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './ReturnDocument.scss'
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import { DateInput, TextInput, RichTextEditor, SearchInput } from 'views/components/UI';
import RowWorkFlowReceiveDocument from './ApprovalStepsReturnDocument/components/RowWorkFlowReturnDocument';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import { selectWorkFlowHeader } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectEmployeeSearch } from 'selectors/select-options/EmployeeSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { combineValidators, isRequired } from 'revalidate';
import SubmitApprovalDocumentModel from 'stores/dedicated-resources/models/SubmitApprovalDocumentModel';
import axios from 'axios';

interface IProps {
    contractID: number;
}

const ReturnDocument: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const validate = combineValidators({
        ReceivedBy: isRequired('Received By'),
        Tanggal: isRequired('Received Date'),
    });

    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const WorkFlowHeader = useSelector((state: IStore) => selectWorkFlowHeader(state));
    const EmployeStoreSearch = useSelector((state: IStore) => selectEmployeeSearch(state));
    const { contractID } = props;

    const [employeeName, setEmployeeName] = useState("")
    const [employeeId, setEmployeeId] = useState(0)
    const [validates, setValidates] = useState(false);

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };

   
    useEffect(() => {
        // dispatch(DedicatedResourcesActions.requestWorkFlowHeader(contractID, "RENEWAL CONTRACT DOC"))
        // const GetWorkFlowByID = axios(
        //     `http://bhpapisrvdev.berca.co.id:7000/api/DQGenericService/Worfklow/GetWorkflowID?appsModul=RC&process=RENEWALCONTRACTDOCUMENT&userLogin=${currentUser.userName}&amount=1`,
        //     {
        //       method: "GET",
        //       headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //         "Accept": "application/json",
        //         "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userLogin"))?.token + ""}`,
        //       }, // default, so we can ignore
        //     }
        //   ).then((response) => {
        //     //   console.log("res", response)
        //       dispatch(DedicatedResourcesActions.requestWorkFlowHeader(contractID, parseInt(response.data)))
        //   });
        dispatch(DedicatedResourcesActions.requestWorkFlowHeader(contractID, 10065))
    }, [])

    const onSubmitHandler = (values: any) => {
        const newValues = new SubmitApprovalDocumentModel()

        newValues.contractID = contractID;
        newValues.userID = employeeId;
        newValues.remarks = values.remarks;
        newValues.process = "APPROVED";
        newValues.userLoginID = currentUser.employeeID;
        newValues.tanggal = values.Tanggal;

        dispatch(DedicatedResourcesActions.requestpostSubmitApprovalDocument(newValues))
        onClose()

    };
    const [typeRadioButton, setTypeRadioButton] = useState("DQ")

    const isLoadingEmployee: boolean = useSelector((state: IStore) => selectRequesting(state, [
        EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL
    ]));

    const handleSearchChangeReceived = useCallback(
        (data) => {
            setEmployeeName(data);
        },
        [dispatch]
    );

    const onResultSelectReceived = (data: any) => {
        setEmployeeName(data.result.title);
        setEmployeeId(data.result.employeeID);
        // EmployeStoreSearch &&
        //   EmployeStoreSearch.map((item: any) => {
        //     if (item.title === data.result.title) {
        //       setErrorEmployeeName(true);
        //     }
        //   });
    };

    const resultRenderer = ({ image, price, title, valueData, textData, description, flag, id }) => {
        return (
            <div
                key={id}
                className="content"
                style={{
                    backgroundColor: flag === '1' ? 'rgba(255, 248, 54, 0.5)' : '',
                }}
            >
                <div className="price">{price ? price : valueData}</div>
                <div className="title"> {title ? title : textData}</div>
            </div>
        );
    };

    useEffect(() => {
        // Check yang Login sesuai dengan Waiting Approval && Check Setelah SubmitApproval Button Disabled
        if(WorkFlowHeader.resultObj?.length > 0)
        {
            // if(currentUser.fullName === WorkFlowHeader.resultObj[3]?.employeeName)
            // {
            //     //Cek Approval Login
            //     if(WorkFlowHeader.resultObj[3].status === "Waiting For Approval"  && currentUser.fullName !== WorkFlowHeader.resultObj[3].employeeName)
            //     {
            //         setValidates(true);
            //     }
    
            //     //Setelah Approval ==  Success
            //     if(WorkFlowHeader.resultObj && WorkFlowHeader.resultObj[3].status === "APPROVED" && currentUser.fullName === WorkFlowHeader.resultObj[3].employeeName)
            //     {
            //         setValidates(true);
            //     }
            // } else {
            //   setValidates(true);
            // }

           if(WorkFlowHeader.resultObj[3]?.employeeName)
           {
            setValidates(true);
           }
        }
        
      }, [WorkFlowHeader.resultObj]);

    return (
        <Fragment>
            <FinalForm
                validate={validate}
                onSubmit={(values: any) => onSubmitHandler(values)}
                render={({ handleSubmit, invalid, pristine }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid>
                            <Grid.Row className='TopReturnDocument'>
                                <Grid.Column textAlign="center">
                                    <p>Return Document</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <RowWorkFlowReceiveDocument item="Service" dataWorflow={WorkFlowHeader.resultObj} />
                                    {/* <ApprovalStepsReceiveDocument funnelGenID={"21"} /> */}
                                </Grid.Column>
                            </Grid.Row>
                            <Divider />
                            <Grid.Row columns={2}>
                                <Grid.Column className="FullGrid767">
                                    <Field
                                        name="ReceivedBy"
                                        component={SearchInput}
                                        placeholder="e.g.PT. Customer .."
                                        loading={isLoadingEmployee}
                                        labelName="Received By"
                                        handleSearchChange={handleSearchChangeReceived}
                                        onResultSelect={onResultSelectReceived}
                                        results={EmployeStoreSearch}
                                        mandatory={false}
                                        resultRenderer={resultRenderer}
                                        onKeyPress={(event) => {
                                            if (event.charCode == 13) {
                                                event.preventDefault()
                                                dispatch(EmployeeActions.searchALL(employeeName, ''));
                                            }
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <p className="BtmFormNote">Press enter to see the results</p>
                                        {/* {blackListFlagCust && <p className="BlackListText">Black List Customer</p>} */}
                                    </div>
                                </Grid.Column>
                                <Grid.Column className="FullGrid767">
                                    <Field
                                        name="Tanggal"
                                        component={DateInput}
                                        labelName="Receive Date By HR"
                                        placeholder="e.g.10/03/2020"
                                        date={true}
                                        mandatory={false}
                                    // onChange={handleChangeStartDate}
                                    />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={1}>
                                <Grid.Column className="FullGrid767" >
                                    <Field name="remarks" component={RichTextEditor} placeholder="Please put remark or other notes" labelName="Remak" />
                                </Grid.Column>
                            </Grid.Row>


                            <Grid.Row columns={1}>
                                <Grid.Column className="FullGrid767" style={{ backgroundColor: "#FFD2D2" }}>
                                    <span style={{ color: 'red', fontWeight: 600 }}>Warning!!</span>
                                    <br />
                                    <span style={{ color: 'red' }}>
                                        Makesure that you have received the Document. When you click <span style={{ fontWeight: 600 }}>Received</span>, submission status of employee contract renewal will be <span style={{ fontWeight: 600 }}>"Completed"</span>
                                    </span>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row style={{ top: "20px" }}>
                                <Grid.Column width={16}>
                                    <Button icon="undo" type="button" floated="right" content="Cancel" onClick={onClose} />
                                    <Button icon="handshake outline" color="blue" floated="right" content="Return Doc Received" disabled={pristine || invalid || validates} />
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Form>
                )}
            />
            {/* </Grid> */}
        </Fragment >
    );
};

export default ReturnDocument;
