/*
 * Food Class - Simplified Version
 */

class Food {
    constructor(x, y, size, color1, color2, shape) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.mainColor = color1;
        this.accentColor = color2;
        this.shape = shape;
        this.collected = false;
        this.floatOffset = random(TWO_PI);
    }
    
    display() {
        if (this.collected) return;
        
        push();
        translate(this.x, this.y);
        
        // Simple floating animation
        let floatY = sin(frameCount * 0.05 + this.floatOffset) * 3;
        translate(0, floatY);
        
        if (this.shape === 0) {
            // Circle food (berry)
            fill(this.mainColor);
            noStroke();
            ellipse(0, 0, this.size, this.size);
            
            fill(255, 255, 255, 150);
            ellipse(-3, -3, this.size/4, this.size/4);
            
            // Seeds
            fill(this.accentColor);
            for (let i = 0; i < 3; i++) {
                let angle = (TWO_PI / 3) * i;
                let x = cos(angle) * this.size/4;
                let y = sin(angle) * this.size/4;
                ellipse(x, y, 3, 3);
            }
        } else {
            // Square food (cracker)
            fill(this.mainColor);
            noStroke();
            rectMode(CENTER);
            rect(0, 0, this.size, this.size, 3);
            
            // Holes
            fill(this.accentColor);
            ellipse(-5, -5, 4, 4);
            ellipse(5, 5, 4, 4);
            ellipse(5, -5, 3, 3);
            ellipse(-5, 5, 3, 3);
        }
        
        pop();
    }
}
