/*
 * Classes and Arrays Assignment - Simple Character Animation
 * Student Name: Grant Grady
 * 
 * Features:
 * - Simple character with idle and walk animations
 * - Animation switching based on movement
 * - Food class with multiple objects
 */

// Character animation arrays - SIMPLE FRAMES
let idleFrames = [];
let walkFrames = [];
let currentAnimation = [];
let currentFrame = 0;
let frameCounter = 0;
const ANIMATION_SPEED = 10;

// Character position
let characterX = 400;
let characterY = 300;
let characterSpeed = 3;

// Movement flags
let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;

// Food objects array
let foods = [];
const NUM_FOODS = 5;

// Score
let score = 0;

function setup() {
    createCanvas(800, 600);
    
    createAnimations();
    
    createFoods();
}

function draw() {
    background(135, 206, 235);
    
    drawGround();
    
    handleMovement();
    
    updateAnimation();
    
    drawCharacter();
    
    for (let i = 0; i < foods.length; i++) {
        foods[i].display();
    }
    
    checkFoodCollection();
    
    drawUI();
    
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Simple Character Animation", 20, 30);
    
    fill(255);
    textSize(14);
    textAlign(RIGHT);
    text("Created by [Your Name]", width - 20, height - 20);
}

function createAnimations() {
    idleFrames = [
        { offset: 0 },
        { offset: 2 },
        { offset: 0 },
        { offset: -2 }
    ];
    
    walkFrames = [
        { offset: 0, legOffset: 3 },
        { offset: 2, legOffset: 0 },
        { offset: 0, legOffset: -3 },
        { offset: -2, legOffset: 0 }
    ];
    
    currentAnimation = idleFrames;
}

function createFoods() {
    // Create 5 unique food objects
    for (let i = 0; i < NUM_FOODS; i++) {
        let x = random(100, 700);
        let y = random(150, 450);
        let size = random(20, 40);
        
        let r = random(100, 255);
        let g = random(100, 255);
        let b = random(100, 255);
        let color1 = color(r, g, b);
        
        let r2 = random(50, 200);
        let g2 = random(50, 200);
        let b2 = random(50, 200);
        let color2 = color(r2, g2, b2);
        
        let shape = floor(random(2));
        
        foods[i] = new Food(x, y, size, color1, color2, shape);
    }
}

function drawGround() {
    fill(100, 200, 100);
    noStroke();
    rect(0, height - 80, width, 80);
    
    // Simple grass
    stroke(50, 150, 50);
    strokeWeight(1);
    for (let x = 0; x < width; x += 15) {
        line(x, height - 80, x + random(-5, 5), height - 95);
    }
}

function handleMovement() {
    if (movingUp) characterY -= characterSpeed;
    if (movingDown) characterY += characterSpeed;
    if (movingLeft) characterX -= characterSpeed;
    if (movingRight) characterX += characterSpeed;
    
    characterX = constrain(characterX, 40, width - 40);
    characterY = constrain(characterY, 40, height - 100);
    
    if (movingUp || movingDown || movingLeft || movingRight) {
        currentAnimation = walkFrames;
    } else {
        currentAnimation = idleFrames;
    }
}

function updateAnimation() {
    frameCounter++;
    
    if (frameCounter >= ANIMATION_SPEED) {
        frameCounter = 0;
        currentFrame++;
        
        if (currentFrame >= currentAnimation.length) {
            currentFrame = 0;
        }
    }
}

function drawCharacter() {
    push();
    translate(characterX, characterY);
    
    let frame = currentAnimation[currentFrame];
    let yOffset = frame.offset || 0;
    
    // Body (simple rectangle)
    fill(100, 150, 200); // Blue shirt
    noStroke();
    rectMode(CENTER);
    rect(0, 0 + yOffset, 30, 40, 5);
    
    // Head
    fill(255, 220, 180);
    ellipse(0, -25 + yOffset, 25, 25);
    
    // Eyes
    fill(0);
    ellipse(-6, -30 + yOffset, 3, 4);
    ellipse(6, -30 + yOffset, 3, 4);
    
    // Smile
    stroke(0);
    strokeWeight(1);
    noFill();
    arc(0, -23 + yOffset, 10, 5, 0, PI);
    
    // Legs - with walk animation if available
    stroke(50, 50, 150);
    strokeWeight(5);
    
    let legOffset = frame.legOffset || 0;
    
    // Left leg
    line(-8, 20 + yOffset, -15, 35 + yOffset + legOffset);
    
    // Right leg
    line(8, 20 + yOffset, 15, 35 + yOffset - legOffset);
    
    pop();
}

function checkFoodCollection() {
    for (let i = 0; i < foods.length; i++) {
        let d = dist(characterX, characterY, foods[i].x, foods[i].y);
        
        if (d < 35 && !foods[i].collected) {
            foods[i].collected = true;
            score++;
            
            setTimeout(() => {
                if (foods[i]) {
                    foods[i].x = random(100, 700);
                    foods[i].y = random(150, 450);
                    foods[i].collected = false;
                }
            }, 1500);
        }
    }
}

function drawUI() {
    // Score
    fill(255);
    textSize(24);
    textAlign(RIGHT);
    text("Score: " + score, width - 50, 50);
    
    // Instructions
    textSize(14);
    textAlign(CENTER);
    text("Use WASD to move • Collect food", width/2, 70);
    
    // Animation info
    textSize(12);
    text("Animation: " + (currentAnimation === idleFrames ? "Idle" : "Walking") + 
         " • Frame: " + (currentFrame + 1), width/2, 90);
}

function keyPressed() {
    if (key === 'w' || key === 'W') movingUp = true;
    if (key === 's' || key === 'S') movingDown = true;
    if (key === 'a' || key === 'A') movingLeft = true;
    if (key === 'd' || key === 'D') movingRight = true;
    
    return false;
}

function keyReleased() {
    if (key === 'w' || key === 'W') movingUp = false;
    if (key === 's' || key === 'S') movingDown = false;
    if (key === 'a' || key === 'A') movingLeft = false;
    if (key === 'd' || key === 'D') movingRight = false;
    
    return false;
}

function mousePressed() {
    let size = random(20, 40);
    let r = random(100, 255);
    let g = random(100, 255);
    let b = random(100, 255);
    let color1 = color(r, g, b);
    
    let r2 = random(50, 200);
    let g2 = random(50, 200);
    let b2 = random(50, 200);
    let color2 = color(r2, g2, b2);
    
    let shape = floor(random(2));
    
    let newFood = new Food(mouseX, mouseY, size, color1, color2, shape);
    foods.push(newFood);
}