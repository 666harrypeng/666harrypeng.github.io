---
title: "Project 1 - Phase 4: Autonomous Control of Real Drone"
permalink: /projects/aerial-robotics-hkust-elec5660/project1-phase4-autonomous-control-of-real-drone/
layout: single
date: 2025-04-18
toc: true
---

{% include toc %}

> Construct the drone and control the drone both manually and autonomously.Need to setup the development environment and fly your drone in autonomous control mode with a motion capture system (OptiTrack).

## Provided Testing Trajectory

- Trajectory points: (1.0, 1.0,−0.3), (0.0, 2.0, 0.0), (−1.0, 1.0, 0.0), (0.0, 0.0, 0.0), (1.0,−1.0, 0.0), (0.0,−1.0, 0.0), (0.0,−2.0, 0.0), (−1.0,−1.0, 0.0), (0.0, 0.0, 0.0)
- The video demonstration of the real UAV deployment and the real-time RViz simulation:

<iframe width="560" height="315" src="https://www.youtube.com/embed/t6srZW3Efdk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 

- Error Analysis:
  - Position and velocity errors are calculated based on the positions and velocities acquired from the topic `/position_cmd` and the topic `/ekf/ekf_odom`. The RMSE values are calculated in real-time every 100 samples.
  - From the RMSE values printed in the terminal, the averaged position error is 0.15, the average velocity error is 0.137, and all other errors for metrics such as the max position or velocity error are within 0.5. Based on the real-robot experiment and the RViz simulation, the deployment is quite good.

## Self-Defined Trajectory - 1 (Square)

- Trajectory points: (1, 1, -0.1), (0, 1, -0.1), (-1, 1, -0.1), (-1, 0, -0.1), (-1, -1, -0.1), (0, -1, -0.1), (1, -1, -0.1), (1, 0, -0.1)
- The video demonstration of the real UAV deployment and the real-time RViz simulation:

<iframe width="560" height="315" src="https://www.youtube.com/embed/M6lScUTHL3k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 

- Error Analysis:
  - Position and velocity errors are calculated based on the positions and velocities acquired from the topic `/position_cmd` and the topic `/ekf/ekf_odom`. The RMSE values are calculated in real-time every 100 samples.
  - From the RMSE values printed in the terminal, all the errors (averaged & max) are within 0.5. Based on the video and simulation, the deployment is quite good.

## Self-Defined Trajectory - 2 (Star)

- Trajectory points: (1, 1, -0.1), (-1, 1, -0.1), (0.6, -0.6, -0.1), (0, 1.3, -0.1), (-0.6, -0.6, -0.1), (1, 1, -0.1)
- The video demonstration of the real UAV deployment and the real-time RViz simulation:

<iframe width="560" height="315" src="https://www.youtube.com/embed/M8beTcewmyA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Error Analysis
  - Position and velocity's RMSE values are calculated in real-time based on topic `/position_cmd` and the topic `/ekf/ekf_odom` every 100 samples.
  - From the RMSE values printed in the terminal, the averaged position error is 0.207, and the averaged velocity error is 0.161. Based on the video and simulation, the deployment is quite good.
