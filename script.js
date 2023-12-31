// shorthand
function getId(name) {return document.getElementById(name)};
function query(attribute) {return document.querySelector(attribute)};

// populate data of the table
// make sure it's all blank until completed and red when it's over the lmit
// make options for beginnende en gevorderde (0.5 and 0.2)


getId("weight").addEventListener("change", recordValues);
getId("glasses").addEventListener("change", recordValues);
getId("male").addEventListener("change", recordValues);
getId("female").addEventListener("change", recordValues);
getId("beginner").addEventListener("change", recordValues);
getId("experienced").addEventListener("change", recordValues);


function recordValues() 
{
   // check and record weight
   if (weight = getId("weight").value != null) 
   {
      var weight = getId("weight").value;
   }

   // check and record glasses
   if (getId("glasses").value != null) 
   {
      var glasses = getId("glasses").value;
   }
   
   // check and record gender
   // R is 0.5 voor women and 0.7 for men
   var R;                        
   if (query('[name="gender"]:checked') != null) 
   {
      if (query('[name="gender"]:checked').value == "female") 
      {
         var R = 0.5;
      }
      else if (query('[name="gender"]:checked').value == "male") 
      {
         var R = 0.7;
      }
   }   

   // check driver allowed promille
   // 0.5 for experienced, 0.3 for beginner
   var allowedPromille;
   if (query('[name="driver"]:checked') != null) 
   {
      if (query('[name="driver"]:checked').value == "beginner") 
      {
         var allowedPromille = 0.3;
      }
      else if (query('[name="driver"]:checked').value == "experienced") 
      {
         var allowedPromille = 0.5;
      }
   }
   
   // output
   if (weight && glasses && R != null && allowedPromille != null) 
   {
      calculateValues(weight, glasses, R, allowedPromille);
      // dispaly beer bottles
      revealBeers(glasses);
   }
}

// used for calculation of promile
function calculateValues(weight, glasses, R, allowedPromille) {
   
   var injestedPromille = 0; // max promille that person drank
   
   for (let i = 0; i < 8; i++) 
   {
      let time = i;
      let promille =  (10 * glasses) / (weight * R) - (time - 0.5) * (weight * 0.002);

      promille = promille.toFixed(2);
      idGlass = i + 1 + "glass";

      writeValues(promille, idGlass, glasses, allowedPromille);

      // calculate max promille to show fines
      if (promille > injestedPromille) 
      {
         injestedPromille = promille;
      }
   }
   // show fines, based on max promille
   showFines(injestedPromille, allowedPromille);
}

// writes values inside a table and gives them right color
function writeValues(promille, idGlass, glasses, allowedPromille) 
{
   if ( 0 > promille <= allowedPromille) 
   {
      getId(idGlass).textContent = promille;
      getId(idGlass).removeAttribute("style", "color:red;");
   }

   if (promille <= 0) 
   {
      getId(idGlass).textContent = "-";
      getId(idGlass).removeAttribute("style", "color:red;");
   }

   if (promille >=  allowedPromille) 
   {
      getId(idGlass).textContent = promille;
      getId(idGlass).setAttribute("style", "color:red;");
   }

   // correct first value if there are 0 glasses
   if (glasses == 0) 
   {
      getId('1glass').textContent = "-";
      getId('1glass').removeAttribute("style", "color:red;");
   }
}

// shows the fines on the left or hides them, depending on the value
function showFines(injestedPromille, allowedPromille) 
{
   // show text on top if it applies to beginner driver
   if (allowedPromille == 0.3)
   {
      getId("beginnerDriverText").style.display = 'inline';
      getId("extraSpace").style.display = 'none';
      getId("experiencedDriverText").style.display = 'none';
      // getId("beginnerDriverFines").style.display = 'block';
   }
   else if (allowedPromille == 0.5)
   {
      getId("experiencedDriverText").style.display = 'inline';
      getId("extraSpace").style.display = 'none';
      getId("beginnerDriverText").style.display = 'none';
      
   }

   // show text on top if it applies to experienced driver

   // show these fines, if it is a beginner
   if (allowedPromille == 0.3) 
   {
      getId("beginnerDriverFines").style.display = 'block';
      getId("experiencedDriverFines").style.display = 'none';
      
      if (injestedPromille >= 0.3) 
      {
         getId("fine1b").style.visibility = 'visible';
      }
      else 
      {
         getId("fine1b").style.visibility = 'hidden';
      }

      if (injestedPromille >= 0.5) 
      {
         getId("fine2b").style.visibility = 'visible';
      }
      else 
      {
         getId("fine2b").style.visibility = 'hidden';
      }

      if (injestedPromille >= 0.8) 
      {
         getId("fine3b").style.visibility = 'visible';
      }
      else 
      {
         getId("fine3b").style.visibility = 'hidden';
      }

      if (injestedPromille >= 1.3) 
      {
         getId("fine4b").style.visibility = 'visible';
      }
      else 
      {
         getId("fine4b").style.visibility = 'hidden';
      }
   }
   // show these fines, if it is an experienced driver
   else if (allowedPromille == 0.5)
   {
      getId("experiencedDriverFines").style.display = 'block';
      getId("beginnerDriverFines").style.display = 'none';
      
      if (injestedPromille >= 0.5) 
      {
         getId("fine1e").style.visibility = 'visible';
      }
      else 
      {
         getId("fine1e").style.visibility = 'hidden';
      }

      if (injestedPromille >= 0.8) 
      {
         getId("fine2e").style.visibility = 'visible';
      }
      else 
      {
         getId("fine2e").style.visibility = 'hidden';
      }

      if (injestedPromille >= 1) 
      {
         getId("fine3e").style.visibility = 'visible';
      }
      else 
      {
         getId("fine3e").style.visibility = 'hidden';
      }

      if (injestedPromille >= 1.8) 
      {
         getId("fine4e").style.visibility = 'visible';
      }
      else 
      {
         getId("fine4e").style.visibility = 'hidden';
      }
   }
}
   

// shows bottles of beer for visualisation
function revealBeers(glasses) 
{
   for (let i = 1; i < 11; i++) 
   {
      var element = getId("bottle" + i);
      if (i <= glasses) 
      {
         element.style.visibility = 'visible';
      }

      if (i > glasses) 
      {
         element.style.visibility = 'hidden';
      }
          
   }
}

// displays the little explanation box
function displayInfo() 
{
   var element = getId("explanation");
   var style = window.getComputedStyle(element);

   if (style.visibility === 'hidden') 
   {
      element.style.visibility = 'visible';
   }
   else if (style.visibility === 'visible') 
   {
      element.style.visibility = 'hidden';
   }
}


// makes weight and amount of glasses editable via arrows
function arrowFunctions(buttonPressed) 
{
   if (buttonPressed == 'weightUp') 
   {
      let element = getId('weight');
      let inputValue = parseInt(element.value);
      let finalValue = inputValue + 1;
      element.value = finalValue;
      // executes event, otherwise it doesn't autoupdate
      let event = new Event('change');
      element.dispatchEvent(event);
   }

   if (buttonPressed == 'weightDown') 
   {
      let element = getId('weight');
      let inputValue = parseInt(element.value);
      let finalValue = inputValue - 1;
      element.value = finalValue;
      let event = new Event('change');
      element.dispatchEvent(event);
   }
   

   if (buttonPressed == 'glassesUp') 
   {
      let element = getId('glasses');
      let inputValue = parseInt(element.value);
      let finalValue = inputValue + 1;
      element.value = finalValue;
      let event = new Event('change');
      element.dispatchEvent(event);
   }
   

   if (buttonPressed == 'glassesDown') 
   {
      let element = getId('glasses');
      let inputValue = parseInt(element.value);
      let finalValue = inputValue - 1;
      // glasses cannot be more than 0
      if (finalValue < 0) 
      {
         finalValue = 0;
      }
      element.value = finalValue;
      let event = new Event('change');
      element.dispatchEvent(event);
   }
}