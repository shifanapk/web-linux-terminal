from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if the frontend runs on a different origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Backend is running!"}

@app.post("/execute")
async def execute_command(request: dict):
    command = request.get("command")
    if not command:
        raise HTTPException(status_code=400, detail="No command provided")

    try:
        # Execute the shell command
        result = subprocess.run(command, shell=True, text=True, capture_output=True)
        if result.returncode != 0:
            return {"error": result.stderr}
        return {"output": result.stdout}
    except Exception as e:
        return {"error": str(e)}
