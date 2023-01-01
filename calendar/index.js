// do something!
const Calendar = $calendar => {

  const get = (e) => $calendar.querySelector(e);

  const createCss = () => {
    const link = document.createElement( 'link' );
    link.href = "./calendar/theme.css";
    link.rel = "stylesheet";
    document.querySelector('script').before(link)
  }

  const calendarInit = () => {
    $calendar.innerHTML += `
      <h1 class="title">Date Picker</h1>
      <div class="cal-toggle">Selector date</div>
      <div class="cal-wrap disable">
        <div class="cal_nav">
          <div class="nav-btn go-prev"><</div>
          <div class="year-month"></div>
          <div class="nav-btn go-next">></div>
        </div>
        <div class="days"></div>
      </div>` 
    const $days = get('.days');
    const $goPrev = get('.go-prev');
    const $goNext = get('.go-next');
    const $calWrap = get('.cal-wrap');
    const $calToggle = get('.cal-toggle');

    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    const kstGap = 9 * 60 * 60 * 1000;
    const today = new Date(utc + kstGap);
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var currentYear = thisMonth.getFullYear(); // 22
    var currentMonth = thisMonth.getMonth();  //6
    var saveValue = Array(3);
    var Months=['Janury',  ' February','March'   ,'April',
                'May',      'June'    ,'July'    ,'August',
                'September','October' ,'November','December']
 


    const lenderCalendar = () => {
      $days.innerHTML = `       
      <div class="day disable">SUN</div>
      <div class="day disable">MON</div>
      <div class="day disable">TUE</div>
      <div class="day disable">WED</div>
      <div class="day disable">THU</div>
      <div class="day disable">FRI</div>
      <div class="day disable">SAT</div>
      `
      currentYear = thisMonth.getFullYear(); // 22
      currentMonth = thisMonth.getMonth();  //6
      const startDay = new Date(currentYear, currentMonth, 0);
      const endDay = new Date(currentYear, currentMonth + 1, 0);
      const prevDate = startDay.getDate();
      const prevDay = startDay.getDay();
      const nextDate = endDay.getDate();
      const nextDay = endDay.getDay();
      
      get('.year-month').innerHTML=`${Months[currentMonth]}</br>${currentYear}`



      if (saveValue[0]==currentYear && saveValue[1]==currentMonth && saveValue[2] != undefined){
        var saveNum = saveValue[2].outerText;
      } else{
        var saveNum = null;
      }

      if (today.getFullYear() == currentYear && today.getMonth() == currentMonth) {
        var todayDate = today.getDate();
      } else{
        var todayDate = null;
      }

      for (var i = prevDate - prevDay; i <= prevDate; i++){
        $days.innerHTML = $days.innerHTML + `<div class="day disable">${i}</div>`
      }
      for (var i = 1; i <= nextDate; i++){
        if (saveNum == i){
          $days.innerHTML = $days.innerHTML + `<div class="day current pick">${i}</div>`
        } 
        else if (todayDate == i){
          $days.innerHTML = $days.innerHTML + `<div class="day current today">${i}</div>`
        }
        else {
          $days.innerHTML = $days.innerHTML + `<div class="day current">${i}</div>`
        }
      }
      for (var i = 1; i <= (6 - nextDay); i++){
        $days.innerHTML = $days.innerHTML + `<div class="day disable">${i}</div>`
      }
    }



    const calToggle = () => {
      $calToggle.classList.toggle('focused')
      $calWrap.classList.toggle('disable')
    }




    const setEvent = () => {
      $goPrev.addEventListener("click", () => {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        lenderCalendar(thisMonth)
      })
      $goNext.addEventListener("click", () => {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        lenderCalendar(thisMonth)
      })
      $calToggle.addEventListener("click", calToggle)
      $days.addEventListener("click", (e) => {
        if (e.target.classList[1] !== 'current') return;
        let str1 = currentMonth < 10 ? '0' : '';
        let str2 = e.target.outerText < 10 ? '0' : '';
        $calToggle.innerHTML = `${currentYear}-${str1}${currentMonth + 1}-${str2}${e.target.outerText}`
        calToggle()
        $calToggle.classList.add('pick')
        if (saveValue[2] !== undefined) saveValue[2].classList.remove('pick')
        e.target.classList.add('pick')
        saveValue[0] = currentYear;
        saveValue[1] = currentMonth;
        saveValue[2] = e.target;
      })
    }


    lenderCalendar(thisMonth)
    setEvent()

  }


  const init = () => {
    createCss()
    calendarInit()
  }

  init()
}


















export default Calendar;