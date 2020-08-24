//Element name where we will write today's date
let Date_Today = $("#currentDay1"); 

//use moment as instructed to get todays date in the correct format
Date_Today.text(moment().format("dddd, MMMM Do")); 

//Defining the Working Hours of the day per the example...
let Working_Hours = ["9AM","10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]; 

// Show the Row of Hours display the working hours
var row_counter = 0;

while (row_counter < Working_Hours.length)  {

    let Work_Hour_Line= $("#9AM").clone();
    Work_Hour_Line.attr("id", Working_Hours[row_counter]); 
    Work_Hour_Line.children(".row").attr("style", "white-space: pre-Wrap"); 
    Work_Hour_Line.children(".row").children(".hour").text(Working_Hours[row_counter]); 
    Work_Hour_Line.appendTo(".container"); 
    
    console.log("WORK_HOUR_LINE--" + Work_Hour_Line);
    row_counter++;
    
}

// We now have the scheduler displaying without any data.  Check to see if there is any data, then go over each row and add
let Saved_Items;
//savedDayPlans;
//let locationArr = []; 
let Array_of_Work_Items = [];


function Get_Display_Saved_Events() {

    Saved_Items = localStorage.getItem("Saved_Items"); 
    console.log(Saved_Items);

    Array_of_Work_Items =[]; 
    if (Saved_Items == null || Saved_Items == "") {

        Saved_Items = []; 
     
    } else {
        
        console.log("has saved items");
 	    Saved_Items = JSON.parse(Saved_Items); 
        
        counter=0;
        while (counter < Saved_Items.length) {

            Array_of_Work_Items.push(Saved_Items[counter].time); 
            counter++;
        
        }
    

        counter=0;
        while (counter < Array_of_Work_Items.length ) {

            let timeBlockElid = "#"+Array_of_Work_Items[counter]; 
            let timeBlockEl = $(timeBlockElid).children(".row").children("textarea"); 
            $(timeBlockElid).children(".row").children("button").attr("data-event", "yes"); 
            timeBlockEl.val(Saved_Items[counter].event); 
            counter++;

        }
       
 }

 }



 function Display_All_Saved_Tasks(){

        Saved_Items = localStorage.getItem("Saved_Items"); 
        console.log(Saved_Items);
 	    Array_of_Work_Items =[]; 
     
        if (Saved_Items === null || Saved_Items === "") {
         
            Saved_Items = []; 

     } 
     else {
        
            console.log("has saved items");
 	        Saved_Items = JSON.parse(Saved_Items); 
         
            for (i=0; i<Saved_Items.length; i++) {
            
                Array_of_Work_Items.push(Saved_Items[i].time); 
         }
     }
    
     for (let i=0; i< Array_of_Work_Items.length; i++) {
         
            let HourSlotID  = "#"+Array_of_Work_Items[i]; 
            let HourSlot = $(HourSlotID).children(".row").children("textarea"); 
            $(HourSlotID).children(".row").children("button").attr("data-event", "yes");       
            HourSlot.val(Saved_Items[i].event); 
     }    
 }


Display_All_Saved_Tasks();


// Save entries in the planner to local storage
function Save_Event(time, index, location, buttonEl,Input, isPopulated)  {


            //saveEvent(time, Input); 
            Saved_Items.push({"time":time,"event": Input}); 

            localStorage.setItem("Saved_Items", JSON.stringify(Saved_Items)); 

}


$(".time-block").delegate("button", "click", function(){
    event.preventDefault();
    let eventData= $(this).siblings("textarea").val(); 
    let timeslot= $(this).siblings("p").text(); 
    let area = $(this).siblings("textarea"); 
    let hasData= $(this).attr("data-event"); 
    let input= Array_of_Work_Items.indexOf(time);
    let buttonEl=$(this); 

    Save_Event(timeslot, input, area, buttonEl, eventData,hasData); 
    
})
        
//Changing colors based on time functions and code 

    //getting the current time of day
let timeOfDay= moment().format("hA"); 

    //Need to get class and select past/present/future and change based on time of day
let allTimeBlocksEl= $(".time-block"); 

for (let i=0; i<allTimeBlocksEl.length; i++){
   let timeBlock= $(allTimeBlocksEl[i]); 
   let timeAreaId= timeBlock.attr("id");
   let timeBlockTextarea=timeBlock.children(".row").children("textarea");  
   if (timeAreaId === timeOfDay){
       timeBlockTextarea.addClass("present"); 
   } else if (moment(timeAreaId, "hA").isBefore()) {
       timeBlockTextarea.addClass("past"); 
   } else if (moment(timeAreaId, "hA").isAfter()) {
       timeBlockTextarea.addClass("future"); 
   }
}
  
  