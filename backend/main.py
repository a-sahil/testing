from fastapi import FastAPI, Form
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes, edges):
    # Build adjacency list
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        if edge['source'] in adj_list:
            adj_list[edge['source']].append(edge['target'])
    
    # DFS to detect cycle
    visited = set()
    recursion_stack = set()
    
    def dfs(node_id):
        visited.add(node_id)
        recursion_stack.add(node_id)
        
        if node_id in adj_list:
            for neighbor in adj_list[node_id]:
                if neighbor not in visited:
                    if dfs(neighbor):
                        return True
                elif neighbor in recursion_stack:
                    return True # Cycle detected
        
        recursion_stack.remove(node_id)
        return False

    for node in nodes:
        if node['id'] not in visited:
            if dfs(node['id']):
                return False # Cycle found, so not a DAG
                
    return True # No cycles found

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }