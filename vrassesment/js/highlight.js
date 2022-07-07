/* global AFRAME */
AFRAME.registerComponent('highlight', {
    init: function () {
      //get buttons
      var buttonEls = this.buttonEls = this.el.querySelectorAll('.menu-button');
      //event handling
      this.onClick = this.onClick.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      for (var i = 0; i < buttonEls.length; ++i) {
        //event handlers
        buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
        buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
        buttonEls[i].addEventListener('click', this.onClick);
      }
    },
  
    onClick: function (evt) {
      //on click it redirects
      window.location.href = "../index.html";
    },
  
    onMouseEnter: function (evt) {
      //when mouse enters- animate
      var buttonEls = this.buttonEls;//get button element
      //set colour of selected button
      evt.target.setAttribute('material', 'color', '#046de7');
      //set other buttons to white
      for (var i = 0; i < buttonEls.length; ++i) {
        if (evt.target === buttonEls[i]) { continue; }
        buttonEls[i].setAttribute('material', 'color', 'white');
      }
    },
  
    onMouseLeave: function (evt) {
      //undo animation when mouse leaves
      evt.target.setAttribute('material', 'color', 'white');
    },
  });