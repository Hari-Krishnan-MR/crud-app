export default function StudentTable({ students, onEdit, onDelete, currentPage, totalPages, onPageChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#fff8f2", borderBottom: "2px solid #fde0c8" }}>
              {["ID", "Name", "Email", "Course", "Actions"].map(h => (
                <th key={h} style={{
                  padding: "12px 16px", textAlign: "left",
                  fontSize: "11px", fontWeight: "700", color: "#c45e00",
                  textTransform: "uppercase", letterSpacing: "1.5px"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} style={{
                  textAlign: "center", padding: "48px 16px",
                  color: "#bbb", fontSize: "14px"
                }}>
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr key={s.id} style={{
                  borderBottom: "1px solid #f5ede6",
                  background: i % 2 === 0 ? "white" : "#fffaf7",
                  transition: "background 0.15s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fff3e8"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "white" : "#fffaf7"}
                >
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      background: "#fff0e0", color: "#c45e00", fontWeight: "700",
                      padding: "3px 8px", borderRadius: "4px", fontSize: "12px"
                    }}>#{s.id}</span>
                  </td>
                  <td style={{ padding: "13px 16px", fontWeight: "600", color: "#1a1a1a" }}>{s.name}</td>
                  <td style={{ padding: "13px 16px", color: "#666" }}>{s.email}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      background: "#f0f7ff", color: "#2563eb", fontWeight: "500",
                      padding: "3px 10px", borderRadius: "20px", fontSize: "12px",
                      border: "1px solid #dbeafe"
                    }}>{s.course}</span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => onEdit(s)}
                        style={{
                          background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          color: "white", border: "none", borderRadius: "6px",
                          padding: "6px 12px", fontSize: "12px", fontWeight: "600",
                          cursor: "pointer", transition: "all 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >✏️ Edit</button>
                      <button
                        onClick={() => onDelete(s.id)}
                        style={{
                          background: "linear-gradient(135deg, #ef4444, #dc2626)",
                          color: "white", border: "none", borderRadius: "6px",
                          padding: "6px 12px", fontSize: "12px", fontWeight: "600",
                          cursor: "pointer", transition: "all 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "8px", padding: "16px", borderTop: "1px solid #f5ede6"
      }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            background: currentPage === 1 ? "#f5f5f5" : "linear-gradient(135deg, #c45e00, #e07b2a)",
            color: currentPage === 1 ? "#ccc" : "white",
            border: "none", borderRadius: "6px", padding: "7px 14px",
            fontSize: "13px", cursor: currentPage === 1 ? "not-allowed" : "pointer",
            fontWeight: "600", transition: "all 0.2s"
          }}
        >← Prev</button>

        <span style={{
          padding: "7px 16px", background: "#fff8f2",
          border: "1px solid #fde0c8", borderRadius: "6px",
          fontSize: "13px", color: "#c45e00", fontWeight: "600"
        }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            background: currentPage === totalPages ? "#f5f5f5" : "linear-gradient(135deg, #c45e00, #e07b2a)",
            color: currentPage === totalPages ? "#ccc" : "white",
            border: "none", borderRadius: "6px", padding: "7px 14px",
            fontSize: "13px", cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            fontWeight: "600", transition: "all 0.2s"
          }}
        >Next →</button>
      </div>
    </div>
  )
}
