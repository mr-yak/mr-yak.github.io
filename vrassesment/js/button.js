AFRAME.registerComponent('button', {
    schema: {
      label: {default: 'label'},
      width: {default: 0.11},
      toggable: {default: false}
    },
    init: function () {
      var el = this.el;
      var labelEl = this.labelEl = document.createElement('a-entity');
      if(el.getAttribute('type') == 0 || el.getAttribute('type') == 2){
        this.color = '#00ff00';
        el.setAttribute('geometry', {
          primitive: 'cylinder',
          radius: 0.04,
          height: 0.02
        });
        labelEl.setAttribute('position', '0 0.015 -0.05');
        if(el.getAttribute('type')==0){
          labelEl.setAttribute('rotation', '-90 0 0');
        }
        else{
          labelEl.setAttribute('rotation', '-90 180 0');
        }
        labelEl.setAttribute('geometry', "primitive: plane; height: 0.07; width: 0.07;")
        labelEl.setAttribute('material', 'src', 'assets/misc/arrow.png');
        labelEl.setAttribute('material', 'transparent', 'false');
        labelEl.setAttribute('material', 'alphaTest', '0.5');
        this.el.appendChild(labelEl);
      }
      else if(el.getAttribute('type') == 1){
          this.color = '#ff0000';
          el.setAttribute('geometry', {
            primitive: 'cylinder',
            radius: 0.08,
            height: 0.04
          });
          labelEl.setAttribute('position', '0 0.02 0');
          labelEl.setAttribute('rotation', '-90 0 0');
          labelEl.setAttribute('text', {
            value: this.data.label,
            color: 'white',
            align: 'center'
          });
          this.el.appendChild(labelEl);
      }
      el.setAttribute('material', {color: this.color});
      el.setAttribute('pressable', '');
      this.bindMethods();
      this.el.addEventListener('stateadded', this.stateChanged);
      this.el.addEventListener('stateremoved', this.stateChanged);
      this.el.addEventListener('pressedstarted', this.onPressedStarted);
      this.el.addEventListener('pressedended', this.onPressedEnded);
    },
  
    bindMethods: function () {
      this.stateChanged = this.stateChanged.bind(this);
      this.onPressedStarted = this.onPressedStarted.bind(this);
      this.onPressedEnded = this.onPressedEnded.bind(this);
    },
  
    update: function (oldData) {
      if (oldData.label !== this.data.label) {
        //this.labelEl.setAttribute('text', 'value', this.data.label);
      }
    },
  
    stateChanged: function () {
      var color = this.el.is('pressed') ? 'green' : this.color;
      this.el.setAttribute('material', {color: color});
    },
  
    onPressedStarted: function () {
      var el = this.el;
      el.setAttribute('material', {color: 'green'});
      el.emit('click');
      if (this.data.togabble) {
        if (el.is('pressed')) {
          el.removeState('pressed');
        } else {
          el.addState('pressed');
        }
      }
    },
  
    onPressedEnded: function () {
      if (this.el.is('pressed')) { return; }
        this.el.setAttribute('material', {color: this.color});
    }
  });