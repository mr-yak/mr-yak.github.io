AFRAME.registerComponent('event-manager', {

    init: function () {
      this.bindMethods();

      this.nextButtonEl = document.querySelector('#nextButton');
      this.enterButtonEl = document.querySelector('#enterButton');
      this.tbackButtonEl = document.querySelector('#backButton');
  
      this.nextButtonEl.addEventListener('click', this.onClick);
      this.enterButtonEl.addEventListener('click', this.onClick);
      this.backButtonEl.addEventListener('click', this.onClick);
      this.boxButtonEl.addState('pressed');
    },
  
    bindMethods: function () {
      this.onClick = this.onClick.bind(this);
    },
  
    onClick: function (evt) { //Button Click handeler
      var targetEl = evt.target;
        this.nextButtonEl.removeState('pressed');
        this.enterButtonEl.removeState('pressed');
        this.backButtonEl.removeState('pressed');
        targetEl.addState('pressed');
    }
  });