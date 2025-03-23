---
title: "Project 1 - Phase 3: Path Planning and Obstacle Avoidance"
permalink: /projects/aerial-robotics-hkust-elec5660/project1-phase3-path-planning-obstacle-avoidance/
layout: single
date: 2025-03-14
toc: true
---
{% include toc %}

- **Keywords**: Path Planning, Obstacle Avoidance, A*, Dijkstra's Algorithm
- Coding language: MATLAB
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec5660-aerial-robotics/tree/main/project1/proj1-phase3/code)

## Path Planning

> Given 3D voxel map with static obstacles, generate path points using A* algorithm and use as the inputs of trajectory generation.

In the 3D voxel map, the environments are divided into $1\times1\times1$ voxels.

We assume a node is only connected to its adjacent nodes (6-connectivity), and the movements are limited to 6 directions: forward, backward, left, right, up, down.

The A* algorithm is implemented under provided data structures. The heuristic function is the Euclidean distance or Manhattan distance.

## Path Simulation Figures

Map1 (heuristic: Euclidean distance)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p3/map1_euclidean_simu.jpg" alt="map1_euclidean_simu.jpg" style="max-width: 100%; height: auto;"/>
</div>

Map1 (heuristic: Manhattan distance)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p3/map1_manhattan_simu.jpg" alt="map1_manhattan_simu.jpg" style="max-width: 100%; height: auto;"/>
</div>

Map2 (heuristic: Euclidean distance)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p3/map2_euclidean_simu.jpg" alt="map2_euclidean_simu.jpg" style="max-width: 100%; height: auto;"/>
</div>

Map2 (heuristic: Manhattan distance)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p3/map2_manhattan_simu.jpg" alt="map2_manhattan_simu.jpg" style="max-width: 100%; height: auto;"/>
</div>

Map3 (randomly generated map 1; heuristic: Euclidean distance)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p3/map3_1_simu.jpg" alt="map3_1_simu.jpg" style="max-width: 100%; height: auto;"/>
</div>

Map3 (randomly generated map 2; heuristic: Euclidean distance)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p3/map3_2_simu.jpg" alt="map3_2_simu.jpg" style="max-width: 100%; height: auto;"/>
</div>

Map3 (randomly generated map 3; heuristic: Euclidean distance)

<div style="display: flex; justify-content: center;">
    <img src="../attachments/p1p3/map3_3_simu.jpg" alt="map3_3_simu.jpg" style="max-width: 100%; height: auto;"/>
</div>

## Result Analysis

- Different from the Dijkstra algorithm, the A* path search algorithm can use the heuristic function to make the path exploring towards the target. With the heuristic function, A* can explore less space than Dijkstra.
- Under the configurations provided in the project instructions, the robot can only have six movements, all aligned with the coordinate axes, assuming no other movements like diagonal movement. Also, the key data structures are given. So, Euclidean and Manhattan distances can both be used for the heuristic function in the 2D or 3D voxel map settings. Manhattan distance cost `h` equals the actual cost `g`, and Euclidean distance cost is always smaller than the actual cost. So, they are both admissible and can find the optimal paths if they exist.

## Others

The ending point of the simulation path is misaligned with the pre-defined target point, even though the actual coordinates of the ending point and the target point are the same. *(Probably due to the simulation plotting code settings, but it is not a big issue.)*
