function ChatHistory({ imageUrls, onImageSelect, deleteImage, disableButton }) {
  return (
    <div
      style={{
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        margin: "10px",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        textAlign: "left",
        border: "6px solid #ddd",
        color: "#333",
      }}
    >
      {imageUrls &&
        imageUrls.map((imageUrl, index) => (
          <section
            style={{
              overflowY: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
            key={index}
          >
            <div
              style={{
                overflowY: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  border: "double",
                  borderColor: "black",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={imageUrl}
                  height="50%"
                  width="50%"
                  alt="Chat Drawing"
                />
              </div>
              <div style={disableButton ? { display: "none" } : { display: "flex" }}>
              <button
                onClick={() => onImageSelect(imageUrl)}
                style={{
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteImage(imageUrl)}
                style={{
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              </div>
              
              <div>
                <h2
                  style={{
                    marginBottom: "1rem",
                    textAlign: "left", // Left align text
                    width: "10%", // Use only % of the width
                    fontSize: "0.8rem", // Smaller text size
                    fontStyle: "italic", // Italicize text
                  }}
                >
                  from User
                </h2>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
}

export default ChatHistory;
