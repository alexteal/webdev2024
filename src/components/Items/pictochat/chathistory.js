function ChatHistory({ imageUrl, user }) {
  return (
    <div style={{
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      margin: "10px",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      textAlign: "left",
      border: "6px solid #ddd",
      color: "#333"
    }}>
      {imageUrl && (
        <>
        <section>
        <img src={imageUrl} height = "50%" width="50%"alt="Chat Drawing" />
          <h2>From {user}</h2>
        </section>
         
        </>
      )}
    </div>
  );
}

export default ChatHistory;
