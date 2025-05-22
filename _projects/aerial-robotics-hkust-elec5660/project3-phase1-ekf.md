---
title: "Project 3 - Phase 1: Extended Kalman Filter (EKF)"
permalink: /projects/aerial-robotics-hkust-elec5660/project3-phase1-ekf/
layout: single
date: 2025-05-02
toc: true
---

{% include toc %}

- **Keywords**: Extended Kalman Filter (EKF), IMU, PnP, Sensor Fusion, State Estimation
- Coding language: C++, ROS (Docker with image: `osrf/ros:kinetic-desktop-full-xenial`, Visualization GUI: `theasp/novnc:latest`), RViz
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec5660-aerial-robotics/tree/main/project3/proj3-phase1/code)

> Implement the EKF-based state estimation for the quadrotor UAV. Need to fuse the odometry obtained from the tag_detector (PnP) with the IMU measurements.

## Estimated Paths in RViz

<iframe width="560" height="315" src="https://www.youtube.com/embed/CIOYRUYm1Xo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 

*Note:* RViz with `rqt_plot` of positions, orientations, and velocities. The red arrows are the odometry from the EKF, and the blue arrows are the odometry from the PnP. 

## Implementation Details

- Strictly follow the derivations in the notes, which is shown as follows:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/p3p1/ekf_methodology.png" alt="EKF Methodology" style="max-width: 80%; height: auto;">
  </figure>
</div>

- The equations of $A_{t}=\frac{\partial f}{\partial x}$ are based on the work by [Gary](https://github.com/Garyandtang/ELEC5660-2021/blob/main/project3/project3phase1/ekf/src/ekf_node.cpp), typically the formula derivations of $\dot{G^{-1}}$ and $\dot{R}$.
- To get a more stable solution for $K_{t}$, the Lower-Upper decomposition is used, as `MatrixXd K_t = (C_t * state_cov * C_t.transpose() + Rt).lu().solve(C_t * state_cov).transpose();`
- So far, the EKF can greatly produce a much more smooth odometry. From the rqt_plot visualization, we can obviously find that some abrupt changes from VO can be mitigated by the EKF. 




