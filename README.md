# Classes and Arrays Assignment - Simple Character Animation

## Name: Grant Grady

## Project Overview
An interactive animation project demonstrating classes, arrays, and animation techniques in p5.js. Features a simple character with idle and walking animations, plus collectible food objects.

## Features Implemented

### ✅ Character Animation (Requirements 1)
- **Two animation sets** stored in arrays:
  - `idleFrames` (4 frames) - gentle bouncing up and down
  - `walkFrames` (4 frames) - bouncing with leg movement
- **Animation switching** based on movement (idle → walk when using WASD)
- **Frame counter** (`ANIMATION_SPEED = 10`) controls animation timing
- **Smooth looping** through animation frames using modulo operator
- Each frame stored as simple object with offset values

### ✅ Food Class (Requirements 2, 3, 4)
- **Food class** (in `food.js`) with properties:
  - Position (x, y)
  - Size (20-40px)
  - Colors (mainColor, accentColor)
  - Shape type (0 = circle/berry, 1 = square/cracker)
  - Collected status (boolean)
  - Float offset for animation
- **Display function** with shape-specific drawing:
  - Circle shape: berry with seeds and highlight
  - Square shape: cracker with hole details
- **5 food objects** (meets minimum requirement)
- **Each food is unique**:
  - Different positions (randomly placed on canvas)
  - Different sizes (random between 20-40px)
  - Different colors (random RGB values for main and accent)
  - Different shapes (randomly circle or square)

### ✅ Additional Features
- **Interactive movement** (WASD keys)
- **Food collection** with score tracking (character touches food)
- **Food respawn** after collection (moves to new position after 1.5 seconds)
- **Click to add** new food objects at mouse position
- **Visual feedback** with floating animation (food gently bobs up and down)
- **Proper folder structure** (index.html, js/, libs/)
- **Title in upper-left corner**
- **Name in lower-right corner**

## How Animations Work

### Idle Animation (4 frames)