export default function SearchBar({ onSearchId, onSearchName }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{
          fontSize: "12px", fontWeight: "600", color: "#c45e00",
          textTransform: "uppercase", letterSpacing: "1px"
        }}>
          Student ID
        </label>
        <input
          type="number"
          placeholder="Enter student ID..."
          onChange={(e) => onSearchId(e.target.value)}
          style={{
            border: "1.5px solid #e8d5c4", borderRadius: "8px",
            padding: "10px 14px", fontSize: "14px", outline: "none",
            width: "100%", boxSizing: "border-box",
            transition: "border-color 0.2s, box-shadow 0.2s",
            fontFamily: "inherit", color: "#333", background: "#fffaf7"
          }}
          onFocus={e => {
            e.target.style.borderColor = "#e07b2a"
            e.target.style.boxShadow = "0 0 0 3px rgba(224,123,42,0.15)"
          }}
          onBlur={e => {
            e.target.style.borderColor = "#e8d5c4"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{
          fontSize: "12px", fontWeight: "600", color: "#c45e00",
          textTransform: "uppercase", letterSpacing: "1px"
        }}>
          Student Name
        </label>
        <input
          type="text"
          placeholder="Enter student name..."
          onChange={(e) => onSearchName(e.target.value)}
          style={{
            border: "1.5px solid #e8d5c4", borderRadius: "8px",
            padding: "10px 14px", fontSize: "14px", outline: "none",
            width: "100%", boxSizing: "border-box",
            transition: "border-color 0.2s, box-shadow 0.2s",
            fontFamily: "inherit", color: "#333", background: "#fffaf7"
          }}
          onFocus={e => {
            e.target.style.borderColor = "#e07b2a"
            e.target.style.boxShadow = "0 0 0 3px rgba(224,123,42,0.15)"
          }}
          onBlur={e => {
            e.target.style.borderColor = "#e8d5c4"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>
    </div>
  )
}
