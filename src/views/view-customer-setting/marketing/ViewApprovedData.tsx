import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import "./ModalApprovedData.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Icon, Divider, Form, Button } from "semantic-ui-react";
import IStore from "models/IStore";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput } from "views/components/UI";
import TableCustomerDetail from "./components/table/TableCustomerDetail";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalNewCustomerAddress from "./components/modal/approved-page/ModalNewCustomerAddress";
import ModalNewWebsiteMedia from "./components/modal/approved-page/ModalNewWebsiteMedia";
import ModalNewPIC from "./components/modal/approved-page/ModalNewPIC";
import ModalNewRelatedCustomer from "./components/modal/approved-page/ModalNewRelatedCustomer";
import BaseViewApprovedData from "./components/view/BaseViewApprovedData";

interface IProps {
  isView?: boolean;
}

const ViewApprovedData: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { isView } = props;

  const customer = {
    customerID: 12345,
    titleCustomer: "PT",
    customerName: "Biffco Manufacturing",
    requestor: "Rosa Amalia",
    createDate: "02 January 2024",
    industryClass: "Manufacturing",
  };

  // edit view
  const [editView, setEditView] = useState(false);

  // industry classification
  const onSubmitIndustryClassification = async (e) => {};
  const [industryClassification, setIndustryClassification] = useState(
    customer.industryClass
  );
  const onChangeIndustryClassification = (data: any) => {
    setIndustryClassification(data);
  };
  const industryClassificationOptions = [
    {
      text: "Manufacturing",
      value: "Manufacturing",
    },
    {
      text: "Industry",
      value: "Industry",
    },
  ];

  // state tabel
  const [openAddressOffice, setOpenAddressOffice] = useState(false);
  const [openWebsiteMedia, setOpenWebsiteMedia] = useState(false);
  const [openPic, setOpenPic] = useState(false);
  const [openRelatedAcc, setOpenRelatedAcc] = useState(false);

  // add new customer address
  const openNewAddress = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewCustomerAddress></ModalNewCustomerAddress>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  // add website or social media
  const openNewWebsiteSocial = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewWebsiteMedia></ModalNewWebsiteMedia>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  // add pic
  const openNewPIC = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewPIC></ModalNewPIC>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  // add related customer
  const openNewRelatedCust = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedCustomer></ModalNewRelatedCustomer>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  let addressOfficeHeader = [
    {
      key: "address",
      header: "Address",
    },
    {
      key: "officeNumber",
      header: "Office Number",
    },
  ];

  let addressOfficeResponse = [
    {
      id: 1,
      address: "Jl. Jenderal Sudirman No. 55",
      phoneNumber: "0123456789",
      alternateNumber: "0987689556",
      faxNumber: " 678990",
    },
    {
      id: 2,
      address: "Jl. Hang Tuah No. 72",
      phoneNumber: "0123456789",
      alternateNumber: "0987689556",
      faxNumber: " 678990",
    },
  ];

  let addressOffice = addressOfficeResponse.map((data) => {
    return {
      id: data.id,
      address: data.address,
      officeNumber: [
        data.phoneNumber,
        data.alternateNumber,
        data.faxNumber,
      ].join(", "),
      phoneNumber: data.phoneNumber,
      alternateNumber: data.alternateNumber,
      faxNumber: data.faxNumber,
    };
  });

  let websiteMediaHeader = [
    {
      key: "type",
      header: "Type",
    },
    {
      key: "name",
      header: "Name",
    },
  ];

  let websiteMedia = [
    {
      type: "Website",
      name: "www.biffco-manufacturing.com",
    },
    {
      type: "Instagram",
      name: "@biffco.manufacturing",
    },
    {
      type: "Facebook",
      name: "Life @ Biffco",
    },
  ];

  let picHeader = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "jabatan",
      header: "Jabatan",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "address",
      header: "Address",
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
    },
  ];

  let pic = [
    {
      name: "Paulus Jeharu",
      jabatan: "Business Owner",
      email: "paulus.j@mail.com",
      address: "Jl. Jenderal Sudirman No. 555",
      phoneNumber: "0123456789",
    },
    {
      name: "Paulus Jeharu",
      jabatan: "Business Owner",
      email: "paulus.j@mail.com",
      address: "Jl. Jenderal Sudirman No. 555",
      phoneNumber: "0123456789",
    },
  ];

  let relatedAccountHeader = [
    {
      key: "customerID",
      header: "Customer ID",
    },
    {
      key: "accountName",
      header: "Account Name",
    },
  ];

  let relatedAccount = [
    {
      customerID: 23456,
      accountName: "Biffco Factory LTD.",
    },
    {
      customerID: 23456,
      accountName: "Biffco Factory LTD.",
    },
  ];

  return (
    <Fragment>
      {!isView && (
        <Link to={"/customer-setting"} className="link">
          {"< Back to Customer Setting List"}
        </Link>
      )}

      {!isView ? (
        <div className="form-container">
          <BaseViewApprovedData isView={isView} />
        </div>
      ) : (
        <BaseViewApprovedData isView={isView} />
      )}
    </Fragment>
  );
};

export default ViewApprovedData;
