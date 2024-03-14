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

/** Abie 31/05/2021 */
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
    listDivision,
    listDepartment, 
    listFunction,
    handleSearchDivision, 
    handleSearchDepartment,
    handleSearchDepartmentByDivisionId,
    handleSearchFunction,
    resultDivision, 
    resultDepartment,
    resultFunction,
}) => {
    let [listItemDivision, setListItemDivision] = useState([
        {
            value: "",
            text: ""
        }
    ]);
    
    let [listItemDepartment, setListItemDepartment] = useState([
        {
            value: "",
            text: ""
        }
    ]);
    
    let [listItemFunction, setListItemFunction] = useState([
        {
            value: "",
            text: ""
        }
    ]);

    const [emptyDivision, setEmptyDivision] = useState("" as any);
    const [emptyDepartment, setEmptyDepartment] = useState("" as any);
    const [emptyFunction, setEmptyFunction] = useState("" as any);

    const location = useLocation();

    useEffect(() => {
        if (window.location.pathname === "/data-quality/kpi-setting-add-form") {
            localStorage.removeItem("division");
            localStorage.removeItem("department");
            localStorage.removeItem("function");
        } else {
            if (listDivision !== undefined) {
                setListItemDivision(listDivision);
                localStorage.setItem("division", JSON.stringify(listDivision));
            }

            if (listDepartment !== undefined) {
                setListItemDepartment(listDepartment);
                localStorage.setItem("department", JSON.stringify(listDepartment));
            }

            if (listFunction !== undefined) {
                setListItemFunction(listFunction);
                localStorage.setItem("function", JSON.stringify(listFunction));
            }
        }
    }, [listDivision, listDepartment, listFunction]);

    const onDeleteDivision = (value: any) => {
        const data = listItemDivision.filter((item: any) => {
            return item.value !== value;
        });
        setListItemDivision(data);
        input.onChange(data);
        localStorage.setItem("division", JSON.stringify(data));
    };

    const onDeleteDepartment = (value: any) => {
        const data = listItemDepartment.filter((item: any) => {
            return item.value !== value;
        });
        setListItemDepartment(data);
        input.onChange(data);
        localStorage.setItem("department", JSON.stringify(data));
    };

    const onDeleteFunction = (value: any) => {
        const data = listItemFunction.filter((item: any) => {
            return item.value !== value;
        });
        setListItemFunction(data);
        input.onChange(data);
        localStorage.setItem("function", JSON.stringify(data));
    };

    return (
        <>
            {
                disabled
                ? null
                : <Fragment>
                    <Grid.Row columns={3}>
                        <Grid.Column className="ViewLabel SoftwareLabel">
                            <Form.Field error={touched && !!error} width={width}>
                                <div>
                                    <label htmlFor={input.name} style={{ marginRight: "10px" }}>
                                        <Icon name='briefcase' />
                                        Division
                                        <label hidden={mandatory} style={{ color: "red" }}>
                                            {" "}
                                            *
                                        </label>
                                    </label>
                                    {toolTipContents && (
                                        <Popup
                                            trigger={
                                            <Icon name="info" color="grey" size="small" circular />
                                            }
                                            hoverable
                                            content={
                                            <div className="ContainerMax200">
                                                <div>{toolTipContents}</div>
                                            </div>
                                            }
                                        />
                                    )}
                                </div>
                            
                                <Search 
                                    loading={loading}
                                    onResultSelect = {(e, data) => {
                                        let item = {
                                            value: data.result.price,
                                            text: data.result.title
                                        };

                                        const copyList = [...listItemDivision];
                                        let exists = copyList.filter((c) => c.value === item.value).length;
                                        if (exists === 0) {
                                            copyList.push(item);
                                            setListItemDivision(copyList);
                                            if (item.text !== "") {
                                                input.onChange(copyList);
                                                setEmptyDivision("");
                                                localStorage.setItem("division", JSON.stringify(copyList));
                                            }
                                        }
                                    }}
                                    onSearchChange={(val, data) => {
                                        setEmptyDivision(data.value);
                                        handleSearchDivision(val, data);
                                    }}
                                    results={resultDivision}
                                    disabled={disabled}
                                    value={emptyDivision}
                                    hidden={hidden}
                                />
                                
                                {touched && error && (
                                    <Label basic color="red">{error}</Label>
                                )}
                                {/* <p className='BtmFormNote'>Type 2 letters or more</p> */}
                            </Form.Field>
                        </Grid.Column>

                        <Grid.Column className="ViewLabel SoftwareLabel">
                            <Form.Field error={touched && !!error} width={width}>
                                <div>
                                    <label htmlFor={input.name} style={{ marginRight: "10px" }}>
                                        <Icon name='briefcase' />
                                        Department
                                        <label hidden={mandatory} style={{ color: "red" }}>
                                            {" "}
                                            *
                                        </label>
                                    </label>
                                    {toolTipContents && (
                                        <Popup
                                            trigger={
                                            <Icon name="info" color="grey" size="small" circular />
                                            }
                                            hoverable
                                            content={
                                            <div className="ContainerMax200">
                                                <div>{toolTipContents}</div>
                                            </div>
                                            }
                                        />
                                    )}
                                </div>
                            
                                <Search 
                                    loading={loading}
                                    onResultSelect = {(e, data) => {
                                        let item = {
                                            value: data.result.price,
                                            text: data.result.title
                                        };

                                        const copyList = [...listItemDepartment];
                                        let exists = copyList.filter((c) => c.value === item.value).length;
                                        if (exists === 0) {
                                            copyList.push(item);
                                            setListItemDepartment(copyList);
                                            if (item.text !== "") {
                                                input.onChange(copyList);
                                                setEmptyDepartment("");
                                                localStorage.setItem("department", JSON.stringify(copyList));
                                            }
                                        }
                                    }}
                                    onSearchChange={(val, data) => {
                                        setEmptyDepartment(data.value);
                                        
                                        let jsonString = localStorage.getItem("division");

                                        if (jsonString !== null && jsonString !== "[]") {
                                            handleSearchDepartmentByDivisionId(val, data, listItemDivision);
                                        } else {
                                            handleSearchDepartment(val, data);
                                        }
                                        // if (localStorage.getItem("division") === null) {
                                        //     handleSearchDepartment(val, data);
                                        // }
                                        // else if (localStorage.getItem("division") !== null) {
                                        //     handleSearchDepartmentByDivisionId(val, data, listItemDivision);
                                        // }
                                    }}
                                    results={resultDepartment}
                                    disabled={disabled}
                                    value={emptyDepartment}
                                    hidden={hidden}
                                />
                                {touched && error && (
                                    <Label basic color="red">{error}</Label>
                                )}
                            </Form.Field>
                        </Grid.Column>
                        
                        <Grid.Column className="ViewLabel SoftwareLabel">
                            <Form.Field error={touched && !!error} width={width}>
                                <div>
                                    <label htmlFor={input.name} style={{ marginRight: "10px" }}>
                                        <Icon name='briefcase' />
                                        Function
                                        <label hidden={mandatory} style={{ color: "red" }}>
                                            {" "}
                                            *
                                        </label>
                                    </label>
                                    {toolTipContents && (
                                        <Popup
                                            trigger={
                                            <Icon name="info" color="grey" size="small" circular />
                                            }
                                            hoverable
                                            content={
                                            <div className="ContainerMax200">
                                                <div>{toolTipContents}</div>
                                            </div>
                                            }
                                        />
                                    )}
                                </div>
                            
                                <Search 
                                    loading={loading}
                                    onResultSelect = {(e, data) => {
                                        let item = {
                                            value: data.result.price,
                                            text: data.result.title
                                        };

                                        const copyList = [...listItemFunction];
                                        let exists = copyList.filter((c) => c.value === item.value).length;
                                        if (exists === 0) {
                                            copyList.push(item);
                                            setListItemFunction(copyList);
                                            if (item.text !== "") {
                                                input.onChange(copyList);
                                                setEmptyFunction("");
                                                localStorage.setItem("function", JSON.stringify(copyList));
                                            }
                                        }
                                    }}
                                    onSearchChange={(val, data) => {
                                        setEmptyFunction(data.value);
                                        handleSearchFunction(val, data);
                                    }}
                                    results={resultFunction}
                                    disabled={disabled}
                                    value={emptyFunction}
                                    hidden={hidden}
                                />
                                {touched && error && (
                                    <Label basic color="red">{error}</Label>
                                )}
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                </Fragment>
            }
            {
                disabled
                ? <>
                    <Grid.Row>
                        <Grid.Column width={16} className="ViewLabel SoftwareLabel">
                            <List as="ol" celled>
                                <List.Item as="li" value="">
                                    <h4>
                                        <Icon name="briefcase" className="mr-1" />
                                        Division
                                    </h4>
                                    {listDivision != null &&
                                        listDivision((item) => (
                                            <List.Item>
                                                <Button 
                                                    labelPosition="left"
                                                    size="mini"
                                                    color="blue"
                                                    compact
                                                    type="button"
                                                    content={item.text}
                                                />
                                            </List.Item>
                                        ))
                                    }
                                </List.Item>
                            </List>
                            <div className="ui divider FullHdivider mt-2r"></div>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={16} className="ViewLabel SoftwareLabel">
                            <List as="ol" celled>
                                <List.Item as="li" value="">
                                    <h4>
                                        <Icon name="briefcase" className="mr-1" />
                                        Department
                                    </h4>
                                    {listDivision != null &&
                                        listDepartment((item) => (
                                            <List.Item>
                                                <Button 
                                                    labelPosition="left"
                                                    size="mini"
                                                    color="blue"
                                                    compact
                                                    type="button"
                                                    content={item.text}
                                                />
                                            </List.Item>
                                        ))
                                    }
                                </List.Item>
                            </List>
                            <div className="ui divider FullHdivider mt-2r"></div>
                        </Grid.Column>
                    </Grid.Row>
                                        
                    <Grid.Row>
                        <Grid.Column width={16} className="ViewLabel SoftwareLabel">
                            <List as="ol" celled>
                                <List.Item as="li" value="">
                                    <h4>
                                        <Icon name="briefcase" className="mr-1" />
                                        Function
                                    </h4>
                                    {listDivision != null &&
                                        listFunction((item) => (
                                            <List.Item>
                                                <Button 
                                                    labelPosition="left"
                                                    size="mini"
                                                    color="blue"
                                                    compact
                                                    type="button"
                                                    content={item.text}
                                                />
                                            </List.Item>
                                        ))
                                    }
                                </List.Item>
                            </List>
                            <div className="ui divider FullHdivider mt-2r"></div>
                        </Grid.Column>
                    </Grid.Row>
                    <div className="mt-0"></div> 
                </>
                : <>
                    <Grid.Row>
                        <Grid.Column width={16} className="ViewLabel SoftwareLabel">
                            <List as="ol" celled>
                                <List.Item as="li" value="">
                                    <h4>
                                        <Icon name="briefcase" className="mr-1" />
                                        Division
                                    </h4>
                                    {listItemDivision.length > 0 &&
                                        listItemDivision.map((item) => {
                                            if (item.value != "") {
                                                return (
                                                    <List.Item>
                                                        <Button 
                                                            icon="close"
                                                            labelPosition="right"
                                                            size="mini"
                                                            color="red"
                                                            compact
                                                            type="button"
                                                            content={item.text}
                                                            onClick={() => onDeleteDivision(item.value)}
                                                        />
                                                    </List.Item>
                                                );
                                            }
                                        })
                                    }
                                </List.Item>
                            </List>        
                            <div className="ui divider FullHdivider mt-2r"></div>                 
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={16} className="ViewLabel SoftwareLabel">
                            <List as="ol" celled>
                                <List.Item as="li" value="">
                                    <h4>
                                        <Icon name="briefcase" className="mr-1" />
                                        Department
                                    </h4>
                                    {listItemDepartment.length > 0 &&
                                        listItemDepartment.map((item) => {
                                            if (item.value != "") {
                                                return (
                                                    <List.Item>
                                                        <Button 
                                                            icon="close"
                                                            labelPosition="right"
                                                            size="mini"
                                                            color="red"
                                                            compact
                                                            type="button"
                                                            content={item.text}
                                                            onClick={() => onDeleteDepartment(item.value)}
                                                        />
                                                    </List.Item>
                                                );
                                            }
                                        })
                                    }
                                </List.Item>
                            </List>        
                            <div className="ui divider FullHdivider mt-2r"></div>                 
                        </Grid.Column>
                    </Grid.Row>
                   
                    <Grid.Row>
                        <Grid.Column width={16} className="ViewLabel SoftwareLabel">
                            <List as="ol" celled>
                                <List.Item as="li" value="">
                                    <h4>
                                        <Icon name="briefcase" className="mr-1" />
                                        Function
                                    </h4>
                                    {listItemFunction.length > 0 &&
                                        listItemFunction.map((item) => {
                                            if (item.value != "") {
                                                return (
                                                    <List.Item>
                                                        <Button 
                                                            icon="close"
                                                            labelPosition="right"
                                                            size="mini"
                                                            color="red"
                                                            compact
                                                            type="button"
                                                            content={item.text}
                                                            onClick={() => onDeleteFunction(item.value)}
                                                        />
                                                    </List.Item>
                                                );
                                            }
                                        })
                                    }
                                </List.Item>
                            </List>        
                            <div className="ui divider FullHdivider mt-2r"></div>                 
                        </Grid.Column>
                    </Grid.Row>
                    {/* <div className="mt-0"></div>   */}
                </>
            }
        </>
    );
};

export default SearchInputList;