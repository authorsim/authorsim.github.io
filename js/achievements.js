const achieve = (function() {

  //
  // Drag and Drop
  //

  window.setTimeout(() => {
    // Define droppable areas
    let activePerks = document.querySelectorAll('.activePerk')
    for (let i = 0; i < activePerks.length; i++) {
      activePerks[i].addEventListener('dragover', function(e){
        console.log(e.dataTransferItemList)
        e.preventDefault()
        if (e.target.innerHTML === e.dataTransfer.items) {
          e.dataTransfer.dropEffect = 'none'
        } else {
          e.dataTransfer.dropEffect = 'copy'
        }
      }, false)
      activePerks[i].addEventListener('drop', function(e){
        e.preventDefault()
        this.innerHTML = e.dataTransfer.getData('text/html')
      }, false)
    }

    //Define draggable areas
    let perks = document.querySelectorAll('.perk')
    for (let i = 0; i < perks.length; i++) {
      perks[i].addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'copy'
        e.dataTransfer.setData('text/html', e.target.innerHTML)
        e.dataTransfer.setDragImage(e.target,50,50)
      }, false)
      perks[i].addEventListener('dragenter', function(e) {
        e.preventDefault()
        return true
      }, false)
      perks[i].addEventListener('drop', function(e){
        if (e.stopPropogation) {
          e.stopPropagation()
        }
        this.innerHTML = e.dataTransfer.getData('text/html')
        return false
      }, false)
    }
	}, 1000)

  return {
    // Animation for fading in and then out an alert box
    achieveAlert: (title, desc) => {
    	$('#achieve').fadeTo(500, 0.8)
    	$('#achieveTitle').text(title)
    	$('#achieveDesc').text(desc)

      // After 7 seconds, fades the window back out
    	window.setTimeout(() => {
    	   $('#achieve').fadeTo(500, 0)
    	}, 7000)
    }
  }
}())
