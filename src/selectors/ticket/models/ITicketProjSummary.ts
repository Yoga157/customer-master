export default interface ITicketProjSummary {
      readonly projectId : number 
      readonly funnelGenId : number 
      readonly projectAlias : string 
      readonly startProject : string | Date
      readonly endProject : string | Date
      readonly startWarranty : string | Date
      readonly endWarranty : string | Date
      readonly so : string 
      readonly projectName : string 
      readonly customerName : string 
      readonly customerAddress : string 
      readonly customerPicName : string 
      readonly pmoName : string 
      readonly soidc : string 
      readonly phone : number 

}