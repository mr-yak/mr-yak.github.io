/* global AFRAME */
AFRAME.registerComponent('highlight', {
    init: function () {
      var buttonEls = this.buttonEls = this.el.querySelectorAll('.menu-button');
      this.onClick = this.onClick.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      for (var i = 0; i < buttonEls.length; ++i) {
        buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
        buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
        buttonEls[i].addEventListener('click', this.onClick);
      }
    },
  
    onClick: function (evt) {
      alert(gone);
      //window.location.href = "../index.html";
    },
  
    onMouseEnter: function (evt) {
      var buttonEls = this.buttonEls;
      evt.target.setAttribute('material', 'color', '#046de7');
      for (var i = 0; i < buttonEls.length; ++i) {
        if (evt.target === buttonEls[i]) { continue; }
        buttonEls[i].setAttribute('material', 'color', 'white');
      }
    },
  
    onMouseLeave: function (evt) {
      evt.target.setAttribute('material', 'color', 'white');
    },
  });