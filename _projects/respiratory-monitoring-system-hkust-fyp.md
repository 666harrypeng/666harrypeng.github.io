---
title: "Respiratory Monitoring System"
permalink: /projects/respiratory-monitoring-system-hkust-fyp/
layout: single
date: 2025-05-23
toc: true

teaser: /projects/respiratory-monitoring-system-hkust-fyp/attachments/MHA_VAE_ModelStucture_resized.jpg
authors: "Group Leader, Principal Contributor"
venue: "HKUST, ECE Final Year Project (FYP)"
award: "HKUST ECE Best FYP/T Award 2024-2025 2<sup>nd</sup> Runner-Up"
code: "https://github.com/666harrypeng/Edge-AI-for-healthcare-applications"
description: 'Designed and implemented a hybrid ***VAE-LSTM-MHA*** model for ***time-series forecasting*** and ***anomaly detection*** in noisy patient respiration data, achieving ***over 95% detection accuracy*** and ***improving reconstruction quality*** — especially on multi-modal inputs — by ***at least 10% over the baseline VAE-LSTM architecture***. Constructed a ***low-latency wireless communication system*** using ***ESP-NOW*** protocols achieving sustained ***end-to-end*** latency under 50ms to ensure robust peer-to-peer connectivity and minimal protocol overhead.'
---

{% include toc %}

***Award: ECE Best FYP/T Award 2024-2025 2<sup>nd</sup> Runner-Up***

- Group Leader, Principal Contributor
- Undergraduate Final Year Project (FYP) (self-proposed), supervised by [Prof. Jun ZHANG](https://ece.hkust.edu.hk/eejzhang)
- **Keywords**: VAE, LSTM, Multi-Head Attention, Anomaly Detection, Time-Series Prediction, Sleep Apnea, ESP32, ESP-NOW
- Coding & Enviroment: Python, PyTorch, C++
- Detailed implementation can be found in <i class="fab fa-github"></i> [Github code repo](https://github.com/666harrypeng/Edge-AI-for-healthcare-applications).

## Project Overview

Constructed multi-dimensional respiration datasets, designed and implemented ***multimodal AI models*** for ***time-series prediction*** and ***anomaly detection*** of respiratory diseases ([sleep apnea](https://en.wikipedia.org/wiki/Sleep_apnea)), and constructed wireless end-to-end real-time monitoring system.

Below shows my contributions to the project, including:

- AI model framework design, implementation, and optimization for time-series prediction and anomaly detection (***VAE***, ***LSTM***, ***Multi-Head Attention***)
- Hardware sensor integration and construction of transmission protocol (ESP32 boards, ESP-NOW protocol)
- Multi-modal respiration datasets construction (audio, temperature and humidity signals)
- Real-time GUI monitoring system

## System Real-Time Demonstration

This video is this project's integrated demonstration, showing the real-time GUI, real tester, and the real-time anomaly detection and time-series prediction inference.

<iframe width="560" height="315" src="https://www.youtube.com/embed/TMZ0hu0FLIc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## System Architecture

We designed a system architecture that integrates the AI models, hardware sensors, and the real-time GUI monitoring system. The system architecture is shown as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/system_diagram.png" alt="system_diagram" style="max-width: 100%; height: auto;">
  </figure>
</div>

## Hardware System Setup

The hardware system collects air humidity, air temperature, and audio signals from the patient's breathing. The audio signals are collected by a microphone (KY-028), and the air humidity and temperature are collected by the sensor AHT10. Once the sensor signal buffers are full, the data will be transmitted to the ESP32 board via the ESP-NOW protocol. The general hardware system structure is shown as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/hw_system_diagram.png" alt="hw_system_diagram" style="max-width: 100%; height: auto;">
  </figure>
</div>

## Software System Setup

### 1 - Dataset Construction

The data collected by the hardware are processed into rolling windows, which will be used for the AI model training and testing. The software system structure is shown as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/Dataset_Construction_workflow.png" alt="Dataset_Construction_workflow" style="max-width: 100%; height: auto;">
  </figure>
</div>

### 2 - Anomaly Detection Process

In this project's settings, the anomaly samples are selected based on the comparison and deviation between the predicted and the ground truth values. We first define the anomaly threshold based on the ground truth values. Then, utilize the AI model to make predictions based on the most recent data intervals. If the predicted value is significantly different from the ground truth value, the data interval is considered as an anomaly.

The anomaly detection process is shown as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/Anomaly_detection_workflow.png" alt="Anomaly_detection_workflow" style="max-width: 100%; height: auto;">
  </figure>
</div>

### 3 - Time-Series Prediction with AI Models

In this project, we proposed our AI model `MHA-VAE-LSTM` and have tested the model on our real-collected respiration datasets. We also made some model performance comparisons with varying data input length, with other time-series prediction AI models - `LSTM` (in our project, we named it as `pure-LSTM`) and [`VAE-LSTM`](https://ieeexplore.ieee.org/document/9053558).

Here is our `MHA-VAE-LSTM` model's structure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/MHA_VAE_ModelStucture_resized.jpg" alt="MHA_VAE_ModelStucture_resized" style="max-width: 80%; height: auto;">
  </figure>
</div>

By introducing the Multi-Head Attention (MHA) mechanism and the residual connection, the model can have a better performance in the data feature extraction and reconstruction, espeically compared with the `VAE-LSTM` model which uses the VAE to extract local features and uses the LSTM to make future predictions.

Here is the data reconstruction results of the `VAE-LSTM` model:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/vae_reconstruction_val_epoch_2700.png" alt="vae_reconstruction_val_epoch_2700" style="max-width: 100%; height: auto;">
  </figure>
</div>

Based on the above figure, the `VAE-LSTM` model tends to use the mean values to reconstruct the data, which is not very accurate. The `MHA-VAE-LSTM` model can have a better performance in the data reconstruction, which is shown as the following figure:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/mha-vae_reconstruction_val_epoch_1250.png" alt="mha-vae_reconstruction_val_epoch_1250" style="max-width: 100%; height: auto;">
  </figure>
</div>

The performances of these three models on the same real-collected dataset (collection duration $\approx$ 1 hour with 20~30Hz sample rates, data length $\approx$ 100,000 sensor readings) are shown as the following figure:

- `pure-LSTM` model:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/pure_lstm_anomaly_detection_comparison_thre80-noseinout9-winlen800-lookback1.png" alt="pure_lstm_anomaly_detection_comparison_thre80-noseinout9-winlen800-lookback1" style="max-width: 100%; height: auto;">
  </figure>
</div>

- `VAE-LSTM` model:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/vae-lstm_anomaly_detection_comparison_thre80-noseinout9-winlen800-lookback1.png" alt="vae-lstm_anomaly_detection_comparison_thre80-noseinout9-winlen800-lookback1" style="max-width: 100%; height: auto;">
  </figure>
</div>

- Our `MHA-VAE-LSTM` model:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/mha_vae_lstm_win_len1000_look_back1_anomaly_detection_comparison_thre80.png" alt="mha_vae_lstm_win_len1000_look_back1_anomaly_detection_comparison_thre80" style="max-width: 100%; height: auto;">
  </figure>
</div>

### 4 - Model Performance Comparisons on Different Data Input Lengths

Input data length is a crucial factor in the time-series prediction and anomaly detection. In this project, we have tested the model performance on different input data lengths, where single window lengths are from 200 to 1800 with varying look-back window numbers from 1 to 5.

We take the detection rate (Recall) and the $F_{\beta}$ score as the primary performance metrics, with the $\beta$ value set to 2 hoping to put more emphasis on the detection rate.

- Comparisons on short input data lengths:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/short_length_compare.png" alt="short_length_compare" style="max-width: 100%; height: auto;">
  </figure>
</div>

From the above figure, we can see that all the three models can have decent performances.

- Comparisons on long input data lengths:

<div style="display: flex; justify-content: center; text-align: center;">
  <figure>
    <img src="../respiratory-monitoring-system-hkust-fyp/attachments/long_length_compare.png" alt="long_length_compare" style="max-width: 100%; height: auto;">
  </figure>
</div>

Now, with much longer input data lengths, the `pure-LSTM` model cannot have a good performance, and the `VAE-LSTM` model and our `MHA-VAE-LSTM` model can have a better performance.

## Conclusion

We have successfully constructed a wearable, affordable, real-time monitoring, edge-compatible (can be deployed on PC or embedded devices), and open-source system for sleep apnea detection, which can be used at home or in the hospital. We hope our work and algorithms can foster the development of the sleep apnea detection and treatment in the future.
