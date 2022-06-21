AFRAME.registerComponent('event-manager', {

    init: function () {
      this.picId = 0;
      this.picCount = 2;
      this.bindMethods();

      this.screenEl = document.querySelector('#photoPlane');
      this.nextButtonEl = document.querySelector('#nextButton');
      this.enterButtonEl = document.querySelector('#enterButton');
      this.backButtonEl = document.querySelector('#backButton');
  
      this.nextButtonEl.addEventListener('click', this.onClick);
      this.enterButtonEl.addEventListener('click', this.onClick);
      this.backButtonEl.addEventListener('click', this.onClick);

      this.linkMap = {
        0: "gallery/art.html",
        1: "gallery/bush.html",
      };
      this.thumbnailMap = {
        0: "../assets/Art.JPG",
        1: "../assets/Bush.JPG",
      };
      console.log(this.thumbnailMap[this.picId]);
      console.log(this.screenEl.getAttribute("material"));
      this.screenEl.getAttribute("material").src = this.thumbnailMap[this.picId];
    },
    
  
    bindMethods: function () {
      this.onClick = this.onClick.bind(this);
    },
  
    onClick: function (evt) { //Button Click handeler
      var targetEl = evt.target;
        if(targetEl==this.nextButtonEl){
            this.picID += 1;
        }
        if(targetEl==this.backButtonEl){
            this.picID -= 1;
        }
        if(this.picId==-1){
            this.picId=this.picCount-1;
        }
        else if (this.picId==this.picCount){
            this.picId=0;
        }
        if(targetEl==this.enterButtonEl){
            window.location.href = this.linkMap[this.picId];
            targetEl.addState('pressed');

        }
        //change Picture add animations
        this.screenEl.getAttribute("material").src = this.thumbnailMap[this.picId];
    }
  });