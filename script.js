function showMenu() 
{
  document.getElementById("timerBox").style.display = "inherit"
  document.getElementById("folder").style.display = "none"
}

function backIndex() 
{
  document.getElementById("timerBox").style.display = "none"
  document.getElementById("folder").style.display = "inherit"
}

document.addEventListener('keydown', function(e) 
{
  
if ($( ".buttonStart" ).is( ":visible" ) && e.code == "Space")
{

    document.getElementById("start").style.background = "#00b4d8"
    document.getElementById("start").style.color = "#000000"
    document.getElementById("start").style.border = "none"
}
else if ($( ".buttonPause" ).is( ":visible" ) && e.code == "Space")
{

  document.getElementById("pause").style.background = "#00b4d8"
  document.getElementById("pause").style.color = "#000000"
  document.getElementById("pause").style.border = "none"
}
else if ($( ".buttonReset" ).is( ":visible" ) && e.code == "Space")
{

  document.getElementById("reset").style.background = "#00b4d8"
  document.getElementById("reset").style.color = "#000000"
  document.getElementById("reset").style.border = "none"
}
});

document.addEventListener('keyup', function(e) 
{
  
  if ($( ".buttonStart" ).is( ":visible" ) && e.code == "Space")
  {

      document.getElementById("start").click()
      document.getElementById("start").style.background = "#000000"
      document.getElementById("start").style.color = "#ffffff"
      document.getElementById("start").style.border = "1px solid #00b4d8"
  }
  else if ($( ".buttonPause" ).is( ":visible" ) && e.code == "Space")
  {

      document.getElementById("pause").click()
      document.getElementById("pause").style.background = "#000000"
      document.getElementById("pause").style.color = "#ffffff"
      document.getElementById("pause").style.border = "1px solid #00b4d8"
  }
  else if ($( ".buttonReset" ).is( ":visible" ) && e.code == "Space")
  {

      document.getElementById("reset").click()
      document.getElementById("reset").style.background = "#000000"
      document.getElementById("reset").style.color = "#ffffff"
      document.getElementById("reset").style.border = "1px solid #00b4d8"
  }
});

var minute = 0
var second = 0
var millisecond = 0
var finalTime = 0
var chronometer
var finalTimeMinuteConvertedMilliseconds = 0
var finalTimeSecondConvertedMilliseconds = 0
var times = new Array()
var timesMinute = new Array()

function start() 
{

chronometer = setInterval(() => { timer() }, 10)

document.getElementById("start").style.display = "none"
document.getElementById("pause").style.display = "inherit"
}

function pause() 
{

clearInterval(chronometer)

document.getElementById("pause").style.display = "none"
document.getElementById("reset").style.display = "inherit"
}

function reset() 
{

convertTimesToMilliseconds()
putTimesArray()
timesList()

minute = 0
second = 0
millisecond = 0

document.getElementById('minute').innerText = '00'
document.getElementById('second').innerText = '00'
document.getElementById('millisecond').innerText = '00'

document.getElementById("reset").style.display = "none"
document.getElementById("start").style.display = "inherit"
}

function timer() 
{

if ((millisecond += 1) == 99) 
{
  millisecond = 0
  second++
}
if (second == 60) 
{
  second = 0
  minute++
}

document.getElementById('minute').innerText = returnData(minute)
document.getElementById('second').innerText = returnData(second)
document.getElementById('millisecond').innerText = returnData(millisecond)
}

function returnData(input) 
{
return input > 9 ? input : `0${input}`
}

function convertTimesToMilliseconds()
{

finalTimeMinuteConvertedMilliseconds = minute * 60000
finalTimeSecondConvertedMilliseconds = second * 1000

finalTime = finalTimeMinuteConvertedMilliseconds + finalTimeSecondConvertedMilliseconds + millisecond

}

function convertTimesToMinutes(finalTime)
{

  second = finalTime / 1000
  minute = (second / 120).toFixed(0)
  console.log(minute)
  second = (second % 60).toFixed(0)
  millisecond = (finalTime % 100)
  finalTime = minute + ":" + second + ":" + millisecond

  return finalTime
}

function putTimesArray()
{

times.push(finalTime)
times.sort(function(a, b){return a-b})
localStorage.setItem("times", JSON.stringify(times))

timesMinute = times.map(function(finalTime)
{

  return convertTimesToMinutes(finalTime)

})

}

function timesList()
{

  var timesTableZero = document.getElementById('firstLine')
  timesTableZero.innerHTML = "<span style='font-weight:normal'>" + timesMinute[0] + "</span>"

  var timesTableOne = document.getElementById('secondLine')
  timesTableOne.innerHTML = "<span style='font-weight:normal'>" + timesMinute[1] + "</span>"

  var timesTableTwo = document.getElementById('thirdLine')
  timesTableTwo.innerHTML = "<span style='font-weight:normal'>" + timesMinute[2] + "</span>"

  var timesTableThree = document.getElementById('fourthLine')
  timesTableThree.innerHTML = "<span style='font-weight:normal'>" + timesMinute[3] + "</span>"

  var timesTableFour= document.getElementById('fifthLine')
  timesTableFour.innerHTML = "<span style='font-weight:normal'>" + timesMinute[4] + "</span>"

  var timesTableFive = document.getElementById('sixthLine')
  timesTableFive.innerHTML = "<span style='font-weight:normal'>" + timesMinute[5] + "</span>"

  var timesTableSix = document.getElementById('seventhLine')
  timesTableSix.innerHTML = "<span style='font-weight:normal'>" + timesMinute[6] + "</span>"

  var timesTableSeven = document.getElementById('eighthLine')
  timesTableSeven.innerHTML = "<span style='font-weight:normal'>" + timesMinute[7] + "</span>"

  var timesTableEight = document.getElementById('ninthLine')
  timesTableEight.innerHTML = "<span style='font-weight:normal'>" + timesMinute[8] + "</span>"

  var timesTableNine= document.getElementById('tenthLine')
  timesTableNine.innerHTML = "<span style='font-weight:normal'>" + timesMinute[9] + "</span>"
 

  document.getElementById('bestTime').value = timesMinute[0]

  document.getElementById('worstTime').value = convertTimesToMinutes(Math.max(...times))

  if(isNaN(times[9]))
  {

    document.getElementById('md10').value = ""
  }else{
    document.getElementById('md10').value = convertTimesToMinutes(((times[0] + times[1] + times[2] + times[3] + times[4] + times[5] + times[6] + times[7] + times[8] + times[9]) / 10).toFixed(0))
  }

  var averageMedia = times.reduce(function(total, number)
  {

    return total + number / times.length
  }, 0)

  document.getElementById('average').value = convertTimesToMinutes(averageMedia.toFixed(0))
}
  function getScramble() 
  {
    var moves = new Array();
    moves['r'] = new Array("R","R'","R2");
    moves['l'] = new Array("L","L'","L2");
    moves['u'] = new Array("U","U'","U2");
    moves['d'] = new Array("D","D'","D2");
    moves['f'] = new Array("F","F'","F2");
    moves['b'] = new Array("B","B'","B2");
  
    var limit = 25;
    var last = "";
    var scramble = "";
    var keys = "";
  
    for (var i=1;i<=limit;i++) 
    {
      keys = new Array("r","l","u","d","f","b");
      shuffle(keys);
      while (last == keys[0])
      {
        shuffle(keys);
      }
      shuffle(moves[keys[0]]);
      move = moves[keys[0]][0];
      scramble += move+" ";
      last = keys[0];
    }
    $('.scramble').html("<strong>Scramble:</strong> "+scramble);
    
  for (key in newCube) 
  {
      var value = newCube[key];
      $('.block-'+key).css("background-color",value);
    }
  }
  
  function shuffle(o) 
  { 
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
