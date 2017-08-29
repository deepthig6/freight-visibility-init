// VARIABLES WHICH ARE USED IN THE MONITORSHIPMENT MODULE

var shipmentID = 'TestKrishnaShipment';
var telemetry = '';
var tags = '';
var feedbackJSON = {};


export function getShipment(){
  return shipmentID;
}

export function setShipment(shipment){
  shipmentID = shipment;
}

export function getTelemetry(){
  return telemetry;
}
export function setTelemetry(input){
  telemetry  = input
}

export function setTags(input){
  tags = input
}

export function getTags(){
  return tags
}

export function getInitialDatetime(item){
  var flag=false;
  var returnval='';
  for(var i=0;i<telemetry.length;i++)
  {
    if(telemetry[i].Notification.Data.TagID === item)
    {
      returnval=telemetry[i].Boundary.DateTime;
      flag=true;
    }
    if(flag==true)
    {
      break;
    }
  }
  return returnval;
}

export function getInitialBattery(item){
  var flag=false;
  var sensorobject=[];
  var returnval='';
  var gatewayidvalue='';
  var bat = '';
  for(var i=0;i<telemetry.length;i++)
  {
    if(telemetry[i].Notification.Data.TagID === item)
    {
      gatewayidvalue = telemetry[i].Boundary.GatewayID.substr(gatewayidvalue.length - 4);
      if(gatewayidvalue == item )
      {
        returnval=telemetry[i].Notification.Data.BatteryStatus;
      }
      else {
          sensorobject = telemetry[i].Notification.Data.SensorData;
        //  console.log("SENSOROBJECT IS");
        //  console.log(sensorobject);
          for(var j=0;j<sensorobject.length;j++)  {
                  if(sensorobject[j].SensorType==="Battery"){
                  bat=sensorobject[j].Value;
                  if(bat>2800)
                  {
                    returnval = "> 75%";
                  }
                  else if(bat>2400 && bat<=2800) {
                    returnval = "25% - 75%";
                  }
                  else if(bat<=2400) {
                     returnval = "< 25%";
                  }
                }
          }
      }
      flag=true;
    }
    if(flag==true)
    {
      break;
    }
  }
  return returnval;
}

export function makeFeedbackJSON(gatefeedback,tagsfeedback,addcomments,rating)
{

 feedbackJSON["GatewayFeedback"]={};
 feedbackJSON["GatewayFeedback"]["value"] = gatefeedback;

 feedbackJSON["TagsFeedback"]={};
 feedbackJSON["TagsFeedback"]["value"] = tagsfeedback;

 feedbackJSON["AdditionalComments"] = {};
 feedbackJSON["AdditionalComments"]["value"] = addcomments;

 feedbackJSON["TripRating"] = {};
 feedbackJSON["TripRating"]["value"] = rating;

}

export function getFeedbackJSON(){
  return feedbackJSON;
}
