// komisch, in html funktioniert, getrennt - nicht
var images = new Array(); // Sammlung von Werten
  var actualBigImage = 0; 
  var bigImage = document.querySelector("#bigimage");
  var overlay = document.querySelector("#overlay");

  var imgNumber = 0;
  Array.prototype.forEach.call(document.querySelectorAll(".bild"), function( element ) {
  // "Array.prototype.forEach.call" ausfüllt eine Funktion für alle El-te innerhalb des Dokumentes, die den Klassennamen "bild" haben
  // Einzelne El-te, die diesen Klassennamen haben, stehen innerhalb der Finktion in der Variable "element" zur Verf
    element.setAttribute("data-number", imgNumber++);
  // fur jedes El-t ein neues Attribut "data-number", das zählen wir hoch
  // jedes Mal, wenn wir diesen Attribut setzen, wird der Wert von "imgNumber" hochgesetzt
    var style = window.getComputedStyle(element, false);
  // holt von diesem El-t stylesheet-Angabe - das Hontergrundbild für dieses List-Item
    images.push( style.backgroundImage.slice( 4, -1).replace(/"/g,"") );

    element.addEventListener("click", function(){
      showOverlay( this );
  // wenn man aufs Bild klickt, wird "showOverlay"-Funktion ausgeführt
  // this - El-t, auf dem genau gecklickt wurde
    })
  });
  
  function showOverlay( element ){
    actualBigImage = element.dataset.number; // holt Nummer aus dem Bild heraus und speichert in der Variable "actualBigImage"
    bigImage.setAttribute("src", images[ actualBigImage ]); // setzt Attribut "src" auf das große Bild
    overlay.setAttribute("style","display:block;"); // zeigt overlay
  }

  bigImage.addEventListener("click", function( event){
    actualBigImage++; // zählt aktuele Bildzähler um 1 hoch
    
    actualBigImage %= images.length; //wenn man beim 4.Bild ist, fängt alles von vorne
    showBigImage();
  })

  bigImage.addEventListener("dblclick", closeOverlay); // Doppelklick aufs Bild

  function showBigImage(){      
    bigImage.setAttribute("src", images[ actualBigImage ]); // automatisch wird neues Bild angezeigt
  }

  function closeOverlay(){
    overlay.setAttribute("style","display:none;"); // close-button
  }

  document.getElementById("closeOverlayButton").addEventListener('click', closeOverlay );

// Tastaturpfeile
  document.addEventListener('keydown', function(event){
    switch( event.keyCode ){
      case 32: case 39: // Leertaste, rechts
          actualBigImage++;
      break;
      case 37: // links
          actualBigImage--;
      break;
      case 27: // ESC
          closeOverlay();
          break;
      default: // wenn nicht die richtige Taste gedrückt wird, sehe ich in der console Tastennummer
          console.log(  event.keyCode);
  }
    
    if( actualBigImage == images.length ) actualBigImage = 0;
    if( actualBigImage == -1 ) actualBigImage = images.length - 1;

    showBigImage(); // lass mich das große Bild anzeigen
  });

  