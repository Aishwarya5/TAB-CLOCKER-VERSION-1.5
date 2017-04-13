  function IsSet(varname){
    return typeof varname != "undefined";
  }
  
  function GetDefIni( name ){    
    switch( name ){
      case "am_pm": return 1;
      default: return "";
    }
  }
  
  function GetIni( name ){        
    if( IsSet(localStorage[name]) ){
      return localStorage[name];
    }else{
      return GetDefIni(name);
    } 
  }