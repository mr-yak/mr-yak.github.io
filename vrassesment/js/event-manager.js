AFRAME.registerComponent('event-manager', {

    init: function () {
      this.picId = 0;
      this.picCount = 7;
      this.bindMethods();

      this.screenEl = document.querySelector('#photoPlane');
      this.nextButtonEl = document.querySelector('#nextButton');
      this.enterButtonEl = document.querySelector('#enterButton');
      this.backButtonEl = document.querySelector('#backButton');
  
      this.nextButtonEl.addEventListener('click', this.onClick);
      this.enterButtonEl.addEventListener('click', this.onClick);
      this.backButtonEl.addEventListener('click', this.onClick);

      this.linkMap = {
        0: "galleryhtml/container.html",
        1: "galleryhtml/forest.html",
        2: "galleryhtml/lagoon.html",
        3: "galleryhtml/river.html",
        4: "galleryhtml/path.html",
        5: "galleryhtml/woods.html",
        6: "galleryhtml/seat.html"
      };
      this.thumbnailMap = {
        0: "assets/thumbnails/container_t.JPG",
        1: "assets/thumbnails/forest_t.JPG",
        2: "assets/thumbnails/lagoon_t.JPG",
        3: "assets/thumbnails/river_t.JPG",
        4: "assets/thumbnails/path_t.JPG",
        5: "assets/thumbnails/woods_t.JPG",
        6: "assets/thumbnails/seat_t.JPG"
      };

      this.titleMap = {
        0: "The Shed",
        1: "The Forest",
        2: "The Lagoon",
        3: "The River",
        4: "The Path",
        5: "The Woods",
        6: "The Seat"
      };

      this.infoMap = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: ""
      };

      this.areaMap = {
        0: "Kristin Forest",
        1: "Kristin Forest",
        2: "Kristin Forest",
        3: "Kristin Forest",
        4: "Lucas Creek",
        5: "Lucas Creek",
        6: "Lucas Creek"
      };
      this.screenEl.setAttribute('material', 'src',  this.thumbnailMap[this.picId]);
    },
    
  
    bindMethods: function () {
      this.onClick = this.onClick.bind(this);
    },
  
    onClick: function (evt) { //Button Click handler
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
        //change Picture
        this.screenEl.setAttribute('material', 'src',  this.thumbnailMap[this.picId]);
        //add text changer
    }
  });

