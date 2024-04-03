import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Button,
  SearchInput,
  TextAreaInput,
  TextInput,
} from "views/components/UI";

interface IData {
  id: any;
  address: string;
  officeNumber: string;
  phoneNumber: string;
  alternateNumber: string;
  faxNumber: string;
}

interface IProps {
  data?: IData;
  isView?: boolean;
}

const ModalNewCustomerAddress: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { data, isView } = props;

  const onSubmitNewAddress = async (values) => {
    console.log(values);
  };

  // city
  // const [city, setCity] = useState("");
  // const [cityData, setCityData] = useState("");

  // const cities = [
  //   {
  //     key: "Jakarta",
  //     title: "Jakarta",
  //   },
  //   {
  //     key: "Bandung",
  //     title: "Bandung",
  //   },
  // ];

  // const [filteredCities, setFilteredCities] = useState(cities);

  // const handleSearchChangeCity = useCallback(
  //   (data) => {
  //     setCity(data);
  //     if (data.length >= 0) {
  //       // dispatch(CustomerSetting.requestCustomerDataByName(data));
  //       // search data
  //       let filter = cities.filter((city) =>
  //         city.key.toLowerCase().includes(data.toLowerCase())
  //       );
  //       setFilteredCities(filter);
  //     } else if (data.length == 0) {
  //       setCity(undefined);
  //       setFilteredCities(cities);
  //     }
  //   },
  //   [dispatch]
  // );

  // const onResultSelectCity = async (data: any) => {
  //   setCity(data.result.key);
  //   setCityData(data.result);
  // };

  // // district
  // const [district, setDistrict] = useState("");
  // const [districtData, setDistrictData] = useState("");

  // const districts = [
  //   {
  //     key: "Gambir",
  //     title: "Gambir",
  //   },
  //   {
  //     key: "Tanah Abang",
  //     title: "Tanah Abang",
  //   },
  // ];

  // const [filteredDistricts, setFilteredDistricts] = useState(districts);

  // const handleSearchChangeDistrict = useCallback(
  //   (data) => {
  //     setDistrict(data);
  //     if (data.length >= 0) {
  //       // dispatch(CustomerSetting.requestCustomerDataByName(data));
  //       // search data
  //       let filter = districts.filter((district) =>
  //         district.key.toLowerCase().includes(data.toLowerCase())
  //       );
  //       setFilteredDistricts(filter);
  //     } else if (data.length == 0) {
  //       setDistrict(undefined);
  //       setFilteredDistricts(districts);
  //     }
  //   },
  //   [dispatch]
  // );

  // const onResultSelectDistrict = async (data: any) => {
  //   setDistrict(data.result.key);
  //   setDistrictData(data.result);
  // };

  const cancelClick = () => {
    if (isView) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else {
      dispatch(ModalAction.CLOSE());
    }
  };

  return (
    <Fragment>
      <p className="title-paragraph">ADD NEW CUSTOMER ADDRESS</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitNewAddress(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            {/* <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "1rem" }}>
                <Field
                  name="city"
                  component={SearchInput}
                  placeholder="Type city here.."
                  labelName="City"
                  handleSearchChange={handleSearchChangeCity}
                  onResultSelect={onResultSelectCity}
                  results={filteredCities}
                  values={city}
                  mandatory={true}
                />
              </div>

              <Field
                name="district"
                component={SearchInput}
                placeholder="Type district here.."
                labelName="District"
                handleSearchChange={handleSearchChangeDistrict}
                onResultSelect={onResultSelectDistrict}
                results={filteredDistricts}
                values={district}
                mandatory={true}
              />
            </div> */}

            <div style={{ margin: "1rem 0" }}>
              <Field
                name="fullAddress"
                component={TextAreaInput}
                placeholder="Type full address here.."
                labelName="Full Address"
                mandatory={true}
                defaultValue={data?.address || null}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Field
                name="phoneNumber"
                component={TextInput}
                labelName="Phone Number"
                placeholder="Type phone number here.."
                mandatory={true}
                defaultValue={data?.phoneNumber || null}
              />
              <Field
                name="alternateNumber"
                component={TextInput}
                labelName="Alternate Number"
                placeholder="Type alternate number here.."
                mandatory={true}
                defaultValue={data?.alternateNumber || null}
              />
              <Field
                name="faxNumber"
                component={TextInput}
                labelName="Fax Number"
                placeholder="Type fax number here.."
                mandatory={true}
                defaultValue={data?.faxNumber || null}
              />
            </div>

            <Divider></Divider>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                textAlign="center"
                className="MarBot10"
                type="submit"
                color="blue"
                //   onClick={}
              >
                Submit
              </Button>
              <Button type="button" onClick={cancelClick}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ModalNewCustomerAddress;
