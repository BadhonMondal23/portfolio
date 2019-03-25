var button, x, y;
var pos, vel, lim;

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    pos = createVector(width / 2, height / 2);
    vel = createVector(0, 0);
    button = createButton('Catch Me');
    button.position(pos.x, pos.y)
    button.mousePressed(hit)
    noStroke();
    lim = 8;
}

function draw() {
    button.position(pos.x, pos.y);
}

function mouseDragged() {
    mouseMoved();
}

function mouseMoved() {
    goTo();
    edges();
    noStroke();

    if (random(1) > 0.2) {
        var r = random(10, 20)
        fill(200, 0, 0, r);
        ellipse(pos.x + 20, pos.y, r, r);
    }

    ellipse(pos.x + 20, pos.y, r / 2, r / 2);
    stroke(255, 180, 255, 120);

    if (pmouseX !== 0) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}


function goTo() {
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, pos);

    if (abs(dir.x) < 100 && abs(dir.y) < 100) {
        dir.normalize();
        dir.mult(-1.5);
        accel = dir;

        vel.add(accel);
        lim -= 0.01;
        vel.limit(lim);
        pos.add(vel);

    }

}

function edges() {
    if (pos.x > width || pos.x < 0 || pos.y > height || pos.y < 0) {
        pos.x = random(width - 100);
        pos.y = random(height - 100);
    }
}


function hit() {
    fill(220, 0, 0);
    stroke(220, 0, 0, 100);
    ellipse(pos.x, pos.y, 50, 50);
    line(pos.x - 25, pos.y, pos.x + 25, pos.y);
    line(pos.x, pos.y - 25, pos.x, pos.y + 25);

    fill(255, 255, 255);
    noStroke();
    textFont("Helvetica");
    textSize(16);
    text("Ah!", pos.x - 15, pos.y + 5)
    pos.x = random(width);
    pos.y = random(height);
    lim = 8;
};

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
    pos.x = width / 2;
    pos.y = height / 2;
};