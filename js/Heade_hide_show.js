var main = document.querySelector('.container');
var prevScrollpos = main.scrollTop;

main.addEventListener('scroll', function () {
  var currentScrollPos = main.scrollTop;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "5%";
  } else {
    document.getElementById("header").style.top = "-10%";
  }
  prevScrollpos = currentScrollPos;
});
