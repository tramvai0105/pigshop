import { useState } from "react";

function useAlert(){

    const [alert, setAlert] = useState(false);

    function showAlert(){
        setAlert(true);
        setTimeout(()=>setAlert(false), 800);
      }

    return {alert, showAlert}
}

export default useAlert;