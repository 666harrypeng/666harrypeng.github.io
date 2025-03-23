---
title: "Project 1 - Odometry Mapping and ICP"
permalink: /projects/intelligent-robots-and-embodied-ai-hkust-elec4260/project1-odometry-mapping-icp/
layout: single
date: 2025-03-07
toc: true
---

{% include toc %}

- **Keywords**: Wheel Odometry, LiDAR, Mapping, ICP
- Coding & Enviroment: C++, ROS, RViz, Gazebo
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec4260-embodied-ai-robotics/tree/main/project1_odometry/src)

> This project needs to implement keyboard control for the TurtleBot, convert motor information into wheel odometry, reading 2d-LiDAR data to construct an occupancy grid map of the environment, and develop a 2D LiDAR odometry system based on ICP algorithm.

## Wheel Odometry

### Preliminaries

Key steps involved in the odometry computation:

- Compute the change in wheel position (incremental movement) using encoder values.
- Convert the angular displacement into linear displacement (derived from the differential-drive kinematics):
  - Linear displacement ($\Delta s$) is the average of both wheel displacements, which represents the robot's forward movement:
    
    $$ \Delta s = \frac{d_{\text{right}} + d_{\text{left}}}{2} $$
  
  - Angular displacement ($\Delta \theta$) is computed using the wheelbase $b$ and the difference in the two wheel displacements:
    
    $$ \Delta \theta = \frac{d_{\text{right}} - d_{\text{left}}}{b} $$

- Calculate the robot’s motion in terms of position ($x$, $y$) and orientation ($\theta$):
  - New x-position: $x_{t+1} = x_t + \Delta s \cos\left(\theta + \frac{\Delta \theta}{2}\right)$
  - New y-position: $y_{t+1} = y_t + \Delta s \sin\left(\theta + \frac{\Delta \theta}{2}\right)$
  - New orientation: $\theta_{t+1} = \theta_t + \Delta \theta$
- Publish the updated path and odometry information

### Implementation Details

- First, the increments and displacements of the two wheels are calculated. Then, we can get the linear distance and the rotation angle of the robot movement so that we can update the global poses accordingly.
- After we get the updated `x`, `y`, and `theta`, we can publish the updated path and the wheel odometry instances.

### RViz & Gazebo Simulation

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project1/p1_wheel_odom_figure.png" alt="RViz & Gazebo Simulation for Wheel Odometry" style="max-width: 100%; height: auto;">
    <figcaption style="font-style: italic; color: gray; text-align: center;">RViz & Gazebo Simulation for Wheel Odometry</figcaption>
  </figure>
</div>

### Real-World Deployment

***Note:*** The real-world deployment is not shown in this video, considering the robot deployment can be reflected in the ICP odometry case. The following video shows the real-time RViz visualization of the robot odometry.

<iframe width="560" height="315" src="https://www.youtube.com/embed/oa-VNWIs4Xs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Occupancy Grid Mapping

### Preliminaries

Key steps:

- Traverse all laser measurements
- Set the range threshold
- Get the start point and end point
- Using `BresenhamLine` to check the status of each grid
- Publish the occupancy grid map

### Implementation Details

- In the `scanCallback` function, we determine the obstacles or the visit-or-not status of points by traversing all points from laser measurements.
- At the beginning, we first determine whether the detected point is a valid point by comparing the distance with our pre-defined threshold. Then, laser-scanned points are mapped into world coordinates and converted into map coordinates. Based on Bresenham's line algorithm, we can get a series of possible points that are scanned by lasers. We then traverse these points and determine whether a certain point is the ending point on the laser path, whose location will be labeled as an obstacle. `SCAN_THRESHOLD` is used to guarantee the reliability of the obstacle point. `DECAY_FACTOR` is used to reduce the skepticism of a certain point that might be determined as an obstacle.
- After we finish updating the points based on the laser measurements, we publish the map by setting each grid's data value to 100, -1, or 0.

### RViz & Gazebo Simulation

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project1/p1_occupancy_figure.png" alt="RViz & Gazebo Simulation for Occupancy Grid Mapping" style="max-width: 100%; height: auto;">
    <figcaption style="font-style: italic; color: gray; text-align: center;">RViz & Gazebo Simulation for Occupancy Grid Mapping</figcaption>
  </figure>
</div>

### Real-World Deployment

This part is integrated with the ICP odometry case.

## ICP Odometry

### Preliminaries

Key steps:

- Receives a 2D occupancy grid map (`/map` topic).
- Converts the map into a point cloud representation.
- Processes incoming LiDAR scans (`/scan` topic) and projects them into the map frame.
- Uses ICP to align the LiDAR scan with the map and estimate the robot's pose transformation (dx, dy, dyaw).
- Updates the robot’s global pose (`map` → `base_footprint` transform).
- Publishes ICP-based odometry (`/icp_odom` topic) for further use in SLAM or navigation.

### Implementation Details

- First, the `computeBestRigidTransform2D` function is finished mainly by implementing SVD for the source and target points. In this function, when $R$ is calculated by $R=VU^T$, another if statement is added to guarantee that the rotation matrix $R$ is not a flipping matrix whose determinant is -1.
- As for the `performICP` function, we traverse all source points and calculate the distance between each source point and each target point, where we aim to find out the point pair with the minimum distance. A threshold is added to determine whether this is a valid matched point pair. Once found, the source and target points are pushed into the point lists. Such a process will be looped for `maxIterations` times until the convergence is reached (when the changes of `x`, `y`, and `yaw` are small enough).
- Once we finish the ICP, we publish the odometry in `publishIcpOdom`. Here, we put the strong belief that the uncertainties are small. Therefore, all the variances related to `x`, `y`, and `yaw` are set to 0.01 in the pose and twist covariance matrices.
- In the `main` function, the frequency of the subscriber `map_sub` is increased to 10 Hz from 1 Hz, which can improve the results of ICP odometry (especially the simulation updating speed).

### RViz & Gazebo Simulation

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project1/p1_icp_figure_10.png" alt="RViz & Gazebo Simulation for ICP Odometry" style="max-width: 100%; height: auto;">
    <figcaption style="font-style: italic; color: gray; text-align: center;">RViz & Gazebo Simulation for ICP Odometry</figcaption>
  </figure>
</div>

### Real-World Deployment

In this video, both the simulation visualization and the real-world deployment are shown simultaneously (picture-in-picture).

<iframe width="560" height="315" src="https://www.youtube.com/embed/_DU1nyRlWb4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
