#!/usr/bin/env python3
"""
Frame Extractor for Cursor-Tracking Character Animation
Extracts 64 circular WebP frames along the 360° head rotation trajectory + center neutral frame.
"""

import cv2
import os
import sys

def main():
    video_path = "Character_video.mp4"
    if not os.path.exists(video_path):
        # Fallback check
        if os.path.exists("public/character.mp4"):
            video_path = "public/character.mp4"
        else:
            print(f"Error: {video_path} not found.")
            sys.exit(1)

    print(f"Opening video: {video_path}")
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"Video Info: {width}x{height} @ {fps:.1f} FPS, {total_frames} total frames, duration: {total_frames/fps:.2f}s")

    frames = []
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
    cap.release()

    # Compass directions mapped to verified video keyframes:
    # 0 deg (RIGHT): frame 104
    # 45 deg (DOWN-RIGHT): frame 88
    # 90 deg (DOWN): frame 72
    # 135 deg (DOWN-LEFT): frame 56
    # 180 deg (LEFT): frame 34
    # 225 deg (UP-LEFT): frame 18
    # 270 deg (UP): frame 146 / frame 0
    # 315 deg (UP-RIGHT): frame 128
    # CENTER (Neutral): frame 191
    compass_keyframes = {
        "RIGHT": 104,
        "DOWN_RIGHT": 88,
        "DOWN": 72,
        "DOWN_LEFT": 56,
        "LEFT": 34,
        "UP_LEFT": 18,
        "UP": 146,
        "UP_RIGHT": 128,
        "CENTER": 191
    }

    print("\nVerified Compass Direction Keyframes:")
    for direction, f_num in compass_keyframes.items():
        print(f"  - {direction:<12}: Frame {f_num}")

    # 8 continuous segments around the 360° circle (64 frames total, ~5.625° apart):
    segments = [
        (0, 8, 104, 88),      # 0° to 45°: RIGHT -> DOWN-RIGHT
        (8, 16, 88, 72),      # 45° to 90°: DOWN-RIGHT -> DOWN
        (16, 24, 72, 56),     # 90° to 135°: DOWN -> DOWN-LEFT
        (24, 32, 56, 34),     # 135° to 180°: DOWN-LEFT -> LEFT
        (32, 40, 34, 18),     # 180° to 225°: LEFT -> UP-LEFT
        (40, 48, 18, 0),      # 225° to 270°: UP-LEFT -> UP
        (48, 56, 146, 128),   # 270° to 315°: UP -> UP-RIGHT
        (56, 64, 128, 104)    # 315° to 360°: UP-RIGHT -> RIGHT
    ]

    extracted_indices = []
    for start_step, end_step, start_f, end_f in segments:
        num_steps = end_step - start_step
        for step in range(num_steps):
            t = step / float(num_steps)
            f_idx = int(round(start_f + t * (end_f - start_f)))
            extracted_indices.append(f_idx)

    # Output directory
    os.makedirs("public/frames", exist_ok=True)
    encode_params = [cv2.IMWRITE_WEBP_QUALITY, 92]

    print(f"\nExporting 64 circular WebP frames to public/frames/...")
    for i, f_idx in enumerate(extracted_indices):
        out_path = f"public/frames/frame_{i:02d}.webp"
        cv2.imwrite(out_path, frames[f_idx], encode_params)

    # Export Center Frame
    center_frame = frames[compass_keyframes["CENTER"]]
    cv2.imwrite("public/frames/center.webp", center_frame, encode_params)
    cv2.imwrite("public/center.webp", center_frame, encode_params)

    print("Success! Exported:")
    print("  - public/frames/frame_00.webp through frame_63.webp (64 directional frames)")
    print("  - public/frames/center.webp & public/center.webp (Center neutral pose)")

if __name__ == "__main__":
    main()
