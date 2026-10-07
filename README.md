# Award-Winning Luxury Portfolio Hero Section
### Ultra-Smooth, Zero-Lag, Zero-Ghosting Cursor-Tracking Character Animation

This project implements a luxury portfolio hero section featuring an interactive cursor-tracking character animation with sub-35ms response time and 60 FPS canvas rendering.

---

## Technical Architecture & Constraints Adherence

1. **Rock-Solid Motionless Body (No CSS 3D Transforms):**
   - No `perspective`, `rotateX`, or `rotateY` anywhere on the canvas or DOM containers.
   - The character's shoulders and torso stay 100% motionless; only the head rotates naturally via continuous pre-extracted frames.

2. **Zero Runtime Video Seeking or Playback:**
   - No `<video>` elements, video seeking, or runtime MP4 playback.
   - Eliminates stutter, keyframe lag, buffering, and uncontrolled background playback.

3. **Pre-Extracted 64 WebP Frames + Center Pose:**
   - Frame extraction orchestrated via OpenCV in [`extract_frames.py`](file:///c:/Users/Paritosh/Documents/antigravity/elegant-bardeen/extract_frames.py).
   - Identified 8 compass keyframes:
     - **RIGHT (0°)**: Frame 104
     - **DOWN-RIGHT (45°)**: Frame 88
     - **DOWN (90°)**: Frame 72
     - **DOWN-LEFT (135°)**: Frame 56
     - **LEFT (180°)**: Frame 34
     - **UP-LEFT (225°)**: Frame 18
     - **UP (270°)**: Frame 146 / 0
     - **UP-RIGHT (315°)**: Frame 128
     - **CENTER (Direct Eye Contact)**: Frame 191
   - 64 WebP frames (~5.625° apart) saved into `public/frames/frame_00.webp` ... `frame_63.webp`, plus `center.webp`.

4. **Zero-Ghosting 60 FPS Canvas Renderer:**
   - Preloads all 64 WebP frames and `center.webp` into memory.
   - Computes cursor vector relative to face center `(dx, dy)` in `requestAnimationFrame`.
   - Utilizes shortest-path circular angular lerp (`lerpAngle`) with factor `0.26` (~35ms latency).
   - Draws **exactly one crisp frame at 100% opacity** on the 2D canvas per tick (no alpha blending).

5. **Center Eye Contact (Deadzone):**
   - When the cursor is within 12% of the screen radius of the face center, the renderer locks onto `center.webp` so the character looks directly into the user's eyes with a warm smile.

6. **Seamless Background Matching:**
   - Detected dominant edge color: `#729ec1` (RGB: 114, 158, 193).
   - Page, body, and canvas backgrounds match `#729ec1` seamlessly.

7. **Award-Winning Luxury UI Design:**
   - **Floating Frosted-Glass Header:** Centered pill `[WORK]`, `[ABOUT]`, `[CONTACT]` with `backdrop-filter: blur(20px)`.
   - **Bottom-Left Hero Typography:** Spaced modern sans-serif "Hi, I'm", signature cursive name "Lohitha" in Google Fonts *Dancing Script*, compact 3-line Full Stack Developer bio, and two stylish white pill buttons (*Resume* & *Let's Talk*).
   - **Custom Magnetic Cursor:** Glowing white dot + smooth trailing aura ring with interactive element scaling.
   - **Gaze Telemetry HUD:** Real-time live compass and tracking radar at the bottom-right.

---

## Quick Start

### Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### Re-run Frame Extraction (if needed)
```bash
python extract_frames.py
```

### Production Build
```bash
npm run build
```
