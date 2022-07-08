AFRAME.registerComponent('event-manager', {
    init: function () {
      //load all the textures, not using image paths for performance
      this.container_tex= new THREE.TextureLoader().load("assets/thumbnails/container_t.JPG");
      this.forest_tex= new THREE.TextureLoader().load("assets/thumbnails/forest_t.JPG");
      this.lagoon_tex = new THREE.TextureLoader().load("assets/thumbnails/lagoon_t.JPG");
      this.river_tex= new THREE.TextureLoader().load("assets/thumbnails/river_t.JPG");
      this.path_tex= new THREE.TextureLoader().load("assets/thumbnails/path_t.JPG");
      this.woods_tex= new THREE.TextureLoader().load("assets/thumbnails/woods_t.JPG");
      this.seat_tex= new THREE.TextureLoader().load("assets/thumbnails/seat_t.JPG");
      //scene element 
      this.scene = document.querySelector("a-scene");
      //init pic id and pic count
      this.picId = 0;
      this.picCount = 7;
      //event handling
      this.bindMethods();

      //get the text elements
      this.infoTXT = document.getElementById("infoContent");
      this.zoneTXT = document.getElementById("zoneContent");
      this.spotTXT = document.getElementById("spotContent");
      //get the screen element
      this.screenEl = document.querySelector('#photoPlane');
      //get the button elements
      this.nextButtonEl = document.getElementById('nextButton');
      this.enterButtonEl = document.getElementById('enterButton');
      this.backButtonEl = document.getElementById('backButton');
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
        0: this.container_tex,
        1: this.forest_tex,
        2: this.lagoon_tex,
        3: this.river_tex,
        4: this.path_tex,
        5: this.woods_tex,
        6: this.seat_tex
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
        1: "-0.65 -0.6 0",
        2: "-0.7 -0.6 0",
        3: "-0.52 -0.6 0",
        4: "-0.52 -0.6 0",
        5: "-0.54 -0.6 0",
        6: "-0.55 -0.6 0"
      };

      this.infoMap = {
        0: "Kristin forest is located on a small track through the back areas of the Kristin campus. This forest is used by the school for cross country, outdoor education and other educational purpouses. ",
        1: "Kristin forest is located on a small track through the back areas of the Kristin campus. This forest is used by the school for cross country, outdoor education and other educational purpouses. ",
        2: "Kristin forest is located on a small track through the back areas of the Kristin campus. This forest is used by the school for cross country, outdoor education and other educational purpouses. ",
        3: "Kristin forest is located on a small track through the back areas of the Kristin campus. This forest is used by the school for cross country, outdoor education and other educational purpouses. ",
        4: "Lucas creek is a creek that runs through kristin school. Each year the Year 9 kristin students are tasked with creating a project to improve the area. These range from signs, to bench seats, and have made Lucas creek a really nice place.",
        5: "Lucas creek is a creek that runs through kristin school. Each year the Year 9 kristin students are tasked with creating a project to improve the area. These range from signs, to bench seats, and have made Lucas creek a really nice place.",
        6: "Lucas creek is a creek that runs through kristin school. Each year the Year 9 kristin students are tasked with creating a project to improve the area. These range from signs, to bench seats, and have made Lucas creek a really nice place."
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
        4: "-0.75 1.4 0",
        5: "-0.75 1.4 0",
        6: "-0.75 1.4 0"
      };
      //init screen texture
      this.screenEl.setAttribute('material', 'src',  this.thumbnailMap[this.picId]);
      //init text values
      this.infoTXT.setAttribute('value', this.infoMap[this.picId]);
      this.zoneTXT.setAttribute('value', this.areaMap[this.picId]);
      this.spotTXT.setAttribute('value', this.titleMap[this.picId]);
      //init text positions
      this.zoneTXT.setAttribute('position', this.areaPosMap[this.picId]);
      this.spotTXT.setAttribute('position', this.titlePosMap[this.picId]);
    },
    
    update: function (){
      //initiate all the textures, loading them into memory to reduce frame drops on first load on screen
      setTimeout(() => {
        this.scene.renderer.initTexture(this.container_tex);
        this.scene.renderer.initTexture(this.forest_tex);
        this.scene.renderer.initTexture(this.lagoon_tex);
        this.scene.renderer.initTexture(this.river_tex);
        this.scene.renderer.initTexture(this.path_tex);
        this.scene.renderer.initTexture(this.woods_tex);
        this.scene.renderer.initTexture(this.seat_tex);
        //change camera position.
        this.scene.camera.position.z = 0.5;
      }, 200)
    },
  
    bindMethods: function () {
      //onclick handling
      this.onClick = this.onClick.bind(this);
    },
  
    onClick: function (evt) { //Button Click handler
      //the next and back buttons are reversed, but it doesn't affect user experience and can't be bothered changing it.
      var targetEl = evt.target;
      targetEl.addState('pressed');
        //change picture id so that it scrolls
        if(targetEl==this.nextButtonEl){
            this.picId = this.picId - 1;
        }
        if(targetEl==this.backButtonEl){
            this.picId = this.picId + 1;
        }
        // check if the image is out of bounds and wrap around to the first/last image
        if(this.picId== -1){
            this.picId = this.picCount-1;
        }
        else if (this.picId == this.picCount){
            this.picId=0;
        }

        //if button is the enter button send the user to the required page
        if(targetEl==this.enterButtonEl){
            window.location.href = this.linkMap[this.picId];
        }
        
      
      //change Picture
      this.screenEl.setAttribute('material', 'src',  this.thumbnailMap[this.picId]);
      //change txt
      this.infoTXT.setAttribute('value', this.infoMap[this.picId]);
      this.zoneTXT.setAttribute('value', this.areaMap[this.picId]);
      this.spotTXT.setAttribute('value', this.titleMap[this.picId]);
      //align text
      this.zoneTXT.setAttribute('position', this.areaPosMap[this.picId]);
      this.spotTXT.setAttribute('position', this.titlePosMap[this.picId]);
      setTimeout(() => {
        targetEl.removeState('pressed');
      }, 750)
    }
  });

  



