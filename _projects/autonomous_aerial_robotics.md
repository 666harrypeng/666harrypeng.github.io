---
title: "Autonomous Aerial Robotics"
layout: project
date: 2025-02-01
toc: true

teaser: /projects/autonomous_aerial_robotics/_project_teaser/drone_teaser-poster.jpg
teaser_width: 480
teaser_height: 272
teaser_video: /projects/autonomous_aerial_robotics/_project_teaser/drone_teaser.mp4
venue: "HKUST, ELEC5660, Independent Course Project"
advisor: "[Prof. Shaojie SHEN](https://ece.hkust.edu.hk/eeshaojie)"
code: "https://github.com/666harrypeng/elec5660-aerial-robotics"
description: 'Implemented **real-time trajectory planning for quadrotors**, including tuning PID controller, minimum-snap trajectory generation and obstacle-aware path planning (A\*, Dijkstra), to achieve smooth and safe autonomous navigation. Developed vision-based localization and state estimation pipelines: applied PnP pose estimation, stereo visual odometry, and fused IMU & vision data **via augmented-state EKF**, and validated in simulation and real-world flight tests.'
redirect_from:
  - /projects/aerial-robotics-hkust-elec5660/
---

This is a collection of projects for the course ELEC5660 (Introduction to Aerial Robotics) @ HKUST, 2025 Spring.

## Project Overview

Developed ***control algorithms***, ***trajectory planning***, and ***sensor fusion techniques*** for an autonomous aerial robot by
utilizing ***rigid-body dynamics***, ***A\* path planning***, ***PnP-based localization***, ***visual odometry***, and ***(augmented state) Extended Kalman Filter (EKF)-based state estimation*** to enable ***vision-based indoor navigation*** and ***real-time flight control***.

The whole course's projects are divided into the following sub-projects.

## Sub-projects

- [Project 1 - Phase 1: Controller Design and Simulation](/projects/autonomous_aerial_robotics/project1_phase1_controller_design_and_simulation/)
  - *Keywords: PID, Quadrotor Dynamics*

- [Project 1 - Phase 2: Trajectory Planning and Generation](/projects/autonomous_aerial_robotics/project1_phase2_trajectory_planning_and_generation/)
  - *Keywords: Trajectory Planning, Optimization-based Trajectory Generation, Minimum Snap Trajectory, (un)constrained Quadratic Programming*
- [Project 1 - Phase 3: Path Planning and Obstacle Avoidance](/projects/autonomous_aerial_robotics/project1_phase3_path_planning_obstacle_avoidance/)
  - *Keywords: Path Planning, Obstacle Avoidance, A\*, Dijkstra's Algorithm*
- [Project 1 - Phase 4: Autonomous Control of Real Drone](/projects/autonomous_aerial_robotics/project1_phase4_autonomous_control_of_real_drone/)
  - *Keywords: Autonomous Control, Motion Capture System*
- [Project 2 - Phase 1: 3D-2D Pose Estimation (PnP)](/projects/autonomous_aerial_robotics/project2_phase1_3d_2d_pose_estimation_pnp/)
  - *Keywords: 3D-2D Pose Estimation, PnP, OpenCV, SVD, Linear Estimation*
- [Project 2 - Phase 2: Stereo Visual Odometry](/projects/autonomous_aerial_robotics/project2_phase2_stereo_visual_odometry/)
  - *Keywords: Stereo Visual Odometry, PnP, Optical Flow, RANSAC, OpenCV*
- [Project 3 - Phase 1: EKF](/projects/autonomous_aerial_robotics/project3_phase1_ekf/)
  - *Keywords: Extended Kalman Filter (EKF), IMU, PnP, Sensor Fusion, State Estimation*
- [Project3 - Phase 2: Augmented State EKF](/projects/autonomous_aerial_robotics/project3_phase2_augmented_state_ekf/)
  - *Keywords: Augmented State EKF, IMU, PnP, Stereo VO, Sensor Fusion, State Estimation*
  