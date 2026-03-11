from sqlalchemy import Column, Integer, String
from database import Base

#creating the same table as in db
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    course = Column(String(100))