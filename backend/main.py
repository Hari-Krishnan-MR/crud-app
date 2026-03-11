from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentSchema(BaseModel):
    name: str
    email: str
    course: str

    class Config:
        from_attributes = True

#fetch all data from db
@app.get("/students")
def get_students(db: Session = Depends(get_db)):
    return db.query(models.Student).all()

#get student details by id
@app.get("/students/{id}")
def get_student(id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

#get student by name
@app.get("/students/search/by-name")
def search_by_name(name: str, db: Session = Depends(get_db)):
    students = db.query(models.Student).filter(
        models.Student.name.ilike(f"%{name}%")
    ).all()
    return students

#create a new row
@app.post("/students")
def create_student(student: StudentSchema, db: Session = Depends(get_db)):
    new_student = models.Student(**student.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

#update the row
@app.put("/students/{id}")
def update_student(id: int, student: StudentSchema, db: Session = Depends(get_db)):
    db_student = db.query(models.Student).filter(models.Student.id == id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    for key, value in student.dict().items():
        setattr(db_student, key, value)
    db.commit()
    return db_student

#delete the row
@app.delete("/students/{id}")
def delete_student(id: int, db: Session = Depends(get_db)):
    db_student = db.query(models.Student).filter(models.Student.id == id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    db.delete(db_student)
    db.commit()
    return {"message": "Student deleted"}