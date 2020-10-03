
//宣告變數
var btn = document.querySelector('.output-btn');
var resultBtn = document.querySelector('.result-btn');
var height = document.querySelector('.height-input');
var weight = document.querySelector('.weight-input');
var list = document.querySelector('.list');
var refresh = document.querySelector('.refresh')


var deleteBTN = document.querySelector('.delete');

var data = JSON.parse(localStorage.getItem('listData')) || [] ;

//綁定監聽事件

btn.addEventListener('click',countBMI);
deleteBTN.addEventListener('click',remove);

updateList();



//點擊計算BMI

function countBMI(){
   var hNum = height.value; //身高 公分
   var hNumDot = height.value/100; //身高 公尺
   var wNum = weight.value;
   var bmiNum = wNum / ( hNumDot*hNumDot )
   var resultBMI = bmiNum.toFixed(2);//取小數點2位
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth();
   var monthCHANGE = month +1;
   var day = date.getDate();

   if( hNum =='' || wNum ==''){
    alert('欄位不可空白') //提醒輸入框不可空白
    return;
   }

   var condition ="";
   var classColor ="";
   
   if(resultBMI<=18.5){ //判斷bmi，並將結果儲存到localStorage
      condition ="過輕";
      classColor ="light";

   }else if(resultBMI>18.5 && resultBMI<=25) {
      condition ="理想";
      classColor ="good";
   }else if(resultBMI>25 && resultBMI<=30){
      condition ="過重";
      classColor ="overWeight";
   }else if(resultBMI>30 && resultBMI<=35){
      condition ="輕度肥胖";
      classColor ="fatLittle";
   }else if(resultBMI>35 && resultBMI<=40){
      condition ="中度肥胖";
      classColor ="fatMiddle";
   }else{
      condition ="重度肥胖";
      classColor ="fatAlot";
   }


   var str = {
     height:hNum,
     heightDot:hNumDot,
     weight:wNum,
     bmi:resultBMI,
     day:day,
     month:monthCHANGE,
     year:year,
     condition:condition,
     classColor:classColor
   }

   data.push(str);
   localStorage.setItem('listData',JSON.stringify(data));
 
   updateList();
   

   //更新按鈕
 
   btn.style.display = 'none'; //刪除原按鈕
   resultBtn.style.display = 'block';
   
   var btnSTR ;
   btnSTR= '<li class="number">'+ resultBMI +'</li>'+
           '<li>BMI</li>'+
           '<div class="refresh '+classColor+'"><img src="https://upload.cc/i1/2020/10/01/voJMKS.png" alt=""></div>'+
           '<p>'+ condition +'</p>'
   resultBtn.innerHTML = btnSTR;

   if(resultBMI<=18.5){ //判斷bmi 將樣式套用至按鈕上
      resultBtn.classList.add('light');
   }else if(resultBMI>18.5 && resultBMI<=25) {
      resultBtn.classList.add('good');
   }else if(resultBMI>25 && resultBMI<=30){
      resultBtn.classList.add('overWeight');
   }else if(resultBMI>30 && resultBMI<=35){
     resultBtn.classList.add('fatLittle');
   }else if(resultBMI>35 && resultBMI<=40){
     resultBtn.classList.add('fatMiddle');
   }else{
     resultBtn.classList.add('fatAlot');
   }

   height.value = ''; //清空輸入框
   weight.value = '';
}

//更新按鈕

function back(){
   resultBtn.style.display = 'none';
   btn.style.display = 'block';
   height.value = ''; //清空輸入框
   weight.value = ''; 
}

resultBtn.addEventListener('click',back,false);


//更新畫面
function updateList(){
  
  var str = '';
  for(var i=0;i<data.length;i++){

    str+= '<li class="'+data[i].classColor+'">'+'<span class="status" data-num="'+i+'">'+data[i].condition+'</span>'+
    '<span>BMI '+'<em>'+ data[i].bmi+'</em>'+'</span>'+
    '<span>Weight '+'<em>'+ data[i].weight +'</em>'+' kg'+'</span>'+ 
    '<span>height '+'<em>'+data[i].height+'</em>'+' cm'+'</span>'+
    '<span>'+ data[i].day+'-'+data[i].month+'-'+data[i].year +'</span>'+
    '</li>'   
  }
  list.innerHTML = str; 

}

//刪除全部紀錄
function remove(){
  data = [];
  localStorage.setItem('listData',JSON.stringify(data));
  updateList();
}






