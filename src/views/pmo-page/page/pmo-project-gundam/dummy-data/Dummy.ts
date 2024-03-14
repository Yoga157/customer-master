
import { gantt } from 'dhtmlx-gantt';
export const dataDefaultCol = {
  data: [
    { id: 1, text: 'Task #1', start_date: '2022-07-12', duration: 3, progress: 0.6 },
    { id: 2, text: 'Task #2', start_date: '2022-07-16', duration: 3, progress: 0.4 },
  ],
  links: [{ id: 1, source: 1, target: 2, type: '0' }],
};

export const criticalDefaultCol = 
  {
		data: [
			{id: 1, text: "Office itinerancy", open: false, type: "project"},
			{id: 2, text: "Office facing", start_date: "22-07-2019", duration: "20", parent: "1"},
			{id: 3, text: "Furniture installation", start_date: "22-07-2019", duration: "5", parent: "1"},
			{id: 4, text: "The employee relocation", start_date: "29-07-2019", duration: "15", parent: "1"},
			{id: 5, text: "Interior office", start_date: "29-07-2019", duration: "15", parent: "1"},
			{id: 6, text: "Air conditioners installation", start_date: "19-08-2019", duration: "2", parent: "1"},
			{id: 7, text: "Workplaces preparation", start_date: "21-08-2019", duration: "2", parent: "1"},
			{id: 8, text: "Preparing workplaces for us", start_date: "22-07-2019", duration: "10", parent: "1"},
			{id: 9, text: "Workplaces importation", start_date: "22-08-2019", duration: "1", parent: "1"},
			{id: 10, text: "Analysis", open: false, type: "project"},
			{id: 11, text: "Documentation creation", start_date: "26-08-2019", duration: "14", parent: "10"},
			{id: 12, text: "Software design", start_date: "26-08-2019", duration: "10", parent: "10"},
			{id: 13, text: "Interface setup", start_date: "13-09-2019", duration: "1", parent: "10"},
			{id: 13, text: "Interface setup", start_date: "13-09-2019", duration: "1", parent: "10"},
			{id: 14, text: "Development", open: false, type: "project"},
			{id: 15, text: "Develop System", start_date: "16-09-2019", duration: "5", parent: "14"},
			{id: 16, text: "Integrate System", start_date: "16-09-2019", duration: "15", parent: "14"},
			{id: 17, text: "Test", start_date: "07-10-2019", duration: "1", parent: "14"}
		],
		links: [
			{id: "1", source: "3", target: "4", type: "0"},
			{id: "2", source: "3", target: "5", type: "0"},
			{id: "3", source: "2", target: "6", type: "0"},
			{id: "4", source: "4", target: "6", type: "0"},
			{id: "5", source: "5", target: "6", type: "0"},
			{id: "6", source: "6", target: "7", type: "0"},
			{id: "7", source: "8", target: "9", type: "0"},
			{id: "8", source: "9", target: "10", type: "0"},
			{id: "9", source: "9", target: "11", type: "0"},
			{id: "10", source: "9", target: "12", type: "0"},
			{id: "11", source: "11", target: "13", type: "0"},
			{id: "12", source: "12", target: "13", type: "0"},
			{id: "13", source: "13", target: "14", type: "0"},
			{id: "14", source: "13", target: "15", type: "0"},
			{id: "15", source: "15", target: "17", type: "0"},
			{id: "16", source: "16", target: "17", type: "0"}
		]
	}

  // special obj gantt
   /*
      - id
      - text
      - start_date
      - end_date
      - type
      - status
      - parent
      - open
   */

  export const dummySemi = {
  data: [
    { id: 10, text: 'Main Task', start_date: '2022-07-12', end_date: '2022-07-17', type:"task", projectId: 0, act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: '', assigns: ['12661', '13313'], duration: 3, taskType:"Task", isMilestone: false, createDate: "2022-07-12" },
    { id: 20, text: 'Task #2', start_date: '2022-07-17', end_date: '2022-07-20', type:"task", projectId: 0, act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: 'On Progress', assigns: ['12661', '13313'], duration: 3 ,parent: "1", taskType:"Task", isMilestone: false, createDate: "2022-07-12"},
    { id: 30, text: 'Main Task 2', start_date: '2022-07-12', end_date: '2022-07-20', type:"task", projectId: 0, act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: 'task', assigns: ['12661', '13313'], duration: 3, taskType:"Ordering", isMilestone: false, createDate: "2022-07-12" },
    { id: 40, text: 'Main Task 3', start_date: '2022-07-12', end_date: '2022-07-20', type:"project", projectId: 0, act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: 'project', assigns: ['12661', '13313'], duration: 10, taskType:"Task", isMilestone: false, createDate: "2022-07-12" },
    { id: 50, text: 'Main Task 4', start_date: '2022-07-12', end_date: '2022-07-20', type:"milestone", projectId: 0, act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: 'ini mah milestons', assigns: ['12661', '13313'], duration: 10, taskType:"Ordering", isMilestone: false, createDate: "2022-07-12" },
  ],
  links: [
    { id: 10, source: 10, target: 20, type: '0' },
    { id: 20, source: 30, target: 40, type: '0' },
  ],
};

//  data: [
//     { id: 1, text: 'Main Task', start_date: '2022-07-12', end_date: '2022-07-17', type:"project", act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: '', owners: ['4358', '3270'], duration: 3 },
//     { id: 2, text: 'Task #2', start_date: '2022-07-17', end_date: '2022-07-20', type:"project", act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: 'On Progress', owners: ['4358', '3270'], duration: 3 ,parent: "1"},
//     { id: 3, text: 'Main Task 2', start_date: '2022-07-12', end_date: '2022-07-20',type:"milestone", act_start_time: '2022-07-12', act_end_time: '2022-07-12', status: '', owners: ['4358', '3270'], duration: 3 },
//   ]


  export const customType = {
    "data":[
        {"id":"10", "text":"Project #1", "start_date":"01-04-2025", "duration":3, "order":10,"progress":0.4, "open": true},
        {"id":"1", "text":"Task #1",    "start_date":"02-04-2025", "duration":2,  "order":10,"progress":0.6, "parent":"10"},
        {"id":"2", "text":"Task #2",    "start_date":"01-04-2025", "duration":2,  "order":20,"progress":0.6, "parent":"10"},
        {"id":"20", "text":"Project #2", "start_date":"01-04-2025", "duration":3, "order":10,"progress":0.4, "type": "project", "open": true},
        {"id":"3", "text":"Task #3",    "start_date":"02-04-2025", "duration":2,  "order":10,"progress":0.6, "parent":"20"},
        {"id":"4", "text":"Task #4",    "start_date":"01-04-2025", "duration":2,  "order":20,"progress":0.6, "parent":"20"}
    ],
    "links":[
        { "id":1, "source":1, "target":2, "type":"0"},
        { "id":2, "source":2, "target":3, "type":"0"},
        { "id":3, "source":3, "target":4, "type":"0"},
        { "id":4, "source":2, "target":5, "type":"0"}
    ]
};
