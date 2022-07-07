AFRAME.registerComponent('button', {
    schema: {
      label: {default: 'label'},
      width: {default: 0.11},
      toggable: {default: false}
    },

    init: function () {
      //get the button element
      var el = this.el;
      //create label element
      var labelEl = this.labelEl = document.createElement('a-entity');
      //check if the button is a direction button
      if(el.getAttribute('type') == 0 || el.getAttribute('type') == 2){
        //set colour to green
        this.color = '#00ff00';
        //make the button a cylinder
        el.setAttribute('geometry', {
          primitive: 'cylinder',
          radius: 0.04,
          height: 0.02
        });
        //check if the button is the forward or back button, then position/flip the labal accordingly
        if(el.getAttribute('type')==0){
          labelEl.setAttribute('rotation', '-90 0 0');
          labelEl.setAttribute('position', '0.004 0.012 0');
        }
        else{
          labelEl.setAttribute('rotation', '-90 180 0');
          labelEl.setAttribute('position', '-0.006 0.012 0');
        }
        //give the label a geometry we can write a texture too
        labelEl.setAttribute('geometry', "primitive: plane; height: 0.07; width: 0.07;")
        //apply texture
        labelEl.setAttribute('material', 'src', 'assets/misc/arrow.png');
        //workaround to allow png transparancy
        labelEl.setAttribute('material', 'transparent', 'false');
        labelEl.setAttribute('material', 'alphaTest', '0.5');
        //add the label as a child of the button
        this.el.appendChild(labelEl);
      }
      //if the button is the launch button
      else if(el.getAttribute('type') == 1){
          //make button red
          this.color = '#ff0000';
          //make the button a slightly taller cylender
          el.setAttribute('geometry', {
            primitive: 'cylinder',
            radius: 0.08,
            height: 0.04
          });
          //position the label
          labelEl.setAttribute('position', '0 0.02 0');
          //rotate the label
          labelEl.setAttribute('rotation', '-90 0 0');
          //add the text to the label
          labelEl.setAttribute('text', {
            value: this.data.label,
            color: 'white',
            align: 'center'
          });
          // add the label as the child of the button
          this.el.appendChild(labelEl);
      }
      // actually set the material of the button to the colour we set earlier
      el.setAttribute('material', {color: this.color});
      //event handler stuff 
      el.setAttribute('pressable', '');
      this.bindMethods();
      el.addEventListener('stateadded', this.stateChanged);
      el.addEventListener('stateremoved', this.stateChanged);
      el.addEventListener('pressedstarted', this.onPressedStarted);
      el.addEventListener('pressedended', this.onPressedEnded);
    },
  
    bindMethods: function () {
      //event handling
      this.stateChanged = this.stateChanged.bind(this);
      this.onPressedStarted = this.onPressedStarted.bind(this);
      this.onPressedEnded = this.onPressedEnded.bind(this);
    },
   
  
    stateChanged: function () {
      //set colour to blue if pressed, or default colour if not pressed
      var color = this.el.is('pressed') ? 'blue' : this.color;
      //set the material colour to color
      this.el.setAttribute('material', {color: color});
      //check if button is shord
      if (this.el.getAttribute('type') == 0 || this.el.getAttribute('type') == 2){
        //check if button is pressed
        if(this.el.is('pressed')){
          //press button
          //this.el.setAttribute('geometry', 'height', 0.005);
          this.el.setAttribute('geometry', 'height', 0.005);
        }
        else{
          //else unpress button
          this.el.setAttribute('geometry', 'height', 0.02);
        }
      }
      else{
        //do the same for the taller button
        if(this.el.is('pressed')){
          this.el.setAttribute('geometry', 'height', 0.01);
        }
        else{
          this.el.setAttribute('geometry', 'height', 0.04);
        }
      }
    },
  //
    onPressedStarted: function () {
      //get element of button
      var el = this.el;
      //set colour to blue as it is being pressed
      el.setAttribute('material', {color: 'blue'});
      //send click signal
      el.emit('click');
    },
  
    onPressedEnded: function () {
      //check if el is pressed
      if (this.el.is('pressed')) { return; }
      //set colour if not pressed
        this.el.setAttribute('material', {color: this.color});
    }
  });