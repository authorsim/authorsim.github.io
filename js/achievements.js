// Animation for fading in and then out an alert box
let achieveAlert = (title, desc) => {
	$('#achieve').fadeTo(500, 0.8)
	$('#achieveTitle').text(title)
	$('#achieveDesc').text(desc)

  // After 7 seconds, fades the window back out
	window.setTimeout(() => {
	   $('#achieve').fadeTo(500, 0)
	}, 7000)
}
