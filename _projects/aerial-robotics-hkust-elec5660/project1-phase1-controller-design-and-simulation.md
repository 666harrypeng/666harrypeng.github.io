---
title: "Project 1 - Phase 1: Controller Design and Simulation"
permalink: /projects/aerial-robotics-hkust-elec5660/project1-phase1-controller-design-and-simulation/
layout: single
date: 2025-02-28
toc: true
toc_label: "Project 1 - Phase 1: Controller Design and Simulation"
toc_icon: "tasks"
---

- **Keywords**: PID, Quadrotor Dynamics
- Coding language: MATLAB
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec5660-aerial-robotics)

## Controller Design

> Implement the controller in the `controller.m` file. The input of controller includes time `t`, current state vector `s` and desired state vector `s_des`. The output of controller is force `F` and moment `M`.

The Quadrotor dynamics is based on the following equations:

- Motor model: $\dot{\omega}_i = k_m(\omega_i^{des} - \omega_i)$
- Thrust from individual motor: $F_i = k_F\omega_i^2$
- Moment from individual motor: $M_i = k_M\omega_i^2$
- Newton Equation:

$$
m\ddot{p} = 
    \begin{bmatrix}
        0 \\
        0 \\
        -mg
    \end{bmatrix}
        + R
    \begin{bmatrix}
        0 \\
        0 \\
        F_1 + F_2 + F_3 + F_4
    \end{bmatrix}
$$

- Euler Equation:

$$
I \cdot 
    \begin{bmatrix}
    \dot{\omega}_x \\
    \dot{\omega}_y \\
    \dot{\omega}_z
    \end{bmatrix}
    +
    \begin{bmatrix}
    \omega_x \\
    \omega_y \\
    \omega_z
    \end{bmatrix}
    \times I \cdot 
    \begin{bmatrix}
    \omega_x \\
    \omega_y \\
    \omega_z
    \end{bmatrix}
    =
    \begin{bmatrix}
    l(F_2 - F_4) \\
    l(F_3 - F_1) \\
    M_1 - M_2 + M_3 - M_4
    \end{bmatrix}
$$

For 3D Quadrotor, we do the linearization around the equilibrium hover state with $(\phi_0 \sim 0, \theta_0 \sim 0, u_{1,0} \sim mg)$.

In this project, I implemented the `PD-controller` for the 3D Quadrotor, with the control equations & controller outputs as follows:

- Position Control:
  - PID (PD): 
  
    $$\ddot{\mathbf{p}}_{i,c} = \ddot{\mathbf{p}}_{i}^{des} + K_{d,i}(\dot{\mathbf{p}}_{i}^{des} - \dot{\mathbf{p}}_{i}) + K_{p,i}(\mathbf{p}_{i}^{des} - \mathbf{p}_{i})$$
  
  - Model: 

    $$ u_1 = m(g + \ddot{\mathbf{p}}_{3,c})$$

    $$ \phi_c = \frac{1}{g} (\ddot{\mathbf{p}}_{1,c}\sin\psi - \ddot{\mathbf{p}}_{2,c}\cos\psi)$$
    
    $$ \theta_c = \frac{1}{g} (\ddot{\mathbf{p}}_{1,c}\cos\psi + \ddot{\mathbf{p}}_{2,c}\sin\psi)$$

- Attitude Control
  - PID (PD):

    $$ 
    \begin{bmatrix}
        \ddot{\phi}_c \\
        \ddot{\theta}_c \\
        \ddot{\psi}_c
    \end{bmatrix}
    =
    \begin{bmatrix}
        K_{p,\phi}(\phi_c - \phi) + K_{d,\phi}(\dot{\phi}_c - \dot{\phi}) \\
        K_{p,\theta}(\theta_c - \theta) + K_{d,\theta}(\dot{\theta}_c - \dot{\theta}) \\
        K_{p,\psi}(\psi_c - \psi) + K_{d,\psi}(\dot{\psi}_c - \dot{\psi})
    \end{bmatrix}
    $$

  - Model:

    $$
    \mathbf{u}_2 = \mathbf{I} \cdot 
    \begin{bmatrix}
        \ddot{\phi}_c \\
        \ddot{\theta}_c \\
        \ddot{\psi}_c
    \end{bmatrix}
    +
    \begin{bmatrix}
        \omega_x \\
        \omega_y \\
        \omega_z
    \end{bmatrix}
    \times
    \mathbf{I} \cdot 
    \begin{bmatrix}
        \omega_x \\
        \omega_y \\
        \omega_z
    \end{bmatrix}
    $$

## Trajectory Simulation Figures

Hover
<div style="display: flex; justify-content: center; text-align: center;">
    <figure>
        <img src="../attachments/p1p1/p1p1-hover_simu_plot.jpg" alt="p1p1-hover_simu_plot.jpg" style="max-width: 100%; height: auto;"/>
        <!-- <figcaption style="font-style: italic; color: gray; text-align: center;">Hover Simulation Results</figcaption> -->
    </figure>
</div>

Circle

<div style="display: flex; justify-content: center; text-align: center;">
    <figure>
        <img src="../attachments/p1p1/p1p1-circle_simu_plot.jpg" alt="p1p1-circle_simu_plot.jpg" style="max-width: 100%; height: auto;"/>
        <!-- <figcaption style="font-style: italic; color: gray; text-align: center;">Circle Simulation Results</figcaption> -->
    </figure>
</div>

Square

<div style="display: flex; justify-content: center; text-align: center;">
    <figure>
        <img src="../attachments/p1p1/p1p1-square_simu_plot_1.jpg" alt="p1p1-square_simu_plot_1.jpg" style="max-width: 100%; height: auto;"/>
        <!-- <figcaption style="font-style: italic; color: gray; text-align: center;">Square Simulation Results</figcaption> -->
    </figure>
</div>

Star

<div style="display: flex; justify-content: center; text-align: center;">
    <figure>
        <img src="../attachments/p1p1/p1p1-star_simu_plot.jpg" alt="p1p1-star_simu_plot.jpg" style="max-width: 100%; height: auto;"/>
        <!-- <figcaption style="font-style: italic; color: gray; text-align: center;">Star Simulation Results</figcaption> -->
    </figure>
</div>

## Controller Statistics

### PD Controller Parameters

|     | X_pos | Y_pos | Z_pos | Roll_att | Pitch_att | Yaw_att |
| --- | ----- | ----- | ----- | -------- | --------- | ------- |
| Kp  | 10    | 10    | 10    | 310      | 120       | 250     |
| Kd  | 5     | 5     | 5     | 15       | 15        | 20      |

### Trajectory Performance

| Trajectory | RMSE Position (m) | RMSE Velocity (m/s) | RMSE Yaw (deg) |
| ---------- | ----------------- | ------------------- | -------------- |
| Hover      | 0.021131          | 0.084754            | 0.80289        |
| Circle     | 0.025853          | 0.099345            | 0.81037        |
| Square     | 0.027458          | 0.10681             | 0.80584        |
| Star       | 0.15466           | 0.48619             | 10.4732        |

## Result Analysis

All the parameters of the PID-controller are optimized by primarily following Ziegler-Nichols Method and subsequently manually finetuning. Based on the simulation figures and the RMSE values for all trajectories, the PD-controller is well-optimized, though the controller for roll and pitch is not that perfect compared with other dynamic features. As for the customized Star trajectory, there are relatively drastic overshoots, which is totally acceptable considering the short rise time and settling time afterwards. Also, the RMSE values across all features are rather small for the Star trajectory. All above, the controller has been well-optimized.
