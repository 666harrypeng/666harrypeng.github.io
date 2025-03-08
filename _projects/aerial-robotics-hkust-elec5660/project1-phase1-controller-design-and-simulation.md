---
title: "Project 1 - Phase 1: Controller Design and Simulation"
permalink: /projects/aerial-robotics-hkust-elec5660/project1-phase1-controller-design-and-simulation/
layout: single
toc: true
toc_label: "Project 1 - Phase 1: Controller Design and Simulation"
toc_icon: "tasks"
---

## Trajectory Simulation Figures

Hover
![p1p1-hover_simu_plot.jpg](../attachments/p1p1-hover_simu_plot.jpg)

Circle
![p1p1-circle_simu_plot.jpg](../attachments/p1p1-circle_simu_plot.jpg)

Square
![p1p1-square_simu_plot_1.jpg](../attachments/p1p1-square_simu_plot_1.jpg)

Star
![p1p1-star_simu_plot.jpg](../attachments/p1p1-star_simu_plot.jpg)

## Controller Statistics

**PD Controller Parameters**

|     | X_pos | Y_pos | Z_pos | Roll_att | Pitch_att | Yaw_att |
| --- | ----- | ----- | ----- | -------- | --------- | ------- |
| Kp  | 10    | 10    | 10    | 310      | 120       | 250     |
| Kd  | 5     | 5     | 5     | 15       | 15        | 20      |

**Trajectory Performance**

| Trajectory | RMSE Position (m) | RMSE Velocity (m/s) | RMSE Yaw (deg) |
| ---------- | ----------------- | ------------------- | -------------- |
| Hover      | 0.021131          | 0.084754            | 0.80289        |
| Circle     | 0.025853          | 0.099345            | 0.81037        |
| Square     | 0.027458          | 0.10681             | 0.80584        |
| Star       | 0.15466           | 0.48619             | 10.4732        |

## Result Analysis

All the parameters of the PID-controller are optimized by primarily following Ziegler-Nichols Method and subsequently manually finetuning. Based on the simulation figures and the RMSE values for all trajectories, the PD-controller is well-optimized, though the controller for roll and pitch is not that perfect compared with other dynamic features. As for the customized Star trajectory, there are relatively drastic overshoots, which is totally acceptable considering the short rise time and settling time afterwards. Also, the RMSE values across all features are rather small for the Star trajectory. All above, the controller has been well-optimized.

## Others

- All trajectories are set to complete their routes within 25 seconds. The controller and simulation codes are not configured to make the quadrotor finish the trajectories as quickly as possible. For further details, please refer to the corresponding source code.
- The definitions of the Star trajectory can be found in the `star_trajectory.m` script.
- All the simulation figures are included in the submission `zip` file.