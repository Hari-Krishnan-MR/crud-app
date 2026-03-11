import { useState, useEffect } from "react"

export default function StudentModal({ onClose, onSave, existingStudent }) {
  const [form, setForm] = useState({ name: "", email: "", course: "" })

  useEffect(() => {
    if (existingStudent) setForm(existingStudent)
  }, [existingStudent])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const inputStyle = {
    border: "1.5px solid #e8d5c4", borderRadius: "8px",
    padding: "10px 14px", fontSize: "14px", outline: "none",
    width: "100%", boxSizing: "border-box", fontFamily: "inherit",
    color: "#333", background: "#fffaf7", transition: "all 0.2s"
  }

  const labelStyle = {
    fontSize: "12px", fontWeight: "600", color: "#c45e00",
    textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px",
    display: "block"
  }

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(3px)"
    }}>
      <div style={{
        background: "white", borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        width: "420px", overflow: "hidden",
        animation: "slideUp 0.2s ease"
      }}>
        {/* Modal Header */}
        <div style={{
          background: "linear-gradient(135deg, #c45e00, #e07b2a)",
          padding: "20px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>{existingStudent ? "✏️" : "➕"}</span>
            <span style={{ color: "white", fontWeight: "700", fontSize: "16px" }}>
              {existingStudent ? "Update Student" : "Add New Student"}
            </span>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.2)", border: "none",
            color: "white", borderRadius: "6px", width: "28px", height: "28px",
            cursor: "pointer", fontSize: "16px", display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>✕</button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                name="name" value={form.name} onChange={handleChange}
                placeholder="Enter full name"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#e07b2a"; e.target.style.boxShadow = "0 0 0 3px rgba(224,123,42,0.15)" }}
                onBlur={e => { e.target.style.borderColor = "#e8d5c4"; e.target.style.boxShadow = "none" }}
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                name="email" value={form.email} onChange={handleChange}
                placeholder="Enter email address"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#e07b2a"; e.target.style.boxShadow = "0 0 0 3px rgba(224,123,42,0.15)" }}
                onBlur={e => { e.target.style.borderColor = "#e8d5c4"; e.target.style.boxShadow = "none" }}
              />
            </div>
            <div>
              <label style={labelStyle}>Course</label>
              <input
                name="course" value={form.course} onChange={handleChange}
                placeholder="Enter course name"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#e07b2a"; e.target.style.boxShadow = "0 0 0 3px rgba(224,123,42,0.15)" }}
                onBlur={e => { e.target.style.borderColor = "#e8d5c4"; e.target.style.boxShadow = "none" }}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: "16px 24px", borderTop: "1px solid #f5ede6",
          display: "flex", gap: "12px", justifyContent: "flex-end"
        }}>
          <button onClick={onClose} style={{
            padding: "10px 20px", background: "#f5f5f5", border: "none",
            borderRadius: "8px", fontSize: "14px", fontWeight: "600",
            cursor: "pointer", color: "#666", transition: "all 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#ebebeb"}
            onMouseLeave={e => e.currentTarget.style.background = "#f5f5f5"}
          >Cancel</button>
          <button onClick={() => onSave(form)} style={{
            padding: "10px 24px",
            background: "linear-gradient(135deg, #c45e00, #e07b2a)",
            border: "none", borderRadius: "8px", fontSize: "14px",
            fontWeight: "700", cursor: "pointer", color: "white",
            transition: "all 0.2s", boxShadow: "0 4px 12px rgba(196,94,0,0.3)"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {existingStudent ? "Save Changes" : "Add Student"}
          </button>
        </div>
      </div>
    </div>
  )
}
