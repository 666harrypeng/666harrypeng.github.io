---
title: "Project 3 - Phase 2: Augmented State EKF"
permalink: /projects/aerial-robotics-hkust-elec5660/project3-phase2-augmented-state-ekf/
layout: single
date: 2025-05-09
toc: true
---

{% include toc %}

- **Keywords**: Augmented State EKF, IMU, PnP, Stereo VO, Sensor Fusion, State Estimation
- Coding language: C++, ROS (Docker with image: `osrf/ros:kinetic-desktop-full-xenial`, Visualization GUI: `theasp/novnc:latest`), RViz
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec5660-aerial-robotics/tree/main/project3/proj3-phase2/code)

> Need to extend the EKF to an Augmented State EKF, to fuse not only absolute pose measurements from PnP, but also relative pose measurements from the stereo visual odometry. The final filter should be able to account for failures in any one of the measurements, i.e., both the absolute and relative pose measurement may be unavailable sometimes.

## Implementation Details

Strictly follow the derivations in the notes, which is shown as follows:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/p3p2/aug_ekf_prediction.png" alt="aug_ekf_prediction" style="max-width: 80%; height: auto;">
  </figure>
</div>

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/p3p2/aug_ekf_update.png" alt="aug_ekf_update" style="max-width: 80%; height: auto;">
  </figure>
</div>

- First, initialize the filter with the first PnP frame.
- Check the type of the next frame/state to see which function to call. Based on this frame's timestamp, this frame will be inserted into the deque, and then all the frames in the deque later than this new frame will be repropagated. 
- After repropagation, the old states will be removed from the deque, and a new odometry will be published.

## Estimations in RViz

On the small rosbag (given absolute poses from PnP & relative poses from stereo visual odometry):

<iframe width="560" height="315" src="https://www.youtube.com/embed/IETuEzdS8Yc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 

On the large rosbag (no given pre-processed absolute/relative poses, all from scratch):

<iframe width="560" height="315" src="https://www.youtube.com/embed/2ZGzxhBWsB8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 

*Note:*
- The red arrows are the odometry from the augmented state EKF
- The blue arrows are the odometry from the PnP
- The yellow arrows are the odometry from the stereo visual odometry
- The green path is from the augmented state EKF estimation