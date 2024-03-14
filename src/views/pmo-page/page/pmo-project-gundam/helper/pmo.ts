import environment from 'environment';
import axios from "axios";

export const getDocumentTypeId = () => {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    var tempData = 0

    axios
      .get(`${environment.api.generic.replace(':controller', 'Udc/GetUdcId?entryKey=DocumentType&text1=Task%20and%20Ticket%20Attachment')}`, {
        headers: {
          Authorization: `Bearer ${userLogin === null ? '' : userLogin.token}`,
        },
      })
      .then((res) => tempData = res.data)
      .catch((err) => console.log(err));

      return tempData
  };


  export const getEmailList = (emp,employeeFixAll) => {
    let listEmail = [];
    if (emp) {
      emp.map((item) => {
        employeeFixAll.map((e) => {
          if (e.price === item) {
            listEmail = [...listEmail, e.title];
          }
        });
        return 1;
      });
    }

    return listEmail;
  };

  export const sendMail = (email) => {
    let tempEmail = [];
    if (email) {
      email.split(',').map((item) => {
        tempEmail = [...tempEmail, { value: item, text: item }];
        return 1;
      });
    }

    return tempEmail;
  };

  export const getKeyValueEmailList = (emp, employeeFixAll) => {
    let listEmail = [];
    if (emp) {
      emp.map((item) => {
        employeeFixAll.map((e) => {
          if (e.price === item) {
            listEmail = [...listEmail, { value: e.price, text: e.title }];
          }
        });
        return 1;
      });
    }

    return listEmail;
  };


  export const getResource = (resource: any, search: string) => {
    if (search !== 'emailReceiver') {
      return resource
        ?.filter((item: any) => item.value !== '')
        .map((item: any) => item.value)
        .join(',')
        .split(',');
    } else {
      return resource
        ?.filter((item: any) => item.value !== '')
        .map((item: any) => item.text)
        .join(',')
        .split(',');
    }
  };

  export const mandatoryBranchSubranch = (issueType, taskIssueType) => {
    let item = taskIssueType.find((item) => item.value === issueType)
    if(item){
        if( item.text === 'Add-on (Hardware)' || item.text === 'Hardware Problem') {
          return false
        } else {
          return true
        }
    }else {
      return true
    }
  }