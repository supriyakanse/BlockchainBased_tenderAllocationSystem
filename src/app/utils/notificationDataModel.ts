export class NotificationDataModel{
    seen:boolean;
    subTitle:string;
    title:string;
    timeStamp:string;
    notificationType:string;
    grName:string;

    constructor(
        seen:boolean,
        subTitle:string,
        title:string,
        timeStamp:string,
        grName:string,
        notificationType:string
    ){
        this.seen = seen;
        this.subTitle = subTitle;
        this.timeStamp = timeStamp;
        this.title = title;
        this.grName = grName;
        this.notificationType = notificationType;
    }
}