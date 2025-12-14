# 🚀 Frontend Technical Assessment

A visual pipeline editor built as part of the VectorShift technical assessment. This full-stack application allows users to design node-based workflows, create dynamic variables, and validate pipeline topology (DAG detection) via a Python backend.

## 📋 Table of Contents

- [Features](#-features)
- [Assessment Deliverables](#-assessment-deliverables)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [API Reference](#-api-reference)

## ✨ Features

- **Visual Editor**: Drag-and-drop interface powered by React Flow.
- **Node Abstraction**: Scalable architecture using a generic `BaseNode` component.
- **Dynamic Text Nodes**: Auto-resizing text areas that generate input handles dynamically when `{{variable}}` syntax is used.
- **Pipeline Analysis**: Backend logic to count nodes/edges and verify if the graph is a Directed Acyclic Graph (DAG).
- **Interactive UI**: Custom styling with Tailwind CSS and an interactive GSAP-powered Dot Grid background.

## 🎯 Assessment Deliverables

This project addresses all four parts of the technical assessment:

1. **Node Abstraction**: Created `BaseNode.js` to standardize styles and handle logic. Implemented 5 demo nodes (Transform, Filter, Database, API, Note) using this abstraction.
2. **Styling**: Applied a unified dark/modern theme using Tailwind CSS and custom CSS for handles and connections. Added `DotGrid.js` for visual polish.
3. **Text Node Logic**: Implemented auto-growing textareas and Regex-based parsing to create handles for variables defined in double curly brackets.
4. **Backend Integration**: Connected the frontend `Submit` button to the FastAPI backend to parse the pipeline and return DAG status.

## 🛠 Tech Stack

### Frontend
- **Core**: React.js, React Flow
- **Styling**: Tailwind CSS, CSS Modules
- **Animation**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI
- **Server**: Uvicorn
- **Validation**: Pydantic

## 📂 Project Structure
```text
├── backend/
│   ├── main.py             # FastAPI entry point & DAG logic
│   └── ...
└── frontend/
    ├── src/
    │   ├── nodes/          # Node components
    │   │   ├── BaseNode.js # Shared node abstraction
    │   │   ├── textNode.js # Dynamic variable logic
    │   │   └── ...
    │   ├── ui.js           # React Flow canvas
    │   ├── store.js        # Zustand state
    │   ├── submit.js       # Backend integration
    │   └── DotGrid.js      # Interactive background
    └── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)

### 1. Backend Setup

Navigate to the backend directory and start the server:
```bash
cd backend

# Install dependencies
pip install fastapi uvicorn

# Start the server (runs on port 8000)
uvicorn main:app --reload
```

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, and start the client:
```bash
cd frontend

# Install dependencies
npm install

# Start the React app (runs on port 3000)
npm start
```

## 🎮 Usage Guide

- **Adding Nodes**: Drag nodes (Input, LLM, Text, etc.) from the toolbar onto the canvas.
- **Connecting**: Click and drag from a source handle (right) to a target handle (left).
- **Variables**: In a Text Node, type `{{myVar}}`. A blue handle labeled `myVar` will automatically appear on the left side of the node.
- **Submission**: Click the Submit button. An alert will display the number of nodes, edges, and whether the pipeline is a valid DAG.

## 📡 API Reference

### Parse Pipeline

Validates the graph topology.

- **URL**: `/pipelines/parse`
- **Method**: `POST`
- **Body**:
```json
  {
    "nodes": [...],
    "edges": [...]
  }
```
- **Response**:
```json
  {
    "num_nodes": 4,
    "num_edges": 3,
    "is_dag": true
  }
```
