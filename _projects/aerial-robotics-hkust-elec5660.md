---
title: "Autonomous Aerial Robotics"
permalink: /projects/aerial-robotics-hkust-elec5660/
layout: single
date: 2025-02-01
toc: true

teaser: /projects/aerial-robotics-hkust-elec5660/_project_teaser/drone_teaser.gif
venue: "HKUST, ELEC5660, Independent Course Project"
code: "https://github.com/666harrypeng/elec5660-aerial-robotics"
description: 'Implemented ***real-time trajectory planning for quadrotors***, including tuning ***PID controller***, ***minimum-snap trajectory generation*** and obstacle-aware path planning (***A\*, Dijkstra***), to achieve smooth and safe autonomous navigation. Developed vision-based localization and state estimation pipelines: applied ***PnP pose estimation***, ***stereo visual odometry***, and fused IMU & vision data ***via augmented-state EKF***, and validated in simulation and real-world flight tests.'
---

This is a collection of projects for the course ELEC5660 (Introduction to Aerial Robotics) @ HKUST, 2025 Spring. Instructor: [Prof. Shaojie SHEN](https://ece.hkust.edu.hk/eeshaojie).

Detailed code implementation can be found in the <i class="fab fa-github"></i> [Github code repo](https://github.com/666harrypeng/elec5660-aerial-robotics).

## Project Overview

Developed ***control algorithms***, ***trajectory planning***, and ***sensor fusion techniques*** for an autonomous aerial robot by
utilizing ***rigid-body dynamics***, ***A\* path planning***, ***PnP-based localization***, ***visual odometry***, and ***(augmented state) Extended Kalman Filter (EKF)-based state estimation*** to enable ***vision-based indoor navigation*** and ***real-time flight control***.

The whole course's projects are divided into the following sub-projects.

## Sub-projects

- [Project 1 - Phase 1: Controller Design and Simulation](/projects/aerial-robotics-hkust-elec5660/project1-phase1-controller-design-and-simulation/)
  - *Keywords: PID, Quadrotor Dynamics*
- [Project 1 - Phase 2: Trajectory Planning and Generation](/projects/aerial-robotics-hkust-elec5660/project1-phase2-trajectory-planning-and-generation/)
  - *Keywords: Trajectory Planning, Optimization-based Trajectory Generation, Minimum Snap Trajectory, (un)constrained Quadratic Programming*
- [Project 1 - Phase 3: Path Planning and Obstacle Avoidance](/projects/aerial-robotics-hkust-elec5660/project1-phase3-path-planning-obstacle-avoidance/)
  - *Keywords: Path Planning, Obstacle Avoidance, A\*, Dijkstra's Algorithm*
- [Project 1 - Phase 4: Autonomous Control of Real Drone](/projects/aerial-robotics-hkust-elec5660/project1-phase4-autonomous-control-of-real-drone/)
  - *Keywords: Autonomous Control, Motion Capture System*
- [Project 2 - Phase 1: 3D-2D Pose Estimation (PnP)](/projects/aerial-robotics-hkust-elec5660/project2-phase1-3d-2d-pose-estimation-pnp/)
  - *Keywords: 3D-2D Pose Estimation, PnP, OpenCV, SVD, Linear Estimation*
- [Project 2 - Phase 2: Stereo Visual Odometry](/projects/aerial-robotics-hkust-elec5660/project2-phase2-stereo-visual-odometry/)
  - *Keywords: Stereo Visual Odometry, PnP, Optical Flow, RANSAC, OpenCV*
- [Project 3 - Phase 1: EKF](/projects/aerial-robotics-hkust-elec5660/project3-phase1-ekf/)
  - *Keywords: Extended Kalman Filter (EKF), IMU, PnP, Sensor Fusion, State Estimation*
- [Project3 - Phase 2: Augmented State EKF](/projects/aerial-robotics-hkust-elec5660/project3-phase2-augmented-state-ekf/)
  - *Keywords: Augmented State EKF, IMU, PnP, Stereo VO, Sensor Fusion, State Estimation*
  