
  var g_hour, g_min;
  var g_flag = 0; //for fix unknown bug, first time digital font is not displayed but after 1 second all ok
  
  function FillCircle( context, cx, cy, r_base, r, color1, color2){
    //blackness      
    context.beginPath();
    context.arc( cx, cy, r, 0, Math.PI*2, false);
    context.closePath();
    context.fillStyle = "rgb(0,0,0)";
    context.fill();
    
    //color fill
    gradient = context.createLinearGradient( cx-r_base, cy-r_base, cx+r_base, cy+r_base);         
    gradient.addColorStop(0, color1); 
    gradient.addColorStop(1, color2);
    context.fillStyle = gradient;
    context.fill();
  }

  function RotateX( angle, r, cx, cy){
  	return cx + r * Math.sin( angle );
  }
  
  function RotateY( angle, r, cx, cy){
  	return cy - r * Math.cos( angle );
  }
  
  function Draw(){
    canvas = document.getElementById('clock');
    context = canvas.getContext('2d');
 
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect( 0, 0, canvas.width, canvas.height);
    
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    r = Math.min( cx, cy );
    r_base = r;
    
    //ring
    r *= 0.9;
    FillCircle( context, cx, cy, r_base, r, 'rgba(0,255,0,1)', 'rgba(0,255,0,0.25)');
    
    r *= 0.97;
    FillCircle( context, cx, cy, r_base, r, 'rgba(0,255,0,0.75)', 'rgba(0,255,0,0.5)');
    
    r *= 0.93;
    FillCircle( context, cx, cy, r_base, r, 'rgba(0,255,0,0.25)', 'rgba(0,255,0,1)');
    
    r *= 0.97;
    r_dial = r;
    FillCircle( context, cx, cy, r_base, r, 'rgb(0,0,0)', 'rgb(0,0,0)');

    //dial
    r *= 0.93;
    r2 = r * 0.97;    

    radianPerGradus = 2 * Math.PI / 360;
    context.lineCap = 'round';    
		for( i = 0; i < 60; i++){
			angle = (6 * i) * radianPerGradus;
      x = RotateX( angle, r, cx, cy);
      y = RotateY( angle, r, cx, cy);

      context.beginPath();  
      context.moveTo( x, y); 	
      x = RotateX( angle, r2, cx, cy);
      y = RotateY( angle, r2, cx, cy);
      context.lineTo( x, y);

      context.strokeStyle = 'rgb( 0, 255, 0)';
      
			if( i % 5 == 0){
        context.lineWidth = r_base / 30;
			}else{
        context.lineWidth = r_base / 150;
			}
      context.stroke();
    }
    
    //arrows      
    date = new Date();
    hour = date.getHours();
  	if( hour > 12)
  		hour -= 12;
    
    min = date.getMinutes();
    
    hour += min / 60;
    angle = ( hour * 360/12) * radianPerGradus;

    context.beginPath();  
    context.moveTo( cx, cy); 	
    x = RotateX( angle, r*0.6, cx, cy);
    y = RotateY( angle, r*0.6, cx, cy);
    context.lineTo( x, y);
    context.lineWidth = r_base / 20;
    context.strokeStyle = 'rgba( 0, 255, 0, 0.75)';
    context.stroke();
    
    angle = (6 * min) * radianPerGradus;
    context.beginPath();  
    context.moveTo( cx, cy); 	
    x = RotateX( angle, r*0.85, cx, cy);
    y = RotateY( angle, r*0.85, cx, cy);
    context.lineTo( x, y);
    context.lineWidth = r_base / 25;
    context.stroke();
    
    FillCircle( context, cx, cy, r_base, r_base / 25, 'rgb(0,255,0)', 'rgb(0,255,0)');

    am_pm = GetIni("am_pm");
     
    am_pm_text = "";
    hour = date.getHours();
    if( am_pm ){
      if( hour >= 12 ){
        hour -= 12;
        am_pm_text = " PM";
      }else{
        am_pm_text = " AM";
      }
      if( hour == 0 )
        hour = 12;      
    }
          
    time = "" + hour + ":";
    if( min < 10 )
      time += "0" + min;
    else
      time += min;
      
    time += am_pm_text;
      
    context.textAlign = 'center';
    context.font = "" + parseInt(r_base / 5) +"pt Digital-7 Mono, Sans Serif";    
    context.fillStyle = "rgba(0,255,0,0.5)";    
    context.fillText( time, cx, cy + r_dial/2);
    
    context.lineWidth = r_base / 200;
    context.strokeStyle = 'rgba( 0, 255, 0, 0.5)';
    context.strokeText( time, cx, cy + r_dial/2);

    // !    
    g_hour = date.getHours();
    g_min = date.getMinutes();
    document.title = time + " Analog Clock CE-7";     
  }

  function OnResize(){
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight-6; 
    canvas = document.getElementById('clock');
    canvas.width = w;
    canvas.height = h;
    
    canvas = document.getElementById('second');
    canvas.width = w;
    canvas.height = h;    
    Draw();  
  }

  function OnTimer(){
    date = new Date();
    if( g_flag == 0 || g_hour != date.getHours() || g_min != date.getMinutes() ){
      g_flag = 1;
      Draw();        
    }
    
    //draw second arrow
    canvas = document.getElementById('second');
    context = canvas.getContext('2d');
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    r_base = Math.min( cx, cy );            
    context.clearRect( 0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.lineCap = 'round';
    context.strokeStyle = 'rgba( 0, 255, 0, 0.75)';  
    context.moveTo( cx, cy);
    angle = (6 * date.getSeconds()) * radianPerGradus; 	
    x = RotateX( angle, r_base*0.67, cx, cy);
    y = RotateY( angle, r_base*0.67, cx, cy);
    context.lineTo( x, y);
    context.lineWidth = r_base / 75;    
    context.stroke();
    context.closePath();
    
    context.beginPath();
    context.lineCap = 'round';
    angle += 180 * radianPerGradus;
    context.moveTo( cx, cy);
    x = RotateX( angle, r_base*0.24, cx, cy);
    y = RotateY( angle, r_base*0.24, cx, cy);
    context.lineTo( x, y);
    context.moveTo( cx, cy);
    context.lineWidth = r_base / 40;
    context.stroke();
    context.closePath();
  }
  
  function OnTimer_Bug(){
      Draw();  
      setInterval( OnTimer, 1000);
  }

  function Init(){
    OnResize();
    date = new Date();
    g_hour = date.getHours();
    g_min = date.getMinutes();
    OnTimer_Bug();
  }
  
  window.onresize = OnResize;
  Init();