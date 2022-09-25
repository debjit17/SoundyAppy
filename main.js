song = "";

function preload()
{
    song = loadSound("my.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
leftWristX = 0;

rightWristY = 0;
leftWristY = 0;

function setup()
{
    console.log("Hello ");
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}

function modelLoaded()
{
    console.log("Model Loaded... Initialized.. Ready To Be Used...");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist =results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

    if(scoreRightWrist && scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        InNumberrightWristY = Number(rightWristY);
        new_rightWristY = floor(InNumberrightWristY * 2);
        rightWristY_divide_1000 = new_rightWristY/1000;
        document.getElementById("volume").innerHTML = "Volume = " + rightWristY_divide_1000;
        song.setVolume(rightWristY_divide_1000)
    }

    if(scoreLeftWrist && scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        if(leftWristy > 0 && leftWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(leftWristy > 100 && leftWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(leftWristy > 200 && leftWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(leftWristy > 300 && leftWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(leftWristy > 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function start()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}