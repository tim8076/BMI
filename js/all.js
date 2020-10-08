
//宣告變數
let btn = document.querySelector('.output-btn');
let resultBtn = document.querySelector('.result-btn');
let height = document.querySelector('.height-input');
let weight = document.querySelector('.weight-input');
let list = document.querySelector('.list');
let refresh = document.querySelector('.refresh');
let alert = document.querySelector('.alert');

let deleteBTN = document.querySelector('.delete');

let data = JSON.parse(localStorage.getItem('listData')) || [] ;

//綁定監聽事件

btn.addEventListener('click',countBMI);
deleteBTN.addEventListener('click',removeAll);

updateList();



//點擊計算BMI

function countBMI(){
   let hNum = height.value; //身高 公分
   let hNumDot = height.value/100; //身高 公尺
   let wNum = weight.value;
   let bmiNum = wNum / ( hNumDot*hNumDot )
   let resultBMI = bmiNum.toFixed(2);//取小數點2位
   let date = new Date();
   let year = date.getFullYear();
   let month = date.getMonth();
   let monthCHANGE = month +1;
   let day = date.getDate();


   if( hNum =='' || wNum ==''){
     alert.style.display = 'block'; //提醒欄位不可空白
    return;
   }
     alert.style.display = 'none';

   let condition ="";
   let classColor ="";
   
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


   const str = {
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
   
   let btnSTR ;
   btnSTR= `<li class="number">${resultBMI}</li>
            <li>BMI</li>
            <div class="refresh ${classColor}">
               <img src="https://upload.cc/i1/2020/10/01/voJMKS.png" alt="">
            </div>
            <p>${condition}</p>`
            
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
  
  let str = '';
  for(let i=0;i<data.length;i++){

    str+= `<li class="${data[i].classColor}" data-num="${i}">
               <a class="status" >${data[i].condition}</a>
               <span>BMI<em>${data[i].bmi}</em></span>
               <span>Weight<em>${data[i].weight}</em> kg</span>
               <span>height<em>${data[i].height}</em> cm</span>
               <span>${data[i].day}-${data[i].month}-${data[i].year}</span>
           </li>`   
  }
  list.innerHTML = str; 
}

//刪除全部紀錄
function removeAll(){
  data = [];
  localStorage.setItem('listData',JSON.stringify(data));
  updateList();
}

//刪除單筆紀錄

list.addEventListener('click',function(e){
      let str = e.target.nodeName;
      if(str !== "A"){return;}

      let num = e.target.dataset.num;//確認刪除的是第幾筆
      data.splice(num,1);//刪除資料
      localStorage.setItem('listData',JSON.stringify(data));//儲存刪除後資料
      updateList();
 },false);







