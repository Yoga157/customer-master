import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Form, Button, Divider, Card } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './TemplateProject.scss'
import * as ModalAction from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput } from 'views/components/UI';
import TemplateProjectTable from './table/TemplateProjectTable';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import { selectOtherBenefitTemplateProject, selectDropDownSalaryBenefitType } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import OtherBenefitTemplateProject from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitTemplateProject';

interface IProps {
    contractID: number;
    setReloadTemp: any;
}

const TemplateProject: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const { contractID, setReloadTemp } = props;

    const OtherBenefitTemplate = useSelector((state: IStore) => selectOtherBenefitTemplateProject(state))
    const SalaryBenefitTypeDropDown = useSelector((state: IStore) => selectDropDownSalaryBenefitType(state));

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };

    const [Temp, setTemp] = useState([])
  
    const onSubmitHandler = (values: any) => {
        // var Array1 = JSON.parse(localStorage.getItem("TempContract"))
        // localStorage.setItem("TempContract", JSON.stringify(Array1?.concat(Temp)));
        localStorage.setItem("TempContract", JSON.stringify(Temp));
        setReloadTemp(true)
        onClose()
    };
   
    useEffect(() => {
        setTemp([])
        const mapping = OtherBenefitTemplate?.map((item, index) => {
            if (item.isSave === 1) {
                setTemp(oldArray => [...oldArray,
                {
                    idState: index + 1,
                    benefitID: 0,
                    contractID: contractID,
                    benefitType: item.benefitType,
                    benefitDesc: item.benefitDesc,
                }
                ]);
            }
        })
    }, [OtherBenefitTemplate])


    const onChangeTemplateName = (event: any) => {
        dispatch(DedicatedResourcesActions.requestOtherTemplateProject(parseInt(event), contractID))
    }

    useEffect(() => {
        dispatch(DedicatedResourcesActions.requestDropdownSalaryBenefitType())
        // dispatch(DedicatedResourcesActions.requestOtherTemplateProject(5257, contractID))
    }, [])

    const isRequesting: boolean = useSelector((state: IStore) =>
        selectRequesting(state, [
            DedicatedResourcesActions.REQUEST_GET_OTHER_TEMPLATE_PROJECT,
            DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE
        ])
    );
   
    return (
        <Fragment>
            <Card.Header>Template Benefit Based on Project</Card.Header>
            <Divider></Divider>
            <LoadingIndicator isActive={isRequesting}>
                <FinalForm
                    onSubmit={(values: any) => onSubmitHandler(values)}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid>

                                <Grid.Row columns={'equal'}>
                                    <Grid.Column width={10} className="FullGrid767">
                                        <Field
                                            name="Type"
                                            component={SelectInput}
                                            options={SalaryBenefitTypeDropDown}
                                            placeholder="e.g.Gaji .."
                                            labelName="Project Template Name"
                                            onChanged={onChangeTemplateName}
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column style={{ top: "20px", padding: 0 }} width={16}>
                                        <TemplateProjectTable Temp={Temp} setTemp={setTemp} tableData={OtherBenefitTemplate} />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column width={16}>
                                        {/* <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid } /> */}
                                        <Button type="button" color='blue' floated="right" content="Apply to New Contract" onClick={onSubmitHandler} />
                                        <Button type="button" floated="right" content="Close" onClick={onClose} />
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
                        </Form>
                    )}
                />
            </LoadingIndicator>
        </Fragment>
    );
};

export default TemplateProject;
