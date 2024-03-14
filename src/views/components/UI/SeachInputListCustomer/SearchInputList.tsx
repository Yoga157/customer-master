import "./SearchInputList.scss";
import React, { Fragment, useEffect, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import {
    FormFieldProps,
    Form,
    Label,
    Search,
    Popup,
    Icon,
    List,
    Button,
    Grid
} from "semantic-ui-react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import value from "environment";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {};

/** Abie 10/06/2021 */
const SearchInputList: React.FC<IProps> = ({
    input, 
    width, 
    placeholder, 
    toolTipContents,
    labelName,
    meta: { touched, error },
    mandatory = true, 
    loading = false,
    disabled,
    hidden,
    handleSearchEmployee, 
    resultEmployee, 
    listEmployee,
    disableDelete,
    employeeType
}) => {
    const initialData = [
        {
            value: "",
            text: "",
            empName: "",
            empKey: 0,
            empId: 0,
            divName: "",
            type: "",
        }
    ]

    let [listItemEmployeeIncludeExclude, setListItemEmployeeIncludeExclude] = useState(initialData);
    const [emptyEmployeeIncludeExclude, setEmptyEmployeeIncludeExclude] = useState("" as any);
    
    useEffect(() => {
        setListItemEmployeeIncludeExclude(initialData)
    }, [employeeType]);
    
    const onDeleteEmployeesIncludeExclude = (value: any) => {
        const data = listItemEmployeeIncludeExclude.filter((item: any) => {
            return item.value !== value;
        });
        setListItemEmployeeIncludeExclude(data);
        input.onChange(data);
    };

    return (
        <Form.Field  error={touched && !!error} width={width}>
        <div>
            <label htmlFor={input.name} style={{marginRight: '10px'}}>{labelName}<label hidden={mandatory} style={{color:'red'}}> *</label></label>
            {
                toolTipContents &&
                <Popup
                    trigger={<Icon name='info' color='grey' size='small' circular  /> }
                    hoverable
                    content= {     
                        <div className='ContainerMax200'>
                            <div>
                            {toolTipContents}
                            </div>
                        </div>         
                }
            />}
        </div>
        
        <Search
            loading={loading}
            onResultSelect={(e, data) => {
                // console.log("data SearchInputList: ", data);
                let item = {
                    value: data.result.price,
                    text: data.result.title,
                    empName: data.result.employeeName,
                    empId: data.result.employeeId,
                    empKey: data.result.employeeKey,
                    divName: data.result.divisionName,
                    type: "",
                }
               
                if (employeeType === "exclude")
                {
                    item.type = "exclude"; 
                } else {
                    item.type = "include";
                }
               
                const copyList = [...listItemEmployeeIncludeExclude];
                let exists = copyList.filter(c => c.value === item.value).length
                if (exists === 0) {
                    copyList.push(item);
                    setListItemEmployeeIncludeExclude(copyList)
                    if (item.text !== '') {
                        input.onChange(copyList);
                        setEmptyEmployeeIncludeExclude("")
                    }
                }
            }}
            onSearchChange={(val, data) => {setEmptyEmployeeIncludeExclude(data.value); handleSearchEmployee(val,data)}}
            results={resultEmployee}
            disabled={disabled}
            hidden={hidden}
            value={emptyEmployeeIncludeExclude}
        />

        

        {touched && error && (
            <Label basic color='red'>
                {error}
            </Label>
        )}
        {listItemEmployeeIncludeExclude.length > 0 &&
        <div className='ContainerMax100'>
            <List horizontal size="small" className='LabelUserSrc'>
                {listItemEmployeeIncludeExclude.map((item:any) => (
                    (item.value !== '') &&
                    <List.Item key={item.value}>
                        <List.Content >
                            <Button
                                icon='close'
                                labelPosition='right'
                                size='mini'
                                color="grey"
                                compact
                                floated="right" 
                                type="button"
                                content={item.text}
                                disabled={disableDelete}
                                onClick={() => onDeleteEmployeesIncludeExclude(item.value)}
                            />
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
        }
    </Form.Field>
    );
};

export default SearchInputList;