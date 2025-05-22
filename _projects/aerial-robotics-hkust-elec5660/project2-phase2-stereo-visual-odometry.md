---
title: "Project 2 - Phase 2: Stereo Visual Odometry"
permalink: /projects/aerial-robotics-hkust-elec5660/project2-phase2-stereo-visual-odometry/
layout: single
date: 2025-04-21
toc: true
---

{% include toc %}

- **Keywords**: Stereo Visual Odometry (VO), Optical Flow, RANSAC, OpenCV
- Coding language: C++, ROS (Docker with image: `osrf/ros:kinetic-desktop-full-xenial`, Visualization GUI: `theasp/novnc:latest`), RViz
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec5660-aerial-robotics/tree/main/project2/proj2-phase2/code)

> To implement the stereo VO, including feature detection, feature tracking, 3D point generation, and PnP-based pose estimation.

## Estimated Path of the Camera in RViz Simulation Figure

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p2p2/estimated_path_stereo-vo_realsense1bag.png" alt="estimated_path_stereo-vo_realsense1bag.png" style="max-width: 100%; height: auto;"/>
</div>


## Implementation Details

- ***Feature Detection*** is based on the `cv::goodFeaturesToTrack` function, with no Harris Detector, and with input parameters (max_corners, quality_level, min_distance, block_size) = (300, 0.03, 12.0, 5)
- ***Feature Tracking*** is based on the `cv::calcOpticalFlowPyrLK` function. In `trackFeatureBetweenFrames`, I use the `rejectWithF` function, which is based on `cv::findFundamentalMat`, to find outliers using RANSAC (from [HKUST-VINS](https://github.com/HKUST-Aerial-Robotics/VINS-Mono/blob/master/feature_tracker/src/feature_tracker.cpp)).
- ***PnP-Based Relative Pose Estimation*** is mainly based on `cv::solvePnPRansac` and `cv::Rodrigues`.