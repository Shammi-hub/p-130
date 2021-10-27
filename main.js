song = "";
song2 = "";

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
   
}
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightwristX = 0;
rightwristY = 0;

leftwristX = 0;
leftwristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(" scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);


        rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightwristX + "rightWristY = "+ rightwristY);

    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftwristX + "leftWristY = "+ leftwristY);

    }
    
}
song_1 = "true";
song_2 = "false";


function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    { 
        circle(rightwristX, rightwristY,20);
      song2.stop();
      if(song_1 == "true"){
          song.play();
      document.getElementById("play").innerHTML = "Song played was Song 1";
      song_2 = "true";
      song_1 = "false";
      }
      

    }

    if(scoreLeftWrist > 0.2)
    { 
        circle(leftwristX, leftwristY,20);
        song.stop();
        if(song_2 == "true")
        {
            song1.play();
            document.getElementById("play").innerHTML = "Song played was Song 2";
            song_1 = "true";
            song_2 = "false";
        }
    }
    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
