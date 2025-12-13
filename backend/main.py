from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: list
    edges: list

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes = {n["id"] for n in pipeline.nodes}
    edges = pipeline.edges

    adj = {n: [] for n in nodes}
    for e in edges:
        if e["source"] in nodes and e["target"] in nodes:
            adj[e["source"]].append(e["target"])

    visited, stack = set(), set()

    def dfs(v):
        if v in stack:
            return False
        if v in visited:
            return True
        visited.add(v)
        stack.add(v)
        for n in adj[v]:
            if not dfs(n):
                return False
        stack.remove(v)
        return True

    is_dag = all(dfs(n) for n in nodes)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag
    }
