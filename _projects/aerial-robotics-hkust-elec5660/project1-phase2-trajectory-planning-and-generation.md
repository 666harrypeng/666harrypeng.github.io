---
title: "Project 1 - Phase 2: Trajectory Planning and Generation"
permalink: /projects/aerial-robotics-hkust-elec5660/project1-phase2-trajectory-planning-and-generation/
layout: single
date: 2025-03-07
toc: true
---

{% include toc %}

- **Keywords**: Trajectory Planning, Optimization-based Trajectory Generation, Minimum Snap Trajectory, (un)constrained Quadratic Programming
- Coding language: MATLAB
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec5660-aerial-robotics/tree/main/project1/proj1-phase2/code)

## Trajectory Generation Method

> Design the trajectory for quadrotor given the path (waypoints), and calculate desired states given time. Try to make the trajectory smooth and feasible.

- The trajectory is generated using an optimization-based method (`minimum snap trajectory generation`). In the actual coding implementation, the built-in function `quadprog` from MATLAB is used to solve the constrained Quadratic Programming problem.
- The time allocation is proportional to the length of each segment of the trajectory (weighted average).
- At the end of the trajectory, the Quadrotor will hover with the final state if the experiment is still ongoing.

## Simulation Figures

Path1

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p2/p1p2-path1.jpg" alt="p1p2-path1.jpg" style="max-width: 100%; height: auto;"/>
</div>

Path2

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p2/p1p2-path2.jpg" alt="p1p2-path2.jpg" style="max-width: 100%; height: auto;"/>
</div>

Path3 (self-designed)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p2/p1p2-path3.jpg" alt="p1p2-path3.jpg" style="max-width: 100%; height: auto;"/>
</div>

Path4 (self-designed)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p2/p1p2-path4.jpg" alt="p1p2-path4.jpg" style="max-width: 100%; height: auto;"/>
</div>

## Controller Statistics

The Controller's parameters have been optimized based on Project1-Phase1. Currently, the parameters' values are:

|     | X_pos | Y_pos | Z_pos | Roll_att | Pitch_att | Yaw_att |
| --- | ----- | ----- | ----- | -------- | --------- | ------- |
| Kp  | 10    | 10    | 10    | 3000     | 3000      | 3000    |
| Kd  | 8     | 8     | 8     | 100      | 100       | 100     |
| Ki  | 1     | 1     | 1     | 1        | 1         | 1       |

The performances on different paths based on RMSE values:

| RMSE                | Path1    | Path2    | Path3    | Path4   |
| ------------------- | -------- | -------- | -------- | ------- |
| RMSE Position (m)   | 0.077445 | 0.070551 | 0.084609 | 0.12952 |
| RMSE Velocity (m/s) | 0.13065  | 0.10243  | 0.12858  | 0.16033 |
| RMSE Yaw (deg)      | 1.3341   | 1.3232   | 1.3302   | 1.3326  |

## Result Analysis

After the optimization of the Controller, the path following becomes smoother and more stable. The trajectory generation is also acceptable.

## Reference

Some implementations are adapted from this code repository. - [GitHub @ Garyandtang - ELEC5660-2021](https://github.com/Garyandtang/ELEC5660-2021/tree/main/project1/proj1phase2/code)
