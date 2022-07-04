AFRAME.registerComponent('event-manager', {

    init: function () {
      //init pic id and pic count
      this.picId = 1;
      this.picCount = 7;
      //event handler boilerplate
      this.bindMethods();

      //get the text elements
      var infoTXT = document.getElementById("infoContent");
      var zoneTXT = document.getElementById("zoneContent");
      var spotTXT = document.getElementById("spotContent");
      //get the screen element
      this.screenEl = document.querySelector('#photoPlane');
      //get the button elements
      this.nextButtonEl = document.querySelector('#nextButton');
      this.enterButtonEl = document.querySelector('#enterButton');
      this.backButtonEl = document.querySelector('#backButton');
      //add event listners to the buttons
      this.nextButtonEl.addEventListener('click', this.onClick);
      this.enterButtonEl.addEventListener('click', this.onClick);
      this.backButtonEl.addEventListener('click', this.onClick);

      //----LOOKUP TABLES FOR SCROLLING----//
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
      this.titlePosMap = {
        0: "-0.6 -0.6 0",
        1: "0 0 0",
        2: "0 0 0",
        3: "0 0 0",
        4: "0 0 0",
        5: "0 0 0",
        6: "0 0 0"
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

      this.infoPosMap = {
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
      
      this.areaPosMap = {
        0: "-0.8 1.4 0",
        1: "-0.8 1.4 0",
        2: "-0.8 1.4 0",
        3: "-0.8 1.4 0",
        4: "",
        5: "",
        6: ""
      };

      this.screenEl.setAttribute('material', 'src',  this.thumbnailMap[this.picId]);
      infoTXT.setAttribute('value', this.infoMap[this.picId]);
      zoneTXT.setAttribute('value', this.areaMap[this.picId]);
      spotTXT.setAttribute('value', this.titleMap[this.picId]);
      /*this.infoTXT.setAttribute('position', this.infoPosMap[this.picId]);
      this.zoneTXT.setAttribute('position', this.areaPosMap[this.picId]);
      this.spotTXT.setAttribute('position', this.titlePosMap[this.picId]);*/
    },
    
  
    bindMethods: function () {
      //onclick handler boilerplate
      this.onClick = this.onClick.bind(this);
    },
  
    onClick: function (evt) { //Button Click handler
      var targetEl = evt.target;
        //change picture id so that it scrolls
        if(targetEl==this.nextButtonEl){
            this.picID += 1;
        }
        if(targetEl==this.backButtonEl){
            this.picID -= 1;
        }

        // check if the image is out of bounds and wrap around to the first/last image
        if(this.picId==-1){
            this.picId=this.picCount-1;
        }
        else if (this.picId==this.picCount){
            this.picId=0;
        }

        //if button is the enter button send the user to the required page
        if(targetEl==this.enterButtonEl){
            window.location.href = this.linkMap[this.picId];
            targetEl.addState('pressed');
        }
      
      //change Picture
      this.screenEl.setAttribute('material', 'src',  this.thumbnailMap[this.picId]);
      //change txt
      this.infoTXT.setAttribute('value', this.infoMap[this.picId]);
      this.zoneTXT.setAttribute('value', this.areaMap[this.picId]);
      this.spotTXT.setAttribute('value', this.titleMap[this.picId]);
      //align text
      /*this.infoTXT.setAttribute('position', this.infoPosMap[this.picId]);
      this.zoneTXT.setAttribute('position', this.areaPosMap[this.picId]);
      this.spotTXT.setAttribute('position', this.titlePosMap[this.picId]);*/
    }
  });

