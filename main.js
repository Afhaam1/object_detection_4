img = ""
status = ""
object = []
function setup(){;
 canvas = createCanvas(380, 380);
 canvas.center();
 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide();
};
function modelLoaded(){
   
    status = true;
    console.log("modelLoaded")
}
function gotResult(error , result){
    if(error){
        console.error(error)
    }console.log(result)
    object = result
}
function draw(){
    image(video, 0, 0, 380, 380);
    if( status != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video ,gotResult);
        for ( i=0;i < object.length ;i++){
        document.getElementById("status").innerHTML = "status: object detected"
        document.getElementById("Number_of_objects").innerHTML = "The number of objects are "+ object.length;
    fill(r, g, b);
     percent = floor(object[i].confidence*100)
    text( object[i].label + " " + percent + "%" ,object[i].x + 15 , object[i].y + 15)
    stroke(r, g, b);
    noFill();
    rect( object[i].x, object[i].y, object[i].width, object[i].height);
     }
    }

}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : Dectecting Objects";
}