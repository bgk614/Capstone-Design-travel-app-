from fastapi import FastAPI

app = FastAPI()

# 예시 API 엔드포인트
@app.get("/api/data")
async def read_data():
    return {"message": "Hello from FastAPI"}
