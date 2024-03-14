import moment from 'moment';
import { createSelector, Selector } from 'reselect';

import ProjectGundamTaskWithLinkModel from 'stores/project-gundam/models/ProjectGundamTaskWithLinkModel';
import GundamByEntryKeyModel from 'stores/project-gundam/models/GundamByEntryKeyModel';
import DropdownGunadamModel from 'stores/project-gundam/models/DropdownGunadamModel';
import IOptionsDataString from 'selectors/select-options/models/IOptionsDataString';
import IStore from '../../models/IStore';


const _selectProjectGundamList = (models: any): any => {
   return  models?.map((model: any) => ({
        id: model.taskId, 
        // type: 'milestone',
        type: model.type,
        text: model.taskDescription, 
        start_date: '2022-07-12', 
        end_date: '2022-07-17', 
        act_start_time: 'xxx-xx-xx', 
        act_end_time: 'xxx-xx-xx', 
        status: '', 
        owners: [], 
        duration: 30000000
      }))
   
}
export const selectProjectGundamList: Selector<IStore, any> = createSelector((state: IStore) => state.projectGundam.listData!, _selectProjectGundamList);


const _selectProjectGundamTaskLinkList = (models: ProjectGundamTaskWithLinkModel): any => {
  
  return {
    data: models.tasks.length > 0 ? models.tasks.map((item) =>{
      return {
        id: item.taskId,
        uid: item.taskUID,
        category: item.category, 
        subcategory: item.subcategory, 
        issueType: item.issueType, 
        issueSubtype: item.issueSubtype, 
        text: item.taskName ? item.taskName : "", 
        taskDescription: item.description ? item.description : "", 
        // type: item.isMilestone ?  "milestone"  : item.ganttType.toLowerCase(), 
        type: item.isMilestone ?  "task"  : item.ganttType?.toLowerCase(), 
        start_date: moment(item?.estStartDate).format('yyyy-MM-DD'), 
        end_date: moment(item?.estEndDate).format('yyyy-MM-DD'), 
        assigns: item?.primaryResources?.split(','), 
        secondaryResources: item?.secondaryResources?.split(','), 
        slaName: item?.slaName, 
        isMilestone: item.isMilestone, 
        
        duration: item.duration, 
        durationX: item.duration, // by service calculate duration

        parent: String(item.parentTaskId),

        projectId: item.projectId, 
        taskType: item.taskType, 
        
        funnelGenId: item.funnelGenId, 
        brand: item.brand, 
        subBrand: item.subBrand, 
        emailReceiver: item.emailReceiver, 
        emailCc: item.emailCc, 

        act_start_time: item.actualStartDate && moment(item.actualStartDate).format('yyyy-MM-DD'), 
        act_end_time: item.actualEndDate && moment(item.actualEndDate).format('yyyy-MM-DD'), 
        status: item.status, 
        remark: item.remark, 

        createDate: item.createDate,
        createUserID: item.createUserID
      }
    }) : [],

    links: models.linkedTasks.length > 0 ?  models.linkedTasks.map((item) =>{ 
      // { id: 2, source: 3, target: 4, type: '0' },
      return { 
        id: item.linkId, 
        source: item.sourceTaskId, 
        target: item.targetTaskId, 
        type: item.type ? `${item.type}` : '0',
        lag: item.lag,
      }
    }) : []
  }
   
}
export const selectProjectGundamTaskLinkList: Selector<IStore, any> = createSelector((state: IStore) => state.projectGundam.listTaskLink!, _selectProjectGundamTaskLinkList);


const _selectDropdownGundam = (models: DropdownGunadamModel[]): IOptionsDataString[] =>  {
  return models.map((item: DropdownGunadamModel) => {
    return {
        value: item.textData, 
        text: item.textData
    }
  })
}

export const selectDropdownGundam: any = createSelector((state: IStore, dropdown) => 
dropdown === "sla" ? state.projectGundam.dropdownSLA! : state.projectGundam.dropdownTypeTask!,
_selectDropdownGundam);


const _selectDropdownGundamEntryKey = (models: GundamByEntryKeyModel[]): IOptionsDataString[] | any =>  {
  
  return models.map((item: GundamByEntryKeyModel, key) => {
    if(item.entryKey === "TaskSubCategory" || item.entryKey	=== "TaskSubType"){
      return {
              value: `${item.udcid}`,  
              text1: item.text1,
              text: item.text2
          }
    }else {
      return {
            value: `${item.udcid}`, 
            entrykey: item.entryKey,
            text: item.text1
        }
    }
    
  })
}

export const selectDropdownGundamEntryKey: any = createSelector((state: IStore, dropdown) => 
dropdown === "taskCategory" ? state.projectGundam.dropdownTaskCategory! 
: dropdown === "taskSubCategory" ? state.projectGundam.dropdownTaskSubCategory!
: dropdown === "taskTemplate" ? state.projectGundam.dropdownTaskTemplate! 
: dropdown === "taskIssueType" ? state.projectGundam.dropdownTaskIssueType! 
: state.projectGundam.dropdownTaskSubIssue! ,
_selectDropdownGundamEntryKey
);

const _selectValueEmailGundam = (model: any): any =>  {
    return {
        subject: model.subject  && model.subject !== "undefined" ? model.subject : "", 
        body: model.body  && model.body !== "undefined" ? model.body : ""
    }
}

export const selectValueEmailGundam: any = createSelector((state: IStore) => 
state.projectGundam.valueEmail!,
_selectValueEmailGundam);