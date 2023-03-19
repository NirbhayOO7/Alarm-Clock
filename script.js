(function(){  //Immediately invoked function expression(IIFE) is used to self run the fuction

    let alarmList = [];   // alarms array will contains all the list of alarms set by the user.
    let alarmListContainer = document.getElementById('alarm-list');

    const alarmAudio = document.getElementById("alarm-audio");
    alarmAudio.src = "./Ping1.mp3";
    alarmAudio.load();


    const checkAlarm = (timeString) => {
        for(let i=0; i<alarmList.length; i++)
        {
            if(alarmList[i] === timeString){
                console.log("alarm triggered"+alarmList[i]);
                alarmAudio.play();
            }
        }
    };

    // fucntion to covert the time to a string 

    const getTimeString = ({hours, minutes, seconds, zone}) => {

        if(hours<10){
            hours = "0" + hours;
        }

        if(minutes<10){
            minutes = "0" + minutes;
        }

        if(seconds<10){
            seconds = "0" + seconds;
        }

        return `${hours}:${minutes}:${seconds} ${zone}`
    }


    // renderTime function is used to render the current time. 
    const renderTime = () =>{
        var currentTime = document.getElementById('current-time');
        const currentDate = new Date();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();

        var zone = hours>12 ? 'PM':'AM';

        if(hours>12){
            hours = hours%12;
        }

        const timeString = getTimeString({hours, minutes, seconds, zone});
        checkAlarm(timeString);
        currentTime.innerHTML = timeString;
    }

    // function to show notification 
    function showNotification(notification){
        setTimeout(function(){
            window.alert(notification);
        });
        
    }


    // function to render the list of alarms which is added by user

    function addAlarmToDOM(alarm){
        const li = document.createElement('li');

        li.innerHTML = `<span class="added-alarm">${alarm}</span>
        <img src="bin.svg" class="delete" data-id ="${alarm}"/>`;

        alarmListContainer.append(li);
    }

    function renderAlarmList(alarmList){
        alarmListContainer.innerHTML = '';

        for(let i=0; i<alarmList.length; i++){
            addAlarmToDOM(alarmList[i]);
        }
    }

    // function to add alarms in the alarms array
    function addAlarm(alarmString){
        let isPresent = false;

        for(let i=0; i<alarmList.length; i++){
            if(alarmList[i] === alarmString){
                isPresent = true;
            }
        }
        if(!isPresent)
        {
            alarmList.push(alarmString);
            showNotification("Alarm Added!");
        }
        else{
            showNotification("Alarm with same time already present!");
        }
        renderAlarmList(alarmList)
        return;
    }

    // function to delete the alram from alarmList 

    function deleteAlarmFunction(deleteAlarm){
        const newAlarmList = alarmList.filter(function(alarm){
            return alarm != deleteAlarm;
        });
        
        alarmList = newAlarmList;
        renderAlarmList(alarmList);
        showNotification('Alarm deleted successfully');
    }

    //handle click event-this is defined to basically delete the alaram on click on delete box
    function handleClickEvent(e){
        const target = e.target;
        if(target.className === 'delete'){
            const deleteAlarm = target.dataset.id;
            deleteAlarmFunction(deleteAlarm);
            return;
        }

        return;
    }

    // handle inputs to set Alarms
    function handleSetAlarmClock(e){
        e.preventDefault();
        var hours = parseInt(document.getElementById('hour').value);
        var minutes = parseInt(document.getElementById('minute').value);
        var seconds = parseInt(document.getElementById('second').value);
        var zone = document.getElementById('zone').value;
        const alarmString = getTimeString({hours, minutes, seconds, zone});
        addAlarm(alarmString);
        alarm.reset();
    }

    setInterval(renderTime, 1000);    //this will call the renderTime in each one second so that we can see the seconds couts keeps updating on our webpage

    const alarm = document.getElementById('set-alarm-form');
    alarm.addEventListener('submit', handleSetAlarmClock);
    document.addEventListener('click', handleClickEvent);
})();

