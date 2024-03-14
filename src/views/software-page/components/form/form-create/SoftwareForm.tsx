import React, { useEffect, useState, useCallback } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, DropdownProps } from 'semantic-ui-react';
import { TextInput, SelectInput, Button } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import SoftwareModel from 'stores/software/models/SoftwareModel';
import SoftwareMainModel from 'stores/software/models/SoftwareMainModel';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { combineValidators, isRequired } from 'revalidate';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
//import BrandForm from 'views/brand-model-page/components/form/form-brand/BrandForm';
/* import * as BrandActions from 'stores/brand/BrandAction';
import * as SubBrandActions from 'stores/brand-sub/SubBrandAction';
import EmployeeModel from 'stores/employee/models/EmployeeModel';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import SubBrandModel from 'stores/brand-sub/models/SubBrandModel'; */
import RouteEnum from 'constants/RouteEnum';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { 
    selectSoftwareTypeOptions, 
    selectSubSoftwareTypeOptions, 
    selectSoftwareToolTypeOptions 
} from 'selectors/select-options';
import SoftwareHeaderModel from 'stores/software/models/SoftwareHeaderModel';
import { selectSoftware, selectSoftwareMain } from 'selectors/software/SoftwareSelector';

interface IProps {
  id: number;
  type: string;
}

const validate = combineValidators({
  softwareID: isRequired('Software Type'),
  subSoftwareID: isRequired('Sub Software Type'),
  softwareToolType: isRequired('Software Tool Type'),
  softwareToolName: isRequired('Software Tool Name'),
});

const SoftwareForm:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch:Dispatch = useDispatch();
    const [pageSize] = useState(15)
    const [activePage, setActivePage] = useState(1);
    const [softwareTool, setSoftwareTool] = useState(0)
    const bRefreshPage: boolean = useSelector((state: IStore) => state.software.refreshPage);
    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const {id, type} = props;
    const softwareTypeStore = useSelector((state:IStore) => selectSoftwareTypeOptions(state));
    const subSoftwareTypeStore = useSelector((state:IStore) => selectSubSoftwareTypeOptions(state));
    const softwareToolTypeStore = useSelector((state:IStore) => selectSoftwareToolTypeOptions(state));
    let softwares: SoftwareHeaderModel = useSelector((state: IStore) => selectSoftware(state));
    let softwareMains: SoftwareMainModel = useSelector((state: IStore) => selectSoftwareMain(state));

    useEffect(() => {
        dispatch(SoftwareActions.requestSoftwareType())
        dispatch(SoftwareActions.requestSoftwares(activePage,pageSize))
        dispatch(SoftwareActions.requestSoftwareToolType())
        
    }, []);

  
    
    softwareMains.softwareID = softwares.softwareID;
    softwareMains.subSoftwareID = softwares.subSoftwareID;

    if(type != 'edit')
    {
        softwareMains.softwareToolName = '';
        softwareMains.softwareToolType = NaN;
    }

    const onClose = () => {
        dispatch(ModalAction.CLOSE())
    }
    
    const onSoftwareType = (values: any) => {
        if (typeof values != "string") {
            dispatch(SoftwareActions.requestSubSoftwareType(values))
        }
        
        setSoftwareTool(values)
    }

    const onSubmitHandler = (values:any) =>
    {   
        const newValues = new SoftwareMainModel(values);
        newValues.softwareID = values.subSoftwareID;

        if(type == 'edit')
        {
            newValues.softwareToolID = softwareMains.softwareToolID;
            newValues.modifyUserID = currentUser.employeeID;
            dispatch(SoftwareActions.putSoftware(newValues)).then(() => {
                dispatch(SoftwareActions.requestSoftwares(activePage, pageSize))
                onClose();

            })
        }
        else
        {
            newValues.softwareToolID = 0;
            newValues.createUserID = currentUser.employeeID;
            dispatch(SoftwareActions.postSoftware(newValues)).then(() => {
                dispatch(SoftwareActions.requestSoftwares(activePage, pageSize))
                onClose();
            })
        }
    }


    const onAddSoftwareType = (e: any, data: DropdownProps) => {
        dispatch(SoftwareActions.requestPostSoftwareToolType(String(data.value), currentUser.employeeID))
    }

    const onAddSoftwareSub = (e: any, data: DropdownProps) => {
        dispatch(SoftwareActions.requestPostSoftwareToolSub(softwareTool,String(data.value), currentUser.employeeID))
    }

    let submitting: boolean = useSelector((state: IStore) => selectRequesting(state, [SoftwareActions.POST_SOFTWARE, SoftwareActions.PUT_SOFTWARE]));

    if (bRefreshPage)
    {

        if (submitting) {
            if(softwares.softwareID > 0)
            {
                onClose();
                dispatch(SoftwareActions.requestSoftwareTools(activePage,pageSize,softwares.subSoftwareID));
            }
            else
            {
                dispatch(SoftwareActions.requestSoftwares(activePage, pageSize))
            }
        } else {
            dispatch(SoftwareActions.requestSoftwareType())

            if (softwareTool > 0) {
                dispatch(SoftwareActions.requestSubSoftwareType(softwareTool))

            }
        }
      
    }



    
    
    return(
        <FinalForm
        validate={validate}
        onSubmit={(values:SoftwareMainModel) => onSubmitHandler(values)}
        initialValues={softwareMains}
        render={({
            handleSubmit,
            invalid,
            pristine
        }) => (
            <Form onSubmit={handleSubmit} loading={submitting}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column >
                            <Field
                                name='softwareID'
                                component={SelectInput}
                                options={softwareTypeStore}
                                mandatory={false}
                                placeholder='e.g.Business Software..'
                                labelName='Software Type'
                                onChanged={onSoftwareType}
                                disabled={(type != 'add')?true:false}
                                onAddItems={onAddSoftwareType}
                                allowAdditions={true}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column>
                            <Field
                                name='subSoftwareID'
                                component={SelectInput}
                                options={subSoftwareTypeStore}
                                mandatory={false}
                                placeholder='e.g.Access Management..'
                                labelName='Sub Software Type'
                                disabled={(type != 'add')?true:false}
                                values={softwares.subSoftwareID}
                                allowAdditions={true}
                                onAddItems={onAddSoftwareSub}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column>
                            <Field
                                name='softwareToolType'
                                component={SelectInput}
                                options={softwareToolTypeStore}
                                mandatory={false}
                                placeholder='e.g.Leaders..'
                                labelName='Software Tool Type'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column>
                        <Field
                            name='softwareToolName'
                            component={TextInput}
                            placeholder='e.g.Microsoft ..'
                            labelName='Software Tool Name'
                        />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                            <Grid.Column>
                            <Button 
                                color='blue' 
                                floated="right" 
                                content="Submit" 
                                disabled={pristine || invalid}
                                />
                            <Button 
                                type="button"
                                floated="right" 
                                content="Cancel" 
                                onClick={onClose}
                            />
                            </Grid.Column>
                        </Grid.Row>
                </Grid>
            </Form>
        )}
        />
    );
}

export default SoftwareForm;
