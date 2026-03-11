import { useState, useEffect } from "react"
import { studentService } from "./services/studentService"
import SearchBar from "./components/SearchBar"
import StudentTable from "./components/StudentTable"
import StudentModal from "./components/StudentModal"

const PAGE_SIZE = 5

export default function App() {
  const [students, setStudents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // ─── FETCH ALL ───────────────────────────────────────────
  const fetchStudents = async () => {
    const data = await studentService.getAll()
    setStudents(data)
    setFiltered(data)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // ─── SEARCH ──────────────────────────────────────────────
  const handleSearchId = (id) => {
    if (!id) return setFiltered(students)
    setFiltered(students.filter((s) => s.id === parseInt(id)))
    setCurrentPage(1)
  }

  const handleSearchName = async (name) => {
    if (!name) return setFiltered(students)
    const data = await studentService.searchByName(name)
    setFiltered(data)
    setCurrentPage(1)
  }

  // ─── CREATE / UPDATE ─────────────────────────────────────
  const handleSave = async (form) => {
    if (editStudent) {
      await studentService.update(editStudent.id, form)
    } else {
      await studentService.create(form)
    }
    setShowModal(false)
    setEditStudent(null)
    fetchStudents()
  }

  // ─── DELETE ──────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await studentService.delete(id)
      fetchStudents()
    }
  }

  // ─── EDIT (open modal with existing data) ────────────────
  const handleEdit = (student) => {
    setEditStudent(student)
    setShowModal(true)
  }

  // ─── PAGINATION ──────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  // ─── UI ──────────────────────────────────────────────────
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f5f0eb",
        fontFamily: "'Georgia', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "linear-gradient(135deg, #c45e00 0%, #e07b2a 50%, #c45e00 100%)",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          boxShadow: "0 4px 12px rgba(196,94,0,0.4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            📊
          </div>
          <span
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            Data Analytics Portal
          </span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Dashboard", "Reports", "Settings"].map((item) => (
            <span
              key={item}
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "white")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.8)")
              }
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* PAGE TITLE */}
      <div
        style={{
          background: "linear-gradient(180deg, #fff8f2 0%, #f5f0eb 100%)",
          borderBottom: "2px solid #e07b2a",
          padding: "16px 40px 12px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "4px",
            color: "#c45e00",
            fontWeight: "700",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Management System
        </div>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#1a1a1a",
            letterSpacing: "3px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Student Details
        </h1>
        <div
          style={{
            width: "60px",
            height: "3px",
            margin: "10px auto 0",
            background: "linear-gradient(90deg, #c45e00, #e07b2a)",
          }}
        />
      </div>

      {/* MAIN CONTENT */}
      <main
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "12px 40px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TWO BOX LAYOUT */}
        <div style={{ display: "flex", gap: "24px", alignItems: "stretch", flex: 1 }}>

          {/* BOX 1 — SEARCH */}
          <div
            style={{
              flex: "0 0 340px",
              background: "white",
              borderRadius: "12px",
              border: "1px solid #e8d5c4",
              boxShadow: "0 4px 16px rgba(196,94,0,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #c45e00, #e07b2a)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "18px" }}>🔍</span>
              <span
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Search Students
              </span>
            </div>
            <div style={{ padding: "24px 20px", flex: 1 }}>
              <SearchBar
                onSearchId={handleSearchId}
                onSearchName={handleSearchName}
              />
              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid #f0e8e0",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#999",
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Quick Stats
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div
                    style={{
                      flex: 1,
                      background: "#fff8f2",
                      border: "1px solid #fde0c8",
                      borderRadius: "8px",
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        color: "#c45e00",
                      }}
                    >
                      {students.length}
                    </div>
                    <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>
                      Total
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "#fff8f2",
                      border: "1px solid #fde0c8",
                      borderRadius: "8px",
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        color: "#c45e00",
                      }}
                    >
                      {filtered.length}
                    </div>
                    <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>
                      Shown
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOX 2 — TABLE */}
          <div
            style={{
              flex: 1,
              background: "white",
              borderRadius: "12px",
              border: "1px solid #e8d5c4",
              boxShadow: "0 4px 16px rgba(196,94,0,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #c45e00, #e07b2a)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px" }}>🎓</span>
                <span
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Student Records
                </span>
              </div>
              <button
                onClick={() => {
                  setEditStudent(null)
                  setShowModal(true)
                }}
                style={{
                  background: "white",
                  color: "#c45e00",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff8f2"
                  e.currentTarget.style.transform = "scale(1.02)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                ➕ Add Student
              </button>
            </div>
            <StudentTable
              students={paginated}
              onEdit={handleEdit}
              onDelete={handleDelete}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
          padding: "20px 40px",
          fontSize: "13px",
        }}
      >
        <span style={{ color: "#e07b2a", fontWeight: "600" }}>
          Data Analytics Portal
        </span>{" "}
        · Student Management System · MSc Data Analytics Project ·{" "}
        {new Date().getFullYear()}
      </footer>

      {/* MODAL */}
      {showModal && (
        <StudentModal
          onClose={() => {
            setShowModal(false)
            setEditStudent(null)
          }}
          onSave={handleSave}
          existingStudent={editStudent}
        />
      )}
    </div>
  )
}
