import React, { Fragment, useEffect, useState } from "react";
import {
  Menu,
  Sidebar,
  Icon,
  Divider,
  IconGroup,
  Image,
  Modal,
  Grid,
  Card,
} from "semantic-ui-react";
import classes from "./SidebarNav.module.scss";
import MenuNavLink from "../main-nav/components/MenuNavLink";
import RouteEnum from "constants/RouteEnum";
import "./SidebarNavStyle.scss";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import IStore from "models/IStore";
import { useDispatch, useSelector } from "react-redux";
import { DqAllFeature, Tooltips } from "../UI";
import { useHistory } from "react-router";
import GetAllLocalStorageFunnelFormEdit from "views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/getAllLocalStorageFunnelFormEdit";
import RemoveAllLocalStorageFunnelFormEdit from "views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/removeAllLocalStorageFunnelFormEdit";
import { Dispatch } from "redux";
import { selectEmployeeFreelanceMenuAccess } from "selectors/employee-freelance/EmployeeFreelanceSelector";
import EmployeeFreelanceMenuAccess from "stores/employee-freelance/models/EmployeeFreelanceMenuAccess";
import * as EmployeeFreelanceActions from "stores/employee-freelance/EmployeeFreelanceActions";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectPermission } from "selectors/aws-billing/AWSBillingServiceSelector";
import * as AWSBillingActions from "stores/aws-billing/AWSBillingActions";
import * as ActivityReportGroupingActions from "stores/activity-report-grouping/ActivityReportGroupingActions";
import { selectActivityReportGroupingRoleFlag } from "selectors/activity-report-grouping/ActivityReportGroupingSelector";

interface IProps {
  size: any;
}

const SidebarNav: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [localStoragFunnelFormEdit] = GetAllLocalStorageFunnelFormEdit();
  const [, setClearStorage] = RemoveAllLocalStorageFunnelFormEdit();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const [opens, setOpens] = useState(false);
  const [sizes, setSizes] = useState(undefined);

  const exampleReducer = (size) => {
    setOpens(true);
    setSizes(size);
  };

  const employeeFreelanceMenuAccess: EmployeeFreelanceMenuAccess = useSelector(
    (state: IStore) => state.employeeFreelance.employeeFreelanceMenuAccess
  );
  useEffect(() => {
    if (employeeFreelanceMenuAccess.status === "success") {
      if (employeeFreelanceMenuAccess.email !== "undefined") {
        const emp = new EmployeeFreelanceMenuAccess({});
        emp.email = employeeFreelanceMenuAccess.email;
        emp.isAllowAccess = employeeFreelanceMenuAccess.isAllowAccess;
        dispatch(
          EmployeeFreelanceActions.requestPostEmployeeFreelanceMenuAccessLocal(
            emp
          )
        );
      }
    }
  }, [employeeFreelanceMenuAccess]);

  useEffect(() => {
    dispatch(
      EmployeeFreelanceActions.requestGetEmployeeFreelanceMenuAccessLocal()
    );
    dispatch(AWSBillingActions.requestAWSBillingPermission());
    if (currentUser.employeeID > 0) {
      dispatch(
        ActivityReportGroupingActions.RequestActivityReportGroupingRoleFlag(
          currentUser.employeeID
        )
      );
    }
  }, [dispatch, currentUser?.employeeID]);

  const openSidebarTransparent = () => {
    if (visibleSidebar) setVisibleSidebar(false);
    else setVisibleSidebar(true);
  };

  const handleLeaveFunnelFormEdit = (route) => {
    const isLeave = window.confirm("Are you sure want to discard changes?");
    isLeave && setClearStorage(true);

    isLeave && history.push(route);
  };

  const [validasiPermission, setValidasiPermission] = useState(false);
  const permission = useSelector((state: IStore) => selectPermission(state));
  const RoleFlag = useSelector((state: IStore) =>
    selectActivityReportGroupingRoleFlag(state)
  );

  useEffect(() => {
    permission.map((item) => {
      if (item.text1 === currentUser.userName) {
        setValidasiPermission(true);
      }
    });
  }, [permission, validasiPermission]);
  const HandlePopUp = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <Grid>
          <Grid.Row>
            <Card.Header>
              <h3>CBV MAIN MENU</h3>
            </Card.Header>
          </Grid.Row>
          <Divider className="m-0 mb-2r"></Divider>
          <Grid centered>
            <Grid.Row textAlign="center">
              {validasiPermission === true && (
                <Grid.Column
                  mobile={16}
                  tablet={5}
                  computer={5}
                  className="mb-2r"
                >
                  <Card
                    href={
                      window.location.origin +
                      "/data-quality" +
                      RouteEnum.AWSCredential
                    }
                  >
                    <Image
                      src="/assets/AwsCredentialAll.svg"
                      wrapped
                      ui={false}
                    />
                    <Card.Content>
                      <Card.Header textAlign="center">
                        AWS Credential
                      </Card.Header>
                      <Card.Description textAlign="center">
                        List of AWS Credential
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              )}
              <Grid.Column
                mobile={16}
                tablet={5}
                computer={5}
                className="mb-2r"
              >
                <Card
                  href={
                    window.location.origin +
                    "/data-quality" +
                    RouteEnum.MainCBVService
                  }
                >
                  <Image src="/assets/MainCbvAll.svg" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header textAlign="center">Main CBV</Card.Header>
                    <Card.Description textAlign="center">
                      Main CBV Services
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={5} computer={5}>
                <Card
                  href={
                    window.location.origin +
                    "/data-quality" +
                    RouteEnum.CreditBillingService
                  }
                >
                  <Image src="/assets/AwsBillingAll.svg" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header textAlign="center">AWS Billing</Card.Header>
                    <Card.Description textAlign="center">
                      List of AWS Billing
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid>,
        ModalSizeEnum.Tiny
      )
    );
  };

  const HandlePopUpAR = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <Grid className="display-block">
          <Grid.Row>
            <Card.Header>
              <h3>AR MAIN MENU</h3>
            </Card.Header>
          </Grid.Row>
          <Divider className="m-0 mb-2r"></Divider>
          <Grid centered>
            <Grid.Row textAlign="center">
              <Grid.Column
                mobile={16}
                tablet={5}
                computer={5}
                className="mb-2r"
              >
                <Card
                  href={
                    window.location.origin +
                    "/data-quality" +
                    RouteEnum.ActivityReport
                  }
                >
                  <Image
                    src="/assets/ActivityReportAll.svg"
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header textAlign="center">AR LIST</Card.Header>
                    <Card.Description textAlign="center">
                      Activity Report List
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              {RoleFlag.isSuperior && (
                <Grid.Column
                  mobile={16}
                  tablet={5}
                  computer={5}
                  className="mb-2r"
                >
                  <Card
                    href={
                      window.location.origin +
                      "/data-quality" +
                      RouteEnum.ActivityReportGroupingList
                    }
                  >
                    <Image src="/assets/ArGroupingAll.svg" wrapped ui={false} />
                    <Card.Content>
                      <Card.Header textAlign="center">AR GROUPING</Card.Header>
                      <Card.Description textAlign="center">
                        AR Team Grouping Member
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              )}
              {employeeFreelanceMenuAccess.isAllowAccess === true && (
                <Grid.Column mobile={16} tablet={5} computer={5}>
                  <Card
                    href={
                      window.location.origin +
                      "/data-quality" +
                      RouteEnum.EmployeeFreelance
                    }
                  >
                    <Image src="/assets/FreelanceAll.svg" wrapped ui={false} />
                    <Card.Content>
                      <Card.Header textAlign="center">FREELANCE</Card.Header>
                      <Card.Description textAlign="center">
                        Freelance List
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Grid>,
        ModalSizeEnum.Tiny
      )
    );
  };

  return (
    <Fragment>
      <Sidebar
        as={Menu}
        animation="overlay"
        direction="left"
        icon
        inverted
        vertical
        visible={visibleSidebar}
        width="thin"
        className={classes.SideBarTransparent + "" + " ZeroBorRad  "}
      >
        <Menu.Item
          as={MenuNavLink}
          to={RouteEnum.Dashboard}
          header
          className={classes.SidebarMenu}
        >
          <Image src="/assets/logo.png" style={{ width: "29px" }} />
        </Menu.Item>
        <Menu.Item className={classes.SidebarMenu + "" + " HeaderNavPad "}>
          <Icon size="small" />
        </Menu.Item>
        {/* <Menu.Item className={classes.SidebarMenu}>
                <IconGroup>
                    User Profile
                </IconGroup>     
            </Menu.Item>
            <Menu.Item className={classes.SidebarMenu}>
                <IconGroup >
                    Setting
                </IconGroup>     
            </Menu.Item>
            <Menu.Item className={classes.SidebarMenu}>
                <IconGroup >
                    Notifications
                </IconGroup>     
            </Menu.Item>
            */}
        <Menu.Item
          className={classes.SidebarMenu2}
          onClick={() => exampleReducer("fullscreen")}
        >
          <IconGroup>All Feature</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.Delegation);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.Delegation}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Delegation</IconGroup>
        </Menu.Item>
        {(currentUser.role === "PMO" ||
          currentUser.role === "PMOS" ||
          currentUser.role === "SMO" ||
          currentUser.role === "Presales" ||
          currentUser.role === "Engineer") && (
          <Menu.Item
            onClick={() => {
              localStoragFunnelFormEdit &&
                handleLeaveFunnelFormEdit(RouteEnum.WorkListPage);
            }}
            as={localStoragFunnelFormEdit ? null : MenuNavLink}
            to={RouteEnum.WorkListPage}
            className={classes.SidebarMenu2}
          >
            <IconGroup>Work List</IconGroup>
          </Menu.Item>
        )}
        <Divider />

        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.Funnel);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.Funnel}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Funnel</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.CustomerSetting);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.CustomerSetting}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Brand Model</IconGroup>
        </Menu.Item>
        {(currentUser.role === "Product Manager" ||
          currentUser.role === "Marketing" ||
          currentUser.permission === "FullControl" ||
          currentUser.role === "SuperAdmin") && (
          <Menu.Item
            onClick={() => {
              localStoragFunnelFormEdit &&
                handleLeaveFunnelFormEdit(RouteEnum.FunnelOpportunity);
            }}
            as={localStoragFunnelFormEdit ? null : MenuNavLink}
            to={RouteEnum.FunnelOpportunity}
            className={classes.SidebarMenu2}
          >
            <IconGroup>Event/Product Management Generated Funnel</IconGroup>
          </Menu.Item>
        )}
        {(currentUser.role === "Presales" ||
          currentUser.permission === "FullControl" ||
          currentUser.role === "SuperAdmin") && (
          <Menu.Item
            onClick={() => {
              localStoragFunnelFormEdit &&
                handleLeaveFunnelFormEdit(RouteEnum.ServiceCatalog);
            }}
            as={localStoragFunnelFormEdit ? null : MenuNavLink}
            to={RouteEnum.ServiceCatalog}
            className={classes.SidebarMenu2}
          >
            <IconGroup>Service Catalog</IconGroup>
          </Menu.Item>
        )}
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.BrandModel);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.BrandModel}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Brand Model</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.Software);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.Software}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Software Tools</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.GeneratedForm);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.GeneratedForm}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Letter</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.BankGaransi);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.BankGaransi}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Bank Guarantee</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.CustomerCreditService);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.CustomerCreditService}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Customer Credit Service</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.ReportManager);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.ReportManager}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Management Reports</IconGroup>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.Kpi);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.Kpi}
          className={classes.SidebarMenu2}
        >
          <IconGroup>KPI</IconGroup>
        </Menu.Item>
        {(currentUser.role === "PMO" ||
          currentUser.role === "PMOS" ||
          currentUser.role === "SMO") && (
          <Menu.Item
            onClick={() => {
              localStoragFunnelFormEdit &&
                handleLeaveFunnelFormEdit(RouteEnum.Pmo);
            }}
            as={localStoragFunnelFormEdit ? null : MenuNavLink}
            to={RouteEnum.Pmo}
            className={classes.SidebarMenu2}
          >
            <IconGroup>PMO</IconGroup>
          </Menu.Item>
        )}

        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.ConfigItems);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.ConfigItems}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Config Items</IconGroup>
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.TicketListAll);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.TicketListAll}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Ticket List</IconGroup>
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.ActivityReport);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.ActivityReport}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Activity Report</IconGroup>
        </Menu.Item>
        {employeeFreelanceMenuAccess.isAllowAccess === true && (
          <Menu.Item
            onClick={() => {
              localStoragFunnelFormEdit &&
                handleLeaveFunnelFormEdit(RouteEnum.EmployeeFreelance);
            }}
            as={localStoragFunnelFormEdit ? null : MenuNavLink}
            to={RouteEnum.EmployeeFreelance}
            className={classes.SidebarMenu2}
          >
            <IconGroup>Employee Freelance</IconGroup>
          </Menu.Item>
        )}
      </Sidebar>

      <Sidebar
        as={Menu}
        animation="overlay"
        icon
        inverted
        vertical
        visible={true}
        width="very thin"
        className={
          classes.SideBar + "" + " SideBarDq " + "" + " OverlayHide-y "
        }
      >
        <Menu.Item
          className={" SidebarLogo " + "" + classes.NoBorderMenu}
          onClick={() => {
            localStoragFunnelFormEdit &&
              handleLeaveFunnelFormEdit(RouteEnum.Dashboard);
          }}
          as={localStoragFunnelFormEdit ? null : MenuNavLink}
          to={RouteEnum.Dashboard}
          header
        >
          <Image src="/assets/logo.png" size="mini" />
        </Menu.Item>
        <Menu.Item
          className={" SideBarClose " + "" + classes.NoBorderMenu}
          icon="ellipsis vertical"
          onClick={openSidebarTransparent}
        />
        {/* <Menu.Item className={classes.NoBorderMenu} icon='user' />
            <Menu.Item className={classes.NoBorderMenu} icon='setting' />
            <Menu.Item className={classes.NoBorderMenu} icon='bell' />
            */}
        <Tooltips
          content="All DQ Feature"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => exampleReducer("fullscreen")}
            >
              <Image src="/assets/All-DQ.svg" size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          content="Delegation"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.Delegation);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.Delegation}
            >
              <Image src="/assets/Delegated.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />

        {(currentUser.role === "PMO" ||
          currentUser.role === "PMOS" ||
          currentUser.role === "SMO" ||
          currentUser.role === "Presales" ||
          currentUser.role === "Engineer") && (
          <Tooltips
            content="Work List"
            trigger={
              <Menu.Item
                className={classes.NoBorderMenu + "" + " BlueIcon "}
                onClick={() => {
                  localStoragFunnelFormEdit &&
                    handleLeaveFunnelFormEdit(RouteEnum.WorkListPage);
                }}
                as={localStoragFunnelFormEdit ? null : MenuNavLink}
                to={RouteEnum.WorkListPage}
              >
                <Image src="/assets/WorkList.svg " size="mini" />
              </Menu.Item>
            }
            position="left center"
          />
        )}

        <Divider />

        <Tooltips
          content="Funnel List"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.Funnel);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.Funnel}
            >
              <Image src="/assets/FunnelDqIc.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip2"
          content="Customer Setting"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.CustomerSetting);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.CustomerSetting}
            >
              <Image src="/assets/Opportunity-Dq.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        {(currentUser.role === "Marketing" ||
          currentUser.role === "Product Manager" ||
          currentUser.permission === "FullControl" ||
          currentUser.role === "SuperAdmin") && (
          <Tooltips
            className="leftToolTip"
            content="Event/Product Management Generated Funnel"
            trigger={
              <Menu.Item
                className={classes.NoBorderMenu + "" + " BlueIcon "}
                onClick={() => {
                  localStoragFunnelFormEdit &&
                    handleLeaveFunnelFormEdit(RouteEnum.FunnelOpportunity);
                }}
                as={localStoragFunnelFormEdit ? null : MenuNavLink}
                to={RouteEnum.FunnelOpportunity}
              >
                <Image src="/assets/Opportunity-Dq.svg " size="mini" />
              </Menu.Item>
            }
            position="left center"
          />
        )}
        {(currentUser.role === "Presales" ||
          currentUser.permission === "FullControl" ||
          currentUser.role === "SuperAdmin") && (
          <Tooltips
            content="Serv. Catalog"
            trigger={
              <Menu.Item
                className={classes.NoBorderMenu + "" + " BlueIcon "}
                onClick={() => {
                  localStoragFunnelFormEdit &&
                    handleLeaveFunnelFormEdit(RouteEnum.ServiceCatalog);
                }}
                as={localStoragFunnelFormEdit ? null : MenuNavLink}
                to={RouteEnum.ServiceCatalog}
              >
                <Image src="/assets/ServiceCalalogDqIc.svg " size="mini" />
              </Menu.Item>
            }
            position="left center"
          />
        )}
        <Tooltips
          className="leftToolTip4"
          content="Brand Model"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.BrandModel);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.BrandModel}
            >
              <Image src="/assets/BrandModelDqIc.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip2"
          content="CBV Main Menu"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => HandlePopUp()}
              // as={localStoragFunnelFormEdit ? null : MenuNavLink}
              // to={RouteEnum.AWSCredential}
            >
              <Image src="/assets/CbvAll-DQ.svg" size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip5"
          content="Software Tools"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.Software);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.Software}
            >
              <Image src="/assets/Software-Dq.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />

        <Tooltips
          className="leftToolTip3"
          content="Letter"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.GeneratedForm);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.GeneratedForm}
            >
              <Image src="/assets/Letter-Dq.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip5"
          content="Bank Guarantee"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.BankGaransi);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.BankGaransi}
            >
              <Image src="/assets/BGaransi-Dq.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip2"
          content="Customer Credit Service"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              as={MenuNavLink}
              to={RouteEnum.CustomerCreditService}
            >
              <Image src="/assets/CustomerCreditService.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip2"
          content="Management Reports"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.ReportManager);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.ReportManager}
            >
              <Image src="/assets/ReportsManagement-Dq.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip2"
          content="KPI"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.Kpi);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.Kpi}
            >
              <Image src="/assets/KPI-DQ.svg" size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        {(currentUser.role === "PMO" ||
          currentUser.role === "PMOS" ||
          currentUser.role === "SMO") && (
          <Tooltips
            className="leftToolTip7"
            content="PMO"
            trigger={
              <Menu.Item
                className={classes.NoBorderMenu + "" + " BlueIcon "}
                onClick={() => {
                  localStoragFunnelFormEdit &&
                    handleLeaveFunnelFormEdit(RouteEnum.Pmo);
                }}
                as={localStoragFunnelFormEdit ? null : MenuNavLink}
                to={RouteEnum.Pmo}
              >
                <Image src="/assets/PMO.svg " size="mini" />
              </Menu.Item>
            }
            position="left center"
          />
        )}
        <Tooltips
          className="leftToolTip6"
          content="Config Items"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.ConfigItems);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.ConfigItems}
            >
              <Image src="/assets/ConfigItem.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />

        <Tooltips
          // className="leftToolTip7"
          content="Ticket List"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.TicketListAll);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.TicketListAll}
            >
              <Image src="/assets/Ticket.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip2"
          content="Activity Report"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              // onClick={() => {
              //   localStoragFunnelFormEdit && handleLeaveFunnelFormEdit(RouteEnum.ActivityReport);
              // }}
              onClick={() => HandlePopUpAR()}
              // as={localStoragFunnelFormEdit ? null : MenuNavLink}
              // to={RouteEnum.ActivityReport}
            >
              <Image src="/assets/ActivityReport-DQ.svg" size="mini" />
            </Menu.Item>
          }
          position="left center"
        />

        {employeeFreelanceMenuAccess.isAllowAccess === true && (
          <Tooltips
            className="leftToolTip2"
            content="Employee Freelance"
            trigger={
              <Menu.Item
                className={classes.NoBorderMenu + "" + " BlueIcon "}
                onClick={() => {
                  localStoragFunnelFormEdit &&
                    handleLeaveFunnelFormEdit(RouteEnum.EmployeeFreelance);
                }}
                as={localStoragFunnelFormEdit ? null : MenuNavLink}
                to={RouteEnum.EmployeeFreelance}
              >
                <Image src="/assets/Freelance-DQ.svg" size="mini" />
              </Menu.Item>
            }
            position="left center"
          />
        )}

        <Tooltips
          className="leftToolTip2"
          content="Dedicated Resources"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                localStoragFunnelFormEdit &&
                  handleLeaveFunnelFormEdit(RouteEnum.DedicatedResources);
              }}
              as={localStoragFunnelFormEdit ? null : MenuNavLink}
              to={RouteEnum.DedicatedResources}
            >
              <Image src="/assets/Freelance-DQ.svg" size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
      </Sidebar>
      <Modal
        size={sizes}
        closeIcon
        dimmer={undefined}
        open={opens}
        onClick={() => setOpens(false)}
      >
        <Modal.Header>ALL DQ FEATURE</Modal.Header>
        <Modal.Content>
          <DqAllFeature />
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

export default SidebarNav;
