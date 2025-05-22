---
title: "Project 3 - Robotic Grasping"
permalink: /projects/intelligent-robots-and-embodied-ai-hkust-elec4260/project3-robotic-grasping/
layout: single
date: 2025-05-19
toc: true
---

{% include toc %}

- **Keywords**: Grasp Synthesis, Learning-based Robotic Grasping, [PoseCNN](https://arxiv.org/abs/1711.00199), [GraspCNN1](https://arxiv.org/abs/1804.05172), [GraspCNN2](https://journals.sagepub.com/doi/10.1177/0278364919859066)
- Coding & Enviroment: Python, PyTorch, OpenCV, RealSense Stereo Camera, [AIRBOT Play](https://airbots.online/)
- Detailed code implementation can be found in the [Github code repo](https://github.com/666harrypeng/elec4260-embodied-ai-robotics/tree/main/project3_robotic_grasping/src)

> This project needs to implement: robot and camera calibration, the basic grasping pipeline, functional grasping using pose estimation and grasp transfer, and data-driven grasp detection for various objects.

## Task 1 - The Implementation of the Basic Pipeline

To enable collision-free movement and a stable grasp, the pre-grasp and post-grasp poses should be
carefully calculated first, which shows as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/pre_pose_grasp_poses_diagram.png" alt="pre_pose_grasp_poses_diagram" style="max-width: 100%; height: auto;">
  </figure>
</div>

This pipeline leverages OpenCV’s Hough Circle Transform for detection and converts 2D grasps to 3D using camera intrinsics. Pre- and post-grasp poses are carefully calculated to ensure collision-free movement and stable manipulation.

The pipeline work in following steps:

1. Detect a circle on the object
2. Compute 2D grasp from the circle
3. Convert 2D grasp into 3D grasp
4. Computing the pre-grasp pose and post-grasp pose
5. Controlling the robot to execute the grasp.

To better implement this pipeline (pre-grasp & post-grasp), the offsets should be adjusted using the orientation vectors obtained from the rotation matrix between the object and the camera/robot gripper.

The full video demonstration that the robotic arm grasps a Squash Ball, can be found below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/sGwvwMxEIK4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Task 2 - Object Pose Estimation & Functional Grasping

This task mainly includes implementations of the model [PoseCNN](https://arxiv.org/abs/1711.00199), and the integration with the PoseCNN and the robotic arm grasping.

### PoseCNN Model Implementation & Training

The model structure of the PoseCNN is shown as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/posecnn_model_structure.png" alt="posecnn_model_structure" style="max-width: 100%; height: auto;">
  </figure>
</div>

The workflow of this model structure includes a main backbone of CNN layers to extract major features in the input datasets. Then, the main branch is split into three branches which all share the same raw features from the main backbone layers. One for segmentation (for object class label), one for the 3D translation estimation (object localization), and one for the 3D rotation.

The model's loss consists of the losses from all the three branches (with equal loss weights for training, which might cause trouble for whole-model optimization, especially when there is one object/class which is much more important in the context of the problem settings). Based on the provided hardware resources, the training batch\_size is 4, the total training epoch is 4, Adam is the optimizer with provided learning\_rate 0.001.

The model's training progress is shown as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/posecnn_losses_epoch_1.png" alt="posecnn_losses_epoch_1" style="max-width: 100%; height: auto;">
  </figure>
</div>

Due to the scale of the datasets and the model memory size, the losses only drastically drop during Epoch 1. There are no obvious optimization during the remaining epochs. Among the three classes, the performance of the translation estimation is the trickiest one, which causes the failure of the localization of the segmentation and therefore the rotation rectification. Even after the 4 epochs, the centermap loss is about 0.12, which shows great threats to the Task 2's experiments.

The model's validation results can be found below with the segmentation, translation, and rotation estimation visualization:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/task2_eval_model_visual.png" alt="task2_eval_model_visual" style="max-width: 100%; height: auto;">
  </figure>
</div>

In this figure, we can easily find that the performances of the segmentation and the rotation are really good. However, the predicted areas cannot be located at the real objects' locations, which is caused by the performance of the translation class (centermap). This is related to the intrinsic design of the model structure. This can be greatly mitigated by applying the ICP between the predicted areas and the real object's areas.

Also, this might be addressed if we apply one hyperparameter for each of the class while model training. For example, we can first set the model total loss as: 

$$
\textit{total loss} = \lambda_1 L_\textit{segmentation} + \lambda_2 L_\textit{centermap} + \lambda_3 L_\textit{rotation}$$ 

Based on the initial training results, we already know that the loss of the centermap is still a big concern. We can set the hyperparameter for the centermap's loss smaller than the other two, so that when the model performs the backpropagation, the major optimization can be derived from the centermap/translation-estimation class. This method has not been tested considering the training of the model is really time-consuming and we can mitigate this issue greatly by applying ICP.

### Improving Pose Estimation with ICP

This subtask needs to implement a general function block of the Iterative Closet Point (ICP) algorithm for matching task optimization. I use two approaches here - one is from scratch, the other one is based on the pre-defined function **o3d.pipelines.registration.registration\_icp** from *open3d*. The scratch version is totally controllable and the compact version is fast and well-optimized. In the scratch version, I introduce the KD-tree to make the search for nearest neighbor points more efficiently. This task's performance can be found in the integration with the deployment on the robotic arm below.

### Pipeline Deployment with the Robotic Arm

To make the process more straight and convenient for debugging, I applied another ICP before the raw comparison between the real object captured by the camera and the ground truth object. The refined results after two rounds of ICP can be found in Figure ~\ref{fig:task2_refined_alignments_after_ICP}, with the predicted grasping motion shown. We can see that the prediction is quite acceptable and the general performance can be found in the following Task 2 video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mv3jLhpn6c4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 

## Task 3 - Data-driven Grasp Detection

This task mainly needs to implement the [GGCNN](https://arxiv.org/abs/1804.05172) model. I also implement the [GGCNN2](https://journals.sagepub.com/doi/10.1177/0278364919859066) model, which can have slightly better results than the GGCNN1. Finally, the deployment with the robotic arm is also included.

### GGCNN Model Implementation & Training

The model definition implementations are strictly following the original definitions on the corresponding papers. Both use CNN layers as the main structure and predict for different contexts - positions, orientations, and grasping width.

The model's general training losses, validation losses, and the IOU (Intersection over Union) results can be found in the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/task3_ggcnn12_losses_curves_tb.png" alt="task3_ggcnn12_losses_curves_tb" style="max-width: 100%; height: auto;">
  </figure>
</div>

The training details of the position loss, orientation loss (sin, cos), and the grasping width loss can be found in the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/task3_ggcnn12_trainloss_curves.png" alt="task3_ggcnn12_trainloss_curves" style="max-width: 100%; height: auto;">
  </figure>
</div>

The validation results of the position loss, orientation loss (sin, cos), and the grasping width loss can be found in the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/task3_ggcnn12_valloss_curves.png" alt="task3_ggcnn12_valloss_curves" style="max-width: 100%; height: auto;">
  </figure>
</div>

One of the evaluation results on the same real object (wooden spoon) of the GGCNN1 & GGCNN2 is shown as the following figures, with the classification (segmentation), predicted grasping position and orientation, and the grasping quality:

- GGCNN1:
<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/eval_GGCNN1_88.png" alt="eval_GGCNN1_88.png" style="max-width: 100%; height: auto;">
  </figure>
</div>

- GGCNN2:
<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/eval_GGCNN2_88.png" alt="eval_GGCNN2_88" style="max-width: 100%; height: auto;">
  </figure>
</div>

Based on the visualization results, we can see that the GGCNN2 has a better performance in the grasping position and orientation estimation, and therefore the grasping quality is also better.

The IOU results of the GGCNN1 and GGCNN2 can be found in the following figure:

- GGCNN1: 76/89

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/task3_ggcnn1_eval_iou_acc.png" alt="task3_ggcnn1_eval_iou_acc" style="max-width: 100%; height: auto;">
  </figure>
</div>

- GGCNN2: 83/89

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../attachments/project3/task3_ggcnn2_eval_iou_acc.png" alt="task3_ggcnn2_eval_iou_acc" style="max-width: 100%; height: auto;">
  </figure>
</div>


### Integrating Grasp Detector in the Pipeline

I have integrated everything into the general pipeline. But due to the properties of the data-driven approach, the grasping performance is not very stable, and the success rates of each trial object are not very high.

The video demonstration of the integration can be found below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/V3-Zl1DSef0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In general, three objects are tested:

-  Tripod (success rate 8/10): This success rate is quite high probably due to the similar shape to some of the trained objects' shapes.
- Glue Stick (success rate 6/10): This rate is a little bit lower, because firstly the color of the stick is quite similar to the background mat, and secondly the object itself is smaller. So, this performance is quite acceptable.
- Screwdriver (success rate 9/10): This rate is quite hight because this object is much bigger, and the head of the driver is green which is highly different from the background color. Also, the light reflection on the driver from the ambient light is less due to its surface texture.
